<template>
  <header id="inicio" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Dynamic Background with Parallax Effect -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-fixed"
      :style="`background-image: url('${config.hero?.backgroundImage || '/hero-bg.jpg'}')`"
    ></div>
    
    <!-- Enhanced Gradient Overlay -->
    <div 
      class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"
    ></div>
    
    <!-- Subtle Pattern Overlay -->
    <div class="absolute inset-0 bg-dots-pattern opacity-10"></div>
    
    <!-- Main Content Container -->
    <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      <!-- Logo Section -->
      <div class="mb-8 md:mb-12 animate-fade-in">
        <div v-if="config.logo" class="mb-6 md:mb-8">
          <img 
            :src="config.logo" 
            :alt="config.restaurantName"
            class="w-20 h-20 md:w-28 md:h-28 mx-auto rounded-full shadow-2xl border-4 border-white/30 backdrop-blur-sm object-cover"
            @error="handleLogoError"
          />
        </div>
        
        <!-- Restaurant Name -->
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-4 text-shadow-lg tracking-wide leading-tight">
          {{ config.restaurantName }}
        </h1>
        
        <!-- Elegant Divider -->
        <div class="flex items-center justify-center my-6 md:my-8">
          <div class="w-16 md:w-20 h-px bg-gradient-to-r from-transparent to-primary-400"></div>
          <div class="mx-4 w-2 h-2 bg-primary-400 rounded-full"></div>
          <div class="w-16 md:w-20 h-px bg-gradient-to-l from-transparent to-primary-400"></div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="mb-10 md:mb-14 animate-slide-up animation-delay-300">
        <h2 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair text-primary-300 mb-4 md:mb-6 font-medium tracking-wide">
          {{ config.hero?.title || 'Sabores Auténticos' }}
        </h2>
        
        <p class="text-lg sm:text-xl md:text-2xl text-white/90 font-light mb-6 md:mb-8 leading-relaxed max-w-3xl mx-auto">
          {{ config.hero?.subtitle || 'Experiencia culinaria única desde 1985' }}
        </p>
        
        <p class="text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
          {{ config.hero?.description || 'Descubre los sabores más exquisitos de la cocina tradicional, preparados con amor y los ingredientes más frescos de la región.' }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16 animate-slide-up animation-delay-600">
        <a 
          href="#menu" 
          class="group w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full shadow-2xl hover:shadow-primary-500/25 transform hover:scale-105 transition-all duration-300 font-semibold border border-primary-500/30 min-w-[200px]"
        >
          <span class="flex items-center justify-center gap-3">
            <ChefHat :size="20" class="group-hover:rotate-12 transition-transform duration-300" />
            <span>{{ config.hero?.ctaText || 'Explorar Menú' }}</span>
          </span>
        </a>
        
        <WhatsAppButton
          :phone="config.phoneNumber"
          :base-message="config.whatsappMessage"
          button-text="Hacer Pedido"
          class="group w-full sm:w-auto text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300 font-semibold border border-green-500/30 min-w-[200px]"
        />
      </div>

      <!-- Enhanced Features Section -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-slide-up animation-delay-900">
        <div
          v-for="(feature, index) in config.features"
          :key="index"
          class="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 group"
        >
          <div class="text-3xl md:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{{ feature.icon }}</div>
          <div class="text-2xl md:text-3xl font-bold text-white mb-2 font-playfair">{{ feature.number }}</div>
          <div class="text-base font-semibold text-primary-300 mb-1">{{ feature.text }}</div>
          <div class="text-sm text-white/60 leading-relaxed">{{ feature.description }}</div>
        </div>
      </div>
    </div>

    <!-- Improved Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-bounce-gentle">
      <div class="flex flex-col items-center text-white/60 group cursor-pointer" onclick="document.querySelector('#menu').scrollIntoView({behavior: 'smooth'})">
        <span class="text-xs font-medium mb-2 group-hover:text-white/80 transition-colors">Desliza para explorar</span>
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-white/50 transition-colors">
          <div class="w-1 h-3 bg-white/40 rounded-full mt-2 animate-scroll-indicator"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ChefHat } from 'lucide-vue-next';
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
/* Enhanced text shadows */
.text-shadow {
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.text-shadow-lg {
  text-shadow: 0 6px 12px rgba(0, 0, 0, 0.6);
}

/* Dots pattern background */
.bg-dots-pattern {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
}

/* Enhanced animations */
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-slide-up {
  animation: slideUp 1s ease-out;
}

.animation-delay-300 {
  animation-delay: 0.3s;
  animation-fill-mode: both;
}

.animation-delay-600 {
  animation-delay: 0.6s;
  animation-fill-mode: both;
}

.animation-delay-900 {
  animation-delay: 0.9s;
  animation-fill-mode: both;
}

.animate-bounce-gentle {
  animation: bounceGentle 2s ease-in-out infinite;
}

.animate-scroll-indicator {
  animation: scrollIndicator 2s ease-in-out infinite;
}

/* Keyframe definitions */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceGentle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes scrollIndicator {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(8px);
  }
  100% {
    opacity: 0;
    transform: translateY(16px);
  }
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
    padding-top: 80px;
  }
  
  .animation-delay-300,
  .animation-delay-600,
  .animation-delay-900 {
    animation-delay: 0s;
  }
}

/* Improved focus states for accessibility */
button:focus-visible,
a:focus-visible {
  outline: 2px solid rgba(232, 133, 6, 0.8);
  outline-offset: 2px;
}

/* Enhanced hover effects */
.group:hover .group-hover\:rotate-12 {
  transform: rotate(12deg);
}
</style>
