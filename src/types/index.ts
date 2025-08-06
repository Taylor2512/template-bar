export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image?: string;
  featured?: boolean;
  category?: string;
  allergens?: string[];
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'extra-hot';
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  preparationTime?: number; // in minutes
  calories?: number;
}

export interface MenuCategory {
  category: string;
  icon: string;
  items: MenuItem[];
  description?: string;
  featured?: boolean;
}

export interface FeatureItem {
  icon: string;
  number: string;
  text: string;
  description: string;
}

export interface ThemeConfig {
  fontPrimary: string;
  fontSecondary: string;
  borderRadius: string;
  shadowIntensity: string;
  animationSpeed: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  overlayOpacity: number;
  ctaText: string;
}

export interface ContactSchedule {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface LocationConfig {
  lat: number;
  lng: number;
  googleMapsUrl: string;
}

export interface ContactConfig {
  schedule: ContactSchedule;
  location: LocationConfig;
}

export interface SocialConfig {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
}

export interface RestaurantConfig {
  restaurantName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  phoneNumber: string;
  address: string;
  whatsappMessage: string;
  email: string;
  website: string;
  logo?: string;
  favicon?: string;
  theme: ThemeConfig;
  hero: HeroConfig;
  features: FeatureItem[];
  contact: ContactConfig;
  social: SocialConfig;
  seo: SEOConfig;
}

export interface CartItem extends MenuItem {
  quantity: number;
  categoryName: string;
  notes?: string;
}
