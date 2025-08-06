import { ref, computed } from 'vue';
import type { CartItem, MenuItem } from '../types';

const cartItems = ref<CartItem[]>([]);

export const useCart = () => {
  const addToCart = (item: MenuItem, categoryName: string) => {
    const existingItem = cartItems.value.find(
      cartItem => cartItem.name === item.name
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({
        ...item,
        quantity: 1,
        categoryName
      });
    }
  };

  const removeFromCart = (itemName: string) => {
    const index = cartItems.value.findIndex(item => item.name === itemName);
    if (index > -1) {
      if (cartItems.value[index].quantity > 1) {
        cartItems.value[index].quantity -= 1;
      } else {
        cartItems.value.splice(index, 1);
      }
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const cartTotal = computed(() => {
    return cartItems.value.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    );
  });

  const cartItemsCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  return {
    cartItems: computed(() => cartItems.value),
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
    cartItemsCount
  };
};
