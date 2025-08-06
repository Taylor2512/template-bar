<template>
  <div class="relative">
    <!-- Cart Button -->
    <button
      @click="toggleCart"
      class="fixed bottom-6 right-6 bg-primary hover:bg-red-700 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 z-50 group"
      :class="{ 'animate-pulse': cartItemsCount > 0 }"
    >
      <ShoppingCart :size="24" />
      <span
        v-if="cartItemsCount > 0"
        class="absolute -top-2 -right-2 bg-secondary text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce"
      >
        {{ cartItemsCount }}
      </span>
    </button>

    <!-- Cart Sidebar -->
    <Transition name="slide-right">
      <div
        v-if="isCartOpen"
        class="fixed inset-0 z-50 overflow-hidden"
        @click="closeCart"
      >
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <div
          class="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800">Mi Pedido</h2>
            <button
              @click="closeCart"
              class="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X :size="24" />
            </button>
          </div>

          <!-- Cart Items -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4 max-h-96">
            <div
              v-if="cartItems.length === 0"
              class="text-center py-12 text-gray-500"
            >
              <ShoppingCart :size="48" class="mx-auto mb-4 opacity-50" />
              <p>Tu carrito está vacío</p>
            </div>

            <div
              v-for="item in cartItems"
              :key="item.name"
              class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <img
                :src="item.image || '/placeholder-food.jpg'"
                :alt="item.name"
                class="w-16 h-16 object-cover rounded-lg"
                @error="handleImageError"
              />
              
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-gray-800 truncate">{{ item.name }}</h4>
                <p class="text-sm text-gray-500">{{ item.categoryName }}</p>
                <p class="text-primary font-bold">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>

              <div class="flex items-center gap-2">
                <button
                  @click="removeFromCart(item.name)"
                  class="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-500 flex items-center justify-center transition-colors"
                >
                  <Minus :size="16" />
                </button>
                
                <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                
                <button
                  @click="addToCartFromSidebar(item)"
                  class="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-500 flex items-center justify-center transition-colors"
                >
                  <Plus :size="16" />
                </button>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div v-if="cartItems.length > 0" class="border-t border-gray-200 p-6 space-y-4">
            <div class="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span class="text-primary">${{ cartTotal.toFixed(2) }}</span>
            </div>

            <div class="space-y-2">
              <WhatsAppButton
                :phone="config.phoneNumber"
                :base-message="config.whatsappMessage"
                :cart-items="cartItems"
                button-text="Enviar Pedido por WhatsApp"
                class="w-full justify-center py-3 text-lg"
              />
              
              <button
                @click="clearCart"
                class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
              >
                Limpiar Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ShoppingCart, X, Plus, Minus } from 'lucide-vue-next';
import type { RestaurantConfig, CartItem } from '../types';
import { useCart } from '../composables/useCart';
import WhatsAppButton from './WhatsAppButton.vue';

interface Props {
  config: RestaurantConfig;
}

defineProps<Props>();

const { cartItems, cartTotal, cartItemsCount, addToCart, removeFromCart, clearCart } = useCart();

const isCartOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const closeCart = () => {
  isCartOpen.value = false;
};

const addToCartFromSidebar = (item: CartItem) => {
  addToCart(item, item.categoryName);
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder-food.jpg';
};
</script>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
