export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image?: string;
  featured?: boolean;
}

export interface MenuCategory {
  category: string;
  icon: string;
  items: MenuItem[];
}

export interface RestaurantConfig {
  restaurantName: string;
  primaryColor: string;
  secondaryColor: string;
  phoneNumber: string;
  address: string;
  whatsappMessage: string;
  email: string;
  logo?: string;
  hero?: {
    title: string;
    subtitle: string;
    image: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
  };
}

export interface CartItem extends MenuItem {
  quantity: number;
  categoryName: string;
}
