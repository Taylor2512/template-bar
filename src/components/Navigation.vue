<template>
  <nav class="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <img 
            v-if="config.logo" 
            :src="config.logo" 
            :alt="config.restaurantName"
            class="h-10 w-10 rounded-full mr-3"
            @error="handleLogoError"
          />
          <span class="font-playfair font-bold text-xl text-gray-800">
            {{ config.restaurantName }}
          </span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#inicio" class="text-gray-700 hover:text-primary transition-colors">Inicio</a>
          <a href="#menu" class="text-gray-700 hover:text-primary transition-colors">Menú</a>
          <a href="#contacto" class="text-gray-700 hover:text-primary transition-colors">Contacto</a>
          <a href="#qr" class="text-gray-700 hover:text-primary transition-colors">QR</a>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Menu v-if="!isMobileMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#inicio"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            Inicio
          </a>
          <a
            href="#menu"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            Menú
          </a>
          <a
            href="#contacto"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            Contacto
          </a>
          <a
            href="#qr"
            @click="closeMobileMenu"
            class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
          >
            QR
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, X } from 'lucide-vue-next';
import type { RestaurantConfig } from '../types';

interface Props {
  config: RestaurantConfig;
}

defineProps<Props>();

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleLogoError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
};
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
