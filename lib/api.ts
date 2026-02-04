
import { Lead, SearchParams } from './types';
import logger from './logger';

// Google Maps API Key from environment
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
      logger.error('Autocomplete API error:', response.status, errorText);
      return [];
    }

    const data = await response.json();
    logger.debug('Autocomplete response:', data);
    const suggestions = data.suggestions || [];

    return suggestions.map((s: any) => ({
      placeId: s.placePrediction?.placeId || '',
      description: s.placePrediction?.text?.text || '',
      mainText: s.placePrediction?.structuredFormat?.mainText?.text || '',
      secondaryText: s.placePrediction?.structuredFormat?.secondaryText?.text || '',
    }));
  } catch (error) {
    logger.error('Autocomplete error:', error);
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
 * Helper function to transform Google Places to Lead format
 */
const transformPlaceToLead = (place: GooglePlace, keyword: string, city: string): Lead => {
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
};

/**
 * Search for local businesses using Google Places API (New)
 * Free users: Basic search (1 query, ~20 results) - Lower API cost
 * Pro users: Comprehensive search (multiple queries + nearby, 60-80+ results)
 * Note: For production, move this to a backend API to protect your API key
 */
export const searchLeads = async (params: SearchParams): Promise<Lead[]> => {
  const { keyword, city, isPro = false } = params;

  logger.log(`🔍 Starting search: "${keyword}" in "${city}" | Mode: ${isPro ? 'PRO (comprehensive)' : 'FREE (basic)'}`);

  // Check if API key is configured
  if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY_HERE') {
    logger.warn('Google Maps API key not configured. Using simulation mode.');
    return simulateSearchLeads(params);
  }

  logger.debug('API Key present:', GOOGLE_MAPS_API_KEY.substring(0, 10) + '...');

  try {
    const searchUrl = `https://places.googleapis.com/v1/places:searchText`;
    const allPlaces: GooglePlace[] = [];
    const seenIds = new Set<string>();

    // FREE: Single query | PRO: Multiple search variations for comprehensive results
    const searchQueries = isPro
      ? [
          `${keyword} in ${city}`,
          `${keyword} near ${city}`,
          `best ${keyword} ${city}`,
          `local ${keyword} ${city}`,
        ]
      : [`${keyword} in ${city}`]; // Free users get just 1 query

    // PRO only: Get location coordinates for better local results and nearby search
    let locationBias: { latitude: number; longitude: number } | null = null;

    if (isPro) {
      try {
        // Try to geocode the city to get coordinates for better local results
        const geocodeResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${GOOGLE_MAPS_API_KEY}`
        );
        if (geocodeResponse.ok) {
          const geocodeData = await geocodeResponse.json();
          if (geocodeData.results && geocodeData.results[0]) {
            // Geocode returns {lat, lng} but Places API needs {latitude, longitude}
            const loc = geocodeData.results[0].geometry.location;
            locationBias = {
              latitude: loc.lat,
              longitude: loc.lng
            };
            logger.debug('PRO: Got location bias for city:', city, locationBias);
          }
        }
      } catch (e) {
        logger.debug('Could not geocode city, continuing without location bias');
      }
    }

    // Perform multiple searches to get more results
    for (const query of searchQueries) {
      try {
        const requestBody: any = {
          textQuery: query,
          maxResultCount: 20,
          languageCode: 'en'
        };

        // Add location bias if available (searches within ~50km radius)
        if (locationBias) {
          requestBody.locationBias = {
            circle: {
              center: locationBias,
              radius: 50000.0 // 50km radius to cover the area
            }
          };
        }

        logger.debug(`Searching: "${query}"`, requestBody);

        const response = await fetch(searchUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.types'
          },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          const data = await response.json();
          const places: GooglePlace[] = data.places || [];

          logger.debug(`Query "${query}" returned ${places.length} results`);

          // Add unique places only
          for (const place of places) {
            if (place.id && !seenIds.has(place.id)) {
              seenIds.add(place.id);
              allPlaces.push(place);
            }
          }
        } else {
          const errorText = await response.text();
          logger.error(`API error for query "${query}":`, response.status, errorText);
        }
      } catch (queryError) {
        logger.error(`Error with query "${query}":`, queryError);
      }

      // Small delay between requests to avoid rate limiting (Pro only has multiple)
      if (isPro && searchQueries.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // PRO ONLY: If we have location bias, also do a Nearby Search for even more local results
    if (isPro && locationBias) {
      try {
        const nearbyUrl = `https://places.googleapis.com/v1/places:searchNearby`;
        const placeTypes = getPlaceTypesForKeyword(keyword);
        logger.debug(`PRO: Running nearby search with types:`, placeTypes);

        const nearbyBody = {
          includedTypes: placeTypes,
          maxResultCount: 20,
          locationRestriction: {
            circle: {
              center: locationBias,
              radius: 25000.0 // 25km radius for nearby search
            }
          }
        };

        const nearbyResponse = await fetch(nearbyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
            'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.types'
          },
          body: JSON.stringify(nearbyBody)
        });

        if (nearbyResponse.ok) {
          const nearbyData = await nearbyResponse.json();
          const nearbyPlaces: GooglePlace[] = nearbyData.places || [];

          logger.debug(`Nearby search returned ${nearbyPlaces.length} results`);

          for (const place of nearbyPlaces) {
            if (place.id && !seenIds.has(place.id)) {
              seenIds.add(place.id);
              allPlaces.push(place);
            }
          }
        } else {
          const errorText = await nearbyResponse.text();
          logger.error('Nearby search API error:', nearbyResponse.status, errorText);
        }
      } catch (nearbyError) {
        logger.error('Nearby search error:', nearbyError);
      }
    }

    logger.debug(`Total unique places found: ${allPlaces.length}`);

    // If no results from API, fall back to simulation
    if (allPlaces.length === 0) {
      logger.warn('No results from Google Places API. Falling back to simulation mode.');
      logger.warn('Make sure your API key has "Places API (New)" enabled in Google Cloud Console.');
      return simulateSearchLeads(params);
    }

    // Transform all places to leads
    const leads: Lead[] = allPlaces.map((place) =>
      transformPlaceToLead(place, keyword, city)
    );

    // Sort by rating (highest first) and then by number of reviews
    leads.sort((a, b) => {
      const ratingA = a.rating || 0;
      const ratingB = b.rating || 0;
      if (ratingB !== ratingA) return ratingB - ratingA;
      return (b.reviews || 0) - (a.reviews || 0);
    });

    return leads;

  } catch (error) {
    logger.error('Error searching leads:', error);
    logger.warn('Falling back to simulation mode due to error');
    return simulateSearchLeads(params);
  }
};

/**
 * Map common keywords to Google Places types for nearby search
 */
const getPlaceTypesForKeyword = (keyword: string): string[] => {
  const keywordLower = keyword.toLowerCase();

  const typeMap: { [key: string]: string[] } = {
    'restaurant': ['restaurant', 'cafe', 'meal_takeaway'],
    'plumber': ['plumber'],
    'electrician': ['electrician'],
    'dentist': ['dentist'],
    'doctor': ['doctor', 'health'],
    'lawyer': ['lawyer'],
    'gym': ['gym', 'fitness_center'],
    'salon': ['hair_salon', 'beauty_salon'],
    'spa': ['spa'],
    'hotel': ['hotel', 'lodging'],
    'mechanic': ['car_repair'],
    'auto': ['car_repair', 'car_dealer'],
    'real estate': ['real_estate_agency'],
    'insurance': ['insurance_agency'],
    'bank': ['bank'],
    'pharmacy': ['pharmacy'],
    'grocery': ['grocery_or_supermarket'],
    'bakery': ['bakery'],
    'florist': ['florist'],
    'pet': ['pet_store', 'veterinary_care'],
    'vet': ['veterinary_care'],
    'accounting': ['accounting'],
    'locksmith': ['locksmith'],
    'moving': ['moving_company'],
    'cleaning': ['laundry'],
    'roofing': ['roofing_contractor'],
    'hvac': ['hvac_contractor'],
    'contractor': ['general_contractor'],
  };

  // Find matching types
  for (const [key, types] of Object.entries(typeMap)) {
    if (keywordLower.includes(key)) {
      return types;
    }
  }

  // Default to general establishment types
  return ['establishment'];
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

      // Helper to generate random email
      const randEmail = (businessName: string) => {
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'business.com', 'company.net'];
        const cleanName = businessName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 15);
        return `${cleanName}@${domains[Math.floor(Math.random() * domains.length)]}`;
      };

      for (let i = 0; i < count; i++) {
        const hasWebsite = Math.random() > 0.6; // 40% chance of no website
        const nameSuffix = ['Services', 'Co.', 'Solutions', 'Pros', 'Experts', 'Group', 'Inc', 'LLC'][Math.floor(Math.random() * 8)];
        const street = ['Main St', 'Oak Ave', 'Maple Dr', 'Washington Blvd', 'First St', 'Park Way'][Math.floor(Math.random() * 6)];
        const businessName = `${keyword} ${nameSuffix} ${i + 1}`;
        const hasEmail = Math.random() > 0.3; // 70% chance of having email

        results.push({
          id: `lead_${Math.random().toString(36).substr(2, 9)}`,
          business_name: businessName,
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
  const headers = ['Business Name', 'Phone', 'Email', 'City', 'Address', 'Google Maps Link'];
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
