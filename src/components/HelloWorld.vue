<template>
  <header class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-secondary/10"></div>
    
    <!-- Decorative elements -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
    
    <!-- Content -->
    <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
      <!-- Logo/Restaurant Name -->
      <div class="mb-8 fade-in">
        <img 
          v-if="config.logo" 
          :src="config.logo" 
          :alt="config.restaurantName"
          class="w-24 h-24 mx-auto mb-6 rounded-full shadow-lg"
          @error="handleLogoError"
        />
        <h1 class="text-5xl md:text-7xl font-playfair font-bold text-gray-800 mb-4">
          {{ config.restaurantName }}
        </h1>
      </div>

      <!-- Hero Content -->
      <div v-if="config.hero" class="mb-12 slide-up">
        <h2 class="text-2xl md:text-4xl font-light text-gray-700 mb-4">
          {{ config.hero.title }}
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          {{ config.hero.subtitle }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 slide-up">
        <a 
          href="#menu" 
          class="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Ver Menú
        </a>
        
        <WhatsAppButton
          :phone="config.phoneNumber"
          :base-message="config.whatsappMessage"
          button-text="Hacer Pedido"
          class="px-8 py-4 text-lg rounded-full"
        />
      </div>

      <!-- Stats or Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto slide-up">
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-2">25+</div>
          <div class="text-gray-600">Platos Únicos</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-2">1985</div>
          <div class="text-gray-600">Desde</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-2">100%</div>
          <div class="text-gray-600">Ingredientes Frescos</div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown :size="32" class="text-gray-400" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next';
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
