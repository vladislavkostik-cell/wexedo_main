
export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: 'code' | 'search' | 'megaphone' | 'users' | 'bar-chart' | 'linkedin';
  // New fields for the modal
  details: string;
  infographicSteps: { title: string; desc: string }[];
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText: string;
}

export interface Client {
  id: string;
  name: string;
  description: string;
  ceoName: string;
  role: string;
  logo: string; // Path to logo image
  website?: string;
}

export interface Stat {
  value: string;
  label: string;
  color: 'purple' | 'green' | 'gold' | 'default';
}

export interface UGCItem {
  id: string;
  title: string;
  creator: string;
  views: string;
  platform: 'tiktok' | 'instagram' | 'youtube' | 'linkedin';
  thumbnailColor: string;
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}
