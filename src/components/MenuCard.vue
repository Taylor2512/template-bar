<template>
  <div class="card-elevated group cursor-pointer overflow-hidden h-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg dark:shadow-gray-900/20 hover:shadow-xl dark:hover:shadow-gray-900/30 transition-all duration-300">
    <!-- Image Container with Overlay -->
    <div class="relative h-48 md:h-64 overflow-hidden">
      <img 
        :src="item.image || '/placeholder-food.jpg'" 
        :alt="item.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        @error="handleImageError"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Featured Badge -->
      <div v-if="item.featured" class="absolute top-2 md:top-4 left-2 md:left-4">
        <div class="badge-featured flex items-center gap-1 text-xs md:text-sm bg-gradient-to-r from-secondary-500 to-primary-500 text-white px-2 py-1 rounded-full shadow-lg">
          <Star :size="12" class="fill-current md:w-3.5 md:h-3.5" />
          <span class="hidden sm:inline">Especial</span>
          <span class="sm:hidden">★</span>
        </div>
      </div>

      <!-- Price Tag -->
      <div class="absolute top-2 md:top-4 right-2 md:right-4">
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-base md:text-lg font-bold shadow-lg">
          ${{ item.price.toFixed(2) }}
        </div>
      </div>

      <!-- Dietary & Spice Badges -->
      <div class="absolute bottom-2 md:bottom-4 left-2 md:left-4 flex flex-wrap gap-1 md:gap-2">
        <div v-if="item.isVegetarian" class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg text-xs border border-green-200 dark:border-green-700">
          <span class="hidden sm:inline">🌱 Vegetariano</span>
          <span class="sm:hidden">🌱</span>
        </div>
        <div v-if="item.isVegan" class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-lg text-xs border border-green-200 dark:border-green-700">
          <span class="hidden sm:inline">🌿 Vegano</span>
          <span class="sm:hidden">🌿</span>
        </div>
        <div v-if="item.isGlutenFree" class="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-lg text-xs border border-amber-200 dark:border-amber-700">
          <span class="hidden sm:inline">🌾 Sin Gluten</span>
          <span class="sm:hidden">🌾</span>
        </div>
        <div v-if="item.spiceLevel" class="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded-lg text-xs border border-red-200 dark:border-red-700">
          <span>{{ getSpiceIndicator(item.spiceLevel) }}</span>
          <span class="hidden sm:inline"> {{ getSpiceLabel(item.spiceLevel) }}</span>
        </div>
      </div>

      <!-- Preparation Time -->
      <div v-if="item.preparationTime" class="absolute bottom-2 md:bottom-4 right-2 md:right-4">
        <div class="bg-black/70 dark:bg-gray-900/80 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 backdrop-blur-sm">
          <Clock :size="10" class="md:w-3 md:h-3" />
          <span>{{ item.preparationTime }}min</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4 md:p-6 flex-1 flex flex-col">
      <!-- Title and Description -->
      <div class="flex-1">
        <h3 class="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 md:mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
          {{ item.name }}
        </h3>
        
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 leading-relaxed">
          {{ item.description }}
        </p>

        <!-- Additional Info -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 md:mb-4 gap-1 sm:gap-0">
          <div v-if="item.calories" class="flex items-center gap-1">
            <Zap :size="12" />
            <span>{{ item.calories }} cal</span>
          </div>
          
          <div v-if="item.allergens && item.allergens.length > 0" class="flex items-center gap-1">
            <AlertTriangle :size="12" />
            <span class="hidden sm:inline">Contiene: {{ item.allergens.join(', ') }}</span>
            <span class="sm:hidden">Alérgenos: {{ item.allergens.join(', ').substring(0, 20) }}{{ item.allergens.join(', ').length > 20 ? '...' : '' }}</span>
          </div>
        </div>
      </div>
      
      <!-- Action Controls -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 mt-auto pt-3 md:pt-4 border-t border-gray-100 dark:border-gray-700">
        <!-- Quantity Controls -->
        <div class="flex items-center gap-2 md:gap-3">
          <button
            @click="removeFromCart(item.name)"
            :disabled="itemQuantity === 0"
            class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 dark:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 transform hover:scale-110"
            :class="{ 'animate-pulse': itemQuantity > 0 }"
          >
            <Minus :size="14" class="md:w-4 md:h-4" />
          </button>
          
          <div class="flex flex-col items-center min-w-[3rem]">
            <span class="text-base md:text-lg font-bold text-gray-800 text-center">
              {{ itemQuantity }}
            </span>
            <span v-if="itemQuantity > 0" class="text-xs text-gray-500 whitespace-nowrap">
              ${{ (item.price * itemQuantity).toFixed(2) }}
            </span>
          </div>
          
          <button
            @click="addToCart"
            class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <Plus :size="14" class="md:w-4 md:h-4" />
          </button>
        </div>

        <!-- WhatsApp Order Button -->
        <WhatsAppButton
          :phone="config.phoneNumber"
          :base-message="config.whatsappMessage"
          :item="{ name: item.name, price: item.price }"
          button-text=""
          class="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-1 md:gap-2"
        >
          <MessageCircle :size="14" class="md:w-4 md:h-4" />
          <span class="hidden sm:inline">Pedir</span>
          <span class="sm:hidden">WhatsApp</span>
        </WhatsAppButton>
      </div>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Plus, Minus, Star, Clock, Zap, AlertTriangle, MessageCircle } from 'lucide-vue-next';
import type { MenuItem, RestaurantConfig } from '../types';
import { useCart } from '../composables/useCart';
import WhatsAppButton from './WhatsAppButton.vue';

interface Props {
  item: MenuItem;
  categoryName: string;
  config: RestaurantConfig;
}

const props = defineProps<Props>();

const { cartItems, addToCart: addToCartComposable, removeFromCart } = useCart();

const itemQuantity = computed(() => {
  const cartItem = cartItems.value.find(cartItem => cartItem.name === props.item.name);
  return cartItem ? cartItem.quantity : 0;
});

const addToCart = () => {
  addToCartComposable(props.item, props.categoryName);
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder-food.jpg';
};

const getSpiceIndicator = (level: string) => {
  const indicators = {
    'mild': '🌶️',
    'medium': '🌶️🌶️',
    'hot': '🌶️🌶️🌶️',
    'extra-hot': '🌶️🌶️🌶️🌶️'
  };
  return indicators[level as keyof typeof indicators] || '🌶️';
};

const getSpiceLabel = (level: string) => {
  const labels = {
    'mild': 'Suave',
    'medium': 'Medio',
    'hot': 'Picante',
    'extra-hot': 'Muy Picante'
  };
  return labels[level as keyof typeof labels] || 'Suave';
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced card hover effects */
.card-elevated {
  position: relative;
  overflow: hidden;
}

.card-elevated::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
  z-index: 1;
}

.card-elevated:hover::before {
  left: 100%;
}

/* Quantity badge animation */
@keyframes quantity-pop {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.quantity-change {
  animation: quantity-pop 0.3s ease;
}
</style>
