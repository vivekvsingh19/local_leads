
import { Lead, SearchParams } from './types';

// Google Maps API Key from environment
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Debug logging (only in development)
if (import.meta.env.DEV) {
  console.log('API Key loaded:', GOOGLE_MAPS_API_KEY ? `${GOOGLE_MAPS_API_KEY.substring(0, 10)}...` : 'NOT FOUND');
}

export interface CitySuggestion {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

/**
 * Autocomplete cities/places using Google Places Autocomplete API
 */
export const autocompleteCities = async (input: string): Promise<CitySuggestion[]> => {
  if (!input || input.length < 2) return [];
  
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    // Return static suggestions if no API key
    const staticCities = [
      { placeId: '1', description: 'Austin, TX, USA', mainText: 'Austin', secondaryText: 'TX, USA' },
      { placeId: '2', description: 'New York, NY, USA', mainText: 'New York', secondaryText: 'NY, USA' },
      { placeId: '3', description: 'Los Angeles, CA, USA', mainText: 'Los Angeles', secondaryText: 'CA, USA' },
      { placeId: '4', description: 'Chicago, IL, USA', mainText: 'Chicago', secondaryText: 'IL, USA' },
      { placeId: '5', description: 'Miami, FL, USA', mainText: 'Miami', secondaryText: 'FL, USA' },
    ];
    return staticCities.filter(c => 
      c.description.toLowerCase().includes(input.toLowerCase())
    );
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        },
        body: JSON.stringify({
          input,
          includedPrimaryTypes: ['locality', 'sublocality', 'postal_code', 'administrative_area_level_3'],
          languageCode: 'en',
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Autocomplete API error:', response.status, errorText);
      return [];
    }

    const data = await response.json();
    console.log('Autocomplete response:', data);
    const suggestions = data.suggestions || [];

    return suggestions.map((s: any) => ({
      placeId: s.placePrediction?.placeId || '',
      description: s.placePrediction?.text?.text || '',
      mainText: s.placePrediction?.structuredFormat?.mainText?.text || '',
      secondaryText: s.placePrediction?.structuredFormat?.secondaryText?.text || '',
    }));
  } catch (error) {
    console.error('Autocomplete error:', error);
    return [];
  }
};

interface GooglePlace {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  types?: string[];
}

/**
 * Search for local businesses using Google Places API (New)
 * Note: For production, move this to a backend API to protect your API key
 */
export const searchLeads = async (params: SearchParams): Promise<Lead[]> => {
  const { keyword, city } = params;

  // Check if API key is configured
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    console.warn('Google Maps API key not configured. Using simulation mode.');
    return simulateSearchLeads(params);
  }

  try {
    // Use Google Places API (New) - Text Search
    const searchUrl = `https://places.googleapis.com/v1/places:searchText`;

    const requestBody = {
      textQuery: `${keyword} in ${city}`,
      maxResultCount: 20,
      languageCode: 'en'
    };

    const response = await fetch(searchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.types'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Places API error:', response.status, errorText);

      // Fallback to simulation if API fails
      console.warn('Falling back to simulation mode due to API error');
      return simulateSearchLeads(params);
    }

    const data = await response.json();
    const places: GooglePlace[] = data.places || [];
    
    // Debug: Log raw API response
    console.log('Google Places API returned:', places.length, 'results');
    console.log('Raw places data:', data);

    // Transform Google Places results to our Lead format
    const leads: Lead[] = places.map((place) => {
      const hasWebsite = !!place.websiteUri;

      return {
        id: place.id || `lead_${Math.random().toString(36).substr(2, 9)}`,
        business_name: place.displayName?.text || 'Unknown Business',
        address: place.formattedAddress || 'Address not available',
        phone: place.internationalPhoneNumber || 'Phone not available',
        category: keyword,
        city: city,
        has_website: hasWebsite,
        website_url: place.websiteUri,
        google_maps_url: place.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(place.displayName?.text || keyword)}`,
        rating: place.rating,
        reviews: place.userRatingCount || 0
      };
    });

    return leads;

  } catch (error) {
    console.error('Error searching leads:', error);
    // Fallback to simulation on error
    console.warn('Falling back to simulation mode due to error');
    return simulateSearchLeads(params);
  }
};

/**
 * Simulation fallback when API key is not configured
 */
const simulateSearchLeads = (params: SearchParams): Promise<Lead[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { keyword, city } = params;
      const results: Lead[] = [];
      const count = Math.floor(Math.random() * 8) + 5; // 5 to 12 results

      // Helper to generate random phone
      const randPhone = () => `(${Math.floor(Math.random() * 800) + 200}) 555-${Math.floor(Math.random() * 8999) + 1000}`;

      for (let i = 0; i < count; i++) {
        const hasWebsite = Math.random() > 0.6; // 40% chance of no website
        const nameSuffix = ['Services', 'Co.', 'Solutions', 'Pros', 'Experts', 'Group', 'Inc', 'LLC'][Math.floor(Math.random() * 8)];
        const street = ['Main St', 'Oak Ave', 'Maple Dr', 'Washington Blvd', 'First St', 'Park Way'][Math.floor(Math.random() * 6)];

        results.push({
          id: `lead_${Math.random().toString(36).substr(2, 9)}`,
          business_name: `${keyword} ${nameSuffix} ${i + 1}`,
          address: `${Math.floor(Math.random() * 900) + 10} ${street}, ${city}`,
          phone: randPhone(),
          category: keyword,
          city: city,
          has_website: hasWebsite,
          website_url: hasWebsite ? `https://www.example.com` : undefined,
          google_maps_url: `https://maps.google.com/?q=${keyword}+${city}`,
          rating: (Math.random() * 2) + 3, // 3.0 to 5.0
          reviews: Math.floor(Math.random() * 150)
        });
      }

      resolve(results);
    }, 1500); // Simulate network latency
  });
};

export const exportToCSV = (leads: Lead[]) => {
  const headers = ['Business Name', 'Phone', 'City', 'Address', 'Google Maps Link'];
  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      `"${lead.business_name}"`,
      `"${lead.phone}"`,
      `"${lead.city}"`,
      `"${lead.address}"`,
      `"${lead.google_maps_url}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
