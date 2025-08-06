<template>
  <header class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Dynamic Background with Parallax Effect -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-fixed"
      :style="`background-image: url('${config.hero?.backgroundImage || '/hero-bg.jpg'}')`"
    ></div>
    
    <!-- Dynamic Overlay -->
    <div 
      class="absolute inset-0"
      :style="`background: linear-gradient(135deg, 
        rgba(220, 38, 38, ${config.hero?.overlayOpacity || 0.3}),
        rgba(245, 158, 11, ${(config.hero?.overlayOpacity || 0.3) * 0.7})
      )`"
    ></div>
    
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute top-1/2 right-1/3 w-48 h-48 bg-white/4 rounded-full blur-2xl animate-bounce-slow"></div>
    </div>
    
    <!-- Main Content -->
    <div class="relative z-10 text-center px-6 max-w-6xl mx-auto">
      <!-- Logo/Restaurant Name -->
      <div class="mb-12 fade-in">
        <img 
          v-if="config.logo" 
          :src="config.logo" 
          :alt="config.restaurantName"
          class="w-32 h-32 mx-auto mb-8 rounded-full shadow-2xl border-4 border-white/20 backdrop-blur-sm"
          @error="handleLogoError"
        />
        
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-6 text-shadow-lg">
          {{ config.restaurantName }}
        </h1>
        
        <div class="w-32 h-1 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"></div>
      </div>

      <!-- Hero Content -->
      <div class="mb-16 slide-up">
        <h2 class="text-3xl md:text-5xl lg:text-6xl font-playfair font-light text-white mb-6 text-shadow">
          {{ config.hero?.title || 'Sabores Auténticos' }}
        </h2>
        
        <p class="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-8 text-shadow">
          {{ config.hero?.subtitle || 'Experiencia culinaria única' }}
        </p>
        
        <p class="text-lg md:text-xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed text-shadow">
          {{ config.hero?.description || 'Descubre los sabores más exquisitos preparados con amor y los ingredientes más frescos.' }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 slide-up">
        <a 
          href="#menu" 
          class="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-lg px-10 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20 font-semibold"
        >
          <span class="flex items-center gap-3">
            <span>{{ config.hero?.ctaText || 'Ver Menú' }}</span>
            <ChefHat :size="24" />
          </span>
        </a>
        
        <WhatsAppButton
          :phone="config.phoneNumber"
          :base-message="config.whatsappMessage"
          button-text="Hacer Pedido Ahora"
          class="text-lg px-10 py-4 rounded-2xl bg-green-500 hover:bg-green-600 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/20"
        />
      </div>

      <!-- Features/Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto slide-up">
        <div
          v-for="(feature, index) in config.features"
          :key="index"
          class="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
        >
          <div class="text-4xl mb-4 animate-bounce-slow">{{ feature.icon }}</div>
          <div class="text-3xl md:text-4xl font-bold text-white mb-2 text-shadow">{{ feature.number }}</div>
          <div class="text-lg font-semibold text-white/90 mb-1">{{ feature.text }}</div>
          <div class="text-sm text-white/70">{{ feature.description }}</div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
      <div class="flex flex-col items-center text-white/80">
        <span class="text-sm font-medium mb-2">Desliza para explorar</span>
        <ChevronDown :size="32" class="animate-pulse" />
      </div>
    </div>

    <!-- Decorative Corner Elements -->
    <div class="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-white/30 rounded-tl-3xl"></div>
    <div class="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-white/30 rounded-tr-3xl"></div>
    <div class="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-white/30 rounded-bl-3xl"></div>
    <div class="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-white/30 rounded-br-3xl"></div>
  </header>
</template>

<script setup lang="ts">
import { ChevronDown, ChefHat } from 'lucide-vue-next';
import type { RestaurantConfig } from '../types';
import WhatsAppButton from './WhatsAppButton.vue';

interface Props {
  config: RestaurantConfig;
}

defineProps<Props>();

const handleLogoError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
};
</script>

<style scoped>
/* Additional component-specific styles */
.text-shadow {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.text-shadow-lg {
  text-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

/* Parallax effect for background */
@media (min-width: 768px) {
  .bg-fixed {
    background-attachment: fixed;
  }
}

/* Enhanced mobile responsiveness */
@media (max-width: 640px) {
  header {
    min-height: 100vh;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
  }
}
</style>
