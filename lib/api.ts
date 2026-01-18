
import { Lead, SearchParams } from './types';

// In a real production app, these keys should be environmental variables 
// and the Google Places logic should live in a backend server/edge function
// to avoid exposing your API keys and CORS issues.
// const GOOGLE_PLACES_API_KEY = process.env.REACT_APP_GOOGLE_PLACES_KEY;
// const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
// const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

/**
 * Simulates the backend API call to search for businesses
 * 1. Search Google Places
 * 2. Get Details (Website check)
 * 3. Filter results
 * 4. Save to DB
 */
export const searchLeads = async (params: SearchParams): Promise<Lead[]> => {
  // SIMULATION MODE: 
  // Since we don't have a real backend in this demo environment, 
  // we generate realistic data based on the user's input.
  
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
          business_name: `${keyword} ${nameSuffix} ${i+1}`,
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
      
      // Filter logic: In a real app, we might return all and let frontend filter, 
      // or filter backend side. Here we return all but mark them so UI can show the filtering happening.
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
  link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
