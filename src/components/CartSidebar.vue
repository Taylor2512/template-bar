<template>
  <div class="relative">
    <!-- Enhanced Cart Button -->
    <button
      @click="toggleCart"
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 dark:from-primary-500 dark:to-secondary-500 dark:hover:from-primary-600 dark:hover:to-secondary-600 text-white rounded-full p-3 sm:p-4 shadow-xl hover:shadow-2xl dark:shadow-primary-500/30 dark:hover:shadow-primary-400/40 transition-all duration-300 z-50 group transform hover:scale-110 active:scale-95 touch-manipulation"
      :class="{ 'animate-pulse': cartItemsCount > 0 }"
    >
      <ShoppingCart :size="20" class="sm:w-6 sm:h-6" />
      <span
        v-if="cartItemsCount > 0"
        class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-accent-500 dark:bg-accent-400 text-white text-xs sm:text-sm font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center animate-bounce shadow-lg dark:shadow-accent-400/30"
      >
        {{ cartItemsCount }}
      </span>
      
      <!-- Ripple effect -->
      <div 
        v-if="cartItemsCount > 0"
        class="absolute inset-0 rounded-full bg-primary-300 dark:bg-primary-400 animate-ping opacity-20"
      ></div>
    </button>

    <!-- Enhanced Cart Sidebar -->
    <Transition name="slide-right">
      <div
        v-if="isCartOpen"
        class="fixed inset-0 z-50 overflow-hidden"
        @click="closeCart"
      >
        <div class="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-lg transition-all duration-300"></div>
        
        <div
          class="absolute right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-900 shadow-2xl dark:shadow-black/50 flex flex-col border-l border-gray-200 dark:border-gray-700"
          @click.stop
        >
          <!-- Enhanced Header -->
          <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary-600 dark:bg-primary-500 rounded-lg">
                <ShoppingCart class="text-white" :size="18" />
              </div>
              <div>
                <h2 class="text-lg sm:text-xl font-playfair font-bold text-gray-800 dark:text-gray-100">Tu Pedido</h2>
                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{{ cartItemsCount }} {{ cartItemsCount === 1 ? 'producto' : 'productos' }}</p>
              </div>
            </div>
            <button
              @click="closeCart"
              class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors touch-manipulation active:scale-95"
            >
              <X :size="20" class="sm:w-6 sm:h-6" />
            </button>
          </div>

          <!-- Cart Items with improved styling -->
          <div class="flex-1 overflow-y-auto">
            <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8">
              <div class="p-3 sm:p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <ShoppingCart class="text-gray-400 dark:text-gray-500" :size="32" />
              </div>
              <h3 class="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Tu carrito está vacío</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6">Agrega algunos platos deliciosos para comenzar</p>
              <button
                @click="closeCart"
                class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors touch-manipulation active:scale-95"
              >
                Explorar Menú
              </button>
            </div>

            <div v-else class="p-4 space-y-4">
              <div 
                v-for="item in cartItems" 
                :key="item.name"
                class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div class="flex gap-4">
                  <!-- Enhanced Item Image -->
                  <div class="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img 
                      :src="item.image || '/placeholder-food.jpg'" 
                      :alt="item.name"
                      class="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                      @error="handleImageError"
                    />
                    <div class="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-200"></div>
                  </div>

                  <!-- Enhanced Item Details -->
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-gray-800 truncate mb-1">{{ item.name }}</h4>
                    <p class="text-xs text-gray-500 mb-1">{{ item.categoryName }}</p>
                    <p class="text-sm text-gray-600">${{ item.price.toFixed(2) }} c/u</p>
                    
                    <!-- Dietary badges if available -->
                    <div class="flex gap-1 mt-2">
                      <span v-if="item.isVegetarian" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        🌱 Vegetariano
                      </span>
                      <span v-if="item.spiceLevel && item.spiceLevel !== 'mild'" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                        🌶️ Picante
                      </span>
                    </div>
                  </div>

                  <!-- Enhanced Quantity Controls -->
                  <div class="flex flex-col items-end justify-between">
                    <button
                      @click="removeFromCart(item.name)"
                      class="text-gray-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded"
                      title="Eliminar del carrito"
                    >
                      <Trash2 :size="16" />
                    </button>

                    <div class="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        @click="decreaseQuantity(item)"
                        :disabled="item.quantity <= 1"
                        class="w-8 h-8 rounded-md bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Minus :size="14" />
                      </button>
                      
                      <span class="w-8 text-center font-semibold text-gray-800">{{ item.quantity }}</span>
                      
                      <button
                        @click="addToCartFromSidebar(item)"
                        class="w-8 h-8 rounded-md bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        <Plus :size="14" />
                      </button>
                    </div>

                    <div class="text-right">
                      <p class="font-bold text-primary-600">${{ (item.price * item.quantity).toFixed(2) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Enhanced Footer -->
          <div v-if="cartItems.length > 0" class="border-t border-gray-200 p-6 bg-gray-50">
            <!-- Order Summary -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span v-if="deliveryFee > 0">${{ deliveryFee.toFixed(2) }}</span>
                <span v-else class="text-green-600">Gratis</span>
              </div>
              <div class="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t border-gray-300">
                <span>Total</span>
                <span class="text-primary-600">${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Enhanced Action Buttons -->
            <div class="space-y-3">
              <WhatsAppButton
                :phone="config.phoneNumber"
                :base-message="whatsappMessage"
                :cart-items="cartItems"
                button-text="Enviar Pedido por WhatsApp"
                class="w-full justify-center bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              />
              
              <button
                @click="clearCart"
                class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-medium transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>

            <!-- Delivery Info -->
            <div class="mt-4 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-start gap-3">
                <Clock class="text-blue-600 flex-shrink-0 mt-0.5" :size="16" />
                <div class="text-sm">
                  <p class="text-blue-800 font-medium">Tiempo estimado de entrega</p>
                  <p class="text-blue-600">30-45 minutos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ShoppingCart, X, Plus, Minus, Trash2, Clock } from 'lucide-vue-next';
import type { RestaurantConfig, CartItem } from '../types';
import { useCart } from '../composables/useCart';
import WhatsAppButton from './WhatsAppButton.vue';

interface Props {
  config: RestaurantConfig;
}

defineProps<Props>();

const { cartItems, cartItemsCount, addToCart, removeFromCart, clearCart } = useCart();

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

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    // Simply remove one item from cart
    removeFromCart(item.name);
    // Add back with reduced quantity
    const reducedItem = { ...item, quantity: item.quantity - 1 };
    addToCart(reducedItem as any, item.categoryName);
  }
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder-food.jpg';
};

// Enhanced computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});

const deliveryFee = computed(() => {
  // Free delivery over $50 or based on config
  return subtotal.value >= 50 ? 0 : 5;
});

const total = computed(() => {
  return subtotal.value + deliveryFee.value;
});

const whatsappMessage = computed(() => {
  let message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n`;
  
  cartItems.value.forEach((item) => {
    message += `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
  });
  
  message += `\nSubtotal: $${subtotal.value.toFixed(2)}`;
  if (deliveryFee.value > 0) {
    message += `\nDelivery: $${deliveryFee.value.toFixed(2)}`;
  }
  message += `\nTotal: $${total.value.toFixed(2)}`;
  message += `\n\n¡Gracias!`;
  
  return message;
});
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
