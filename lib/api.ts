
import { Lead, SearchParams } from './types';

// Google Maps API Key from environment
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
