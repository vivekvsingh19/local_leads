
export interface Lead {
  id: string;
  business_name: string;
  address: string;
  phone: string;
  category: string;
  city: string;
  has_website: boolean;
  website_url?: string;
  google_maps_url: string;
  rating?: number;
  reviews?: number;
}

export interface SearchParams {
  keyword: string;
  city: string;
}
