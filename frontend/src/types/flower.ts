export interface Flower {
  _id: string;
  name: string;
  slug: {
    current: string;
  } | string;
  description: string;
  image: string;
  price: number;
  oldPrice?: number;
  category: string;
  featured?: boolean;
  bestSeller?: boolean;
  stock: number;
  colors?: string[];
  flowerType?: string;
  careInstructions?: string;
  deliveryInformation?: string;
  createdAt?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  quantity: number;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}
