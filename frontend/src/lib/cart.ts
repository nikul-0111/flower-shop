import type { CartItem, Flower } from '../types/flower';

const CART_STORAGE_KEY = 'bloomify_cart_v1';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading cart from localStorage:', err);
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { items } }));
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
}

export function addToCart(flower: Flower, quantity: number = 1, selectedColor?: string): void {
  const cart = getCart();
  const slugStr = typeof flower.slug === 'string' ? flower.slug : flower.slug.current;
  const existingIndex = cart.findIndex((item) => item.id === flower._id && item.selectedColor === selectedColor);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: flower._id,
      name: flower.name,
      slug: slugStr,
      price: flower.price,
      oldPrice: flower.oldPrice,
      image: flower.image,
      category: flower.category,
      quantity,
      selectedColor: selectedColor || (flower.colors && flower.colors[0]) || undefined,
    });
  }
  saveCart(cart);
}

export function removeFromCart(id: string, selectedColor?: string): void {
  let cart = getCart();
  cart = cart.filter((item) => !(item.id === id && item.selectedColor === selectedColor));
  saveCart(cart);
}

export function updateQuantity(id: string, newQuantity: number, selectedColor?: string): void {
  const cart = getCart();
  const item = cart.find((i) => i.id === id && i.selectedColor === selectedColor);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(id, selectedColor);
      return;
    }
    item.quantity = newQuantity;
    saveCart(cart);
  }
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartCount(): number {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal(): { subtotal: number; shipping: number; total: number } {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;
  return { subtotal, shipping, total };
}
