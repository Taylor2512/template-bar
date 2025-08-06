<template>
  <Teleport to="body">
    <!-- Floating Cart Button (Mobile Only) -->
    <div 
      v-if="cartItemCount > 0"
      class="fixed bottom-6 right-6 z-50 md:hidden"
    >
      <button
        @click="$emit('toggle-cart')"
        class="relative bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white w-14 h-14 rounded-full shadow-2xl hover:shadow-3xl dark:shadow-primary-500/20 dark:hover:shadow-primary-400/30 transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-pulse-slow"
      >
        <!-- Cart Icon -->
        <ShoppingCart :size="24" />
        
        <!-- Badge -->
        <span 
          class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce dark:shadow-red-400/30"
        >
          {{ cartItemCount }}
        </span>
        
        <!-- Ripple effect -->
        <div class="absolute inset-0 rounded-full bg-primary-400 dark:bg-primary-300 opacity-30 animate-ping"></div>
      </button>
      
      <!-- Total Amount Display -->
      <div 
        v-if="cartTotalAmount > 0"
        class="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 dark:bg-gray-900/90 text-white dark:text-gray-100 text-xs px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm border border-gray-700/30 dark:border-gray-600/50"
      >
        Total: ${{ cartTotalAmount.toFixed(2) }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ShoppingCart } from 'lucide-vue-next'
import { useCart } from '../composables/useCart'

// Emits
defineEmits<{
  'toggle-cart': []
}>()

// Cart composable
const { cartTotal, cartItemsCount } = useCart()

// Computed properties
const cartItemCount = computed(() => {
  return cartItemsCount.value
})

const cartTotalAmount = computed(() => {
  return cartTotal.value
})
</script>

<style scoped>
/* Additional custom animations for mobile */
@keyframes float-gentle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

.animate-float-gentle {
  animation: float-gentle 3s ease-in-out infinite;
}

/* Enhanced shadow glow effect with dark mode support */
@keyframes shadow-glow-light {
  0%, 100% { box-shadow: 0 10px 25px -5px rgba(232, 133, 6, 0.4); }
  50% { box-shadow: 0 15px 35px -5px rgba(232, 133, 6, 0.6); }
}

@keyframes shadow-glow-dark {
  0%, 100% { box-shadow: 0 10px 25px -5px rgba(232, 133, 6, 0.6); }
  50% { box-shadow: 0 15px 35px -5px rgba(232, 133, 6, 0.8); }
}

/* Light mode shadow glow */
@media (prefers-color-scheme: light) {
  button:hover {
    animation: shadow-glow-light 2s ease-in-out infinite;
  }
}

/* Dark mode shadow glow */
@media (prefers-color-scheme: dark) {
  button:hover {
    animation: shadow-glow-dark 2s ease-in-out infinite;
  }
}

/* Enhanced ripple effect for dark mode */
@media (prefers-color-scheme: dark) {
  .animate-ping {
    animation: ping-dark 1s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
}

@keyframes ping-dark {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
    background-color: rgba(232, 133, 6, 0.4);
  }
}

/* Enhanced backdrop blur for better contrast in dark mode */
@media (prefers-color-scheme: dark) {
  .backdrop-blur-sm {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
}
</style>
