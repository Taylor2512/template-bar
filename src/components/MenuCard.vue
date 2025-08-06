<template>
  <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
    <!-- Image -->
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="item.image || '/placeholder-food.jpg'" 
        :alt="item.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        @error="handleImageError"
      />
      <div v-if="item.featured" class="absolute top-3 left-3">
        <span class="bg-secondary text-white px-3 py-1 rounded-full text-sm font-medium">
          ⭐ Especial
        </span>
      </div>
      <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
        <span class="text-primary font-bold text-lg">
          ${{ item.price.toFixed(2) }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ item.name }}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ item.description }}</p>
      
      <!-- Actions -->
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <button
            @click="removeFromCart"
            :disabled="itemQuantity === 0"
            class="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Minus :size="16" />
          </button>
          
          <span class="w-8 text-center font-medium">{{ itemQuantity }}</span>
          
          <button
            @click="addToCart"
            class="w-8 h-8 rounded-full bg-primary hover:bg-red-700 text-white flex items-center justify-center transition-colors"
          >
            <Plus :size="16" />
          </button>
        </div>

        <WhatsAppButton
          :phone="config.phoneNumber"
          :base-message="config.whatsappMessage"
          :item="{ name: item.name, price: item.price }"
          button-text="Pedir"
          class="text-sm"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Plus, Minus } from 'lucide-vue-next';
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
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
