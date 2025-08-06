<template>
  <div class="card-elevated group cursor-pointer overflow-hidden h-full">
    <!-- Image Container with Overlay -->
    <div class="relative h-64 overflow-hidden">
      <img 
        :src="item.image || '/placeholder-food.jpg'" 
        :alt="item.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        @error="handleImageError"
      />
      
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Featured Badge -->
      <div v-if="item.featured" class="absolute top-4 left-4">
        <div class="badge-featured flex items-center gap-1">
          <Star :size="14" class="fill-current" />
          <span>Especial</span>
        </div>
      </div>

      <!-- Price Tag -->
      <div class="absolute top-4 right-4">
        <div class="price-tag text-lg font-bold">
          ${{ item.price.toFixed(2) }}
        </div>
      </div>

      <!-- Dietary & Spice Badges -->
      <div class="absolute bottom-4 left-4 flex flex-wrap gap-2">
        <div v-if="item.isVegetarian" class="badge-dietary text-xs">
          🌱 Vegetariano
        </div>
        <div v-if="item.isVegan" class="badge-dietary text-xs">
          🌿 Vegano
        </div>
        <div v-if="item.isGlutenFree" class="badge-dietary text-xs">
          🌾 Sin Gluten
        </div>
        <div v-if="item.spiceLevel" class="badge-spice text-xs">
          {{ getSpiceIndicator(item.spiceLevel) }} {{ getSpiceLabel(item.spiceLevel) }}
        </div>
      </div>

      <!-- Preparation Time -->
      <div v-if="item.preparationTime" class="absolute bottom-4 right-4">
        <div class="bg-black/70 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
          <Clock :size="12" />
          <span>{{ item.preparationTime }}min</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex-1 flex flex-col">
      <!-- Title and Description -->
      <div class="flex-1">
        <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
          {{ item.name }}
        </h3>
        
        <p class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {{ item.description }}
        </p>

        <!-- Additional Info -->
        <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div v-if="item.calories" class="flex items-center gap-1">
            <Zap :size="12" />
            <span>{{ item.calories }} cal</span>
          </div>
          
          <div v-if="item.allergens && item.allergens.length > 0" class="flex items-center gap-1">
            <AlertTriangle :size="12" />
            <span>Contiene: {{ item.allergens.join(', ') }}</span>
          </div>
        </div>
      </div>
      
      <!-- Action Controls -->
      <div class="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-100">
        <!-- Quantity Controls -->
        <div class="flex items-center gap-3">
          <button
            @click="removeFromCart(item.name)"
            :disabled="itemQuantity === 0"
            class="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-500 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 transform hover:scale-110"
            :class="{ 'animate-pulse': itemQuantity > 0 }"
          >
            <Minus :size="16" />
          </button>
          
          <div class="flex flex-col items-center">
            <span class="text-lg font-bold text-gray-800 min-w-[2rem] text-center">
              {{ itemQuantity }}
            </span>
            <span v-if="itemQuantity > 0" class="text-xs text-gray-500">
              ${{ (item.price * itemQuantity).toFixed(2) }}
            </span>
          </div>
          
          <button
            @click="addToCart"
            class="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <Plus :size="16" />
          </button>
        </div>

        <!-- WhatsApp Order Button -->
        <WhatsAppButton
          :phone="config.phoneNumber"
          :base-message="config.whatsappMessage"
          :item="{ name: item.name, price: item.price }"
          button-text="Pedir"
          class="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300 font-medium"
        />
      </div>
    </div>

    <!-- Hover Effect Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Plus, Minus, Star, Clock, Zap, AlertTriangle } from 'lucide-vue-next';
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
