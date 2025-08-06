<template>
  <nav class="fixed top-0 left-0 right-0 z-40 transition-all duration-300" :class="navClasses">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex items-center group">
          <img 
            v-if="config.logo" 
            :src="config.logo" 
            :alt="config.restaurantName"
            class="h-12 w-12 rounded-full mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
            @error="handleLogoError"
          />
          <div class="flex flex-col">
            <span class="font-playfair font-bold text-2xl text-gray-800 group-hover:text-primary-600 transition-colors">
              {{ config.restaurantName }}
            </span>
            <span class="text-xs text-gray-600 font-medium tracking-wide">
              {{ config.hero?.subtitle || 'Sabores Auténticos' }}
            </span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a 
            v-for="item in navItems" 
            :key="item.href"
            :href="item.href" 
            @click="smoothScroll(item.href)"
            class="relative px-4 py-2 text-gray-700 hover:text-primary-600 transition-all duration-300 font-medium group"
          >
            <span class="flex items-center gap-2">
              <component :is="item.icon" :size="18" />
              {{ item.label }}
            </span>
            <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-500 group-hover:w-full transition-all duration-300"></div>
          </a>
        </div>

        <!-- Action Buttons (Desktop) -->
        <div class="hidden md:flex items-center space-x-4">
          <WhatsAppButton
            :phone="config.phoneNumber"
            :base-message="config.whatsappMessage"
            button-text="Pedir"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          />
          
          <!-- Phone Call Button -->
          <a 
            :href="`tel:${config.phoneNumber}`"
            class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            <Phone :size="16" />
            <span class="hidden lg:inline">Llamar</span>
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="p-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-600/30 transition-all duration-200"
          >
            <Menu v-if="!isMobileMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-xl">
        <div class="px-4 pt-4 pb-6 space-y-3">
          <!-- Navigation Links -->
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            @click="handleMobileNavClick(item.href)"
            class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium"
          >
            <component :is="item.icon" :size="20" />
            {{ item.label }}
          </a>
          
          <!-- Divider -->
          <div class="border-t border-gray-200 my-4"></div>
          
          <!-- Action Buttons -->
          <div class="space-y-3">
            <WhatsAppButton
              :phone="config.phoneNumber"
              :base-message="config.whatsappMessage"
              button-text="Hacer Pedido por WhatsApp"
              class="w-full justify-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium shadow-md"
            />
            
            <a 
              :href="`tel:${config.phoneNumber}`"
              class="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium shadow-md transition-colors"
            >
              <Phone :size="18" />
              Llamar al {{ config.phoneNumber }}
            </a>
          </div>
          
          <!-- Restaurant Info -->
          <div class="mt-6 pt-4 border-t border-gray-200">
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-2">{{ config.address }}</p>
              <div class="flex justify-center space-x-4">
                <a
                  v-if="config.social?.facebook"
                  :href="config.social.facebook"
                  target="_blank"
                  class="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Facebook :size="20" />
                </a>
                <a
                  v-if="config.social?.instagram"
                  :href="config.social.instagram"
                  target="_blank"
                  class="text-gray-400 hover:text-pink-600 transition-colors"
                >
                  <Instagram :size="20" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Menu, X, Phone, Home, UtensilsCrossed, MessageCircle, QrCode, Facebook, Instagram } from 'lucide-vue-next';
import type { RestaurantConfig } from '../types';
import WhatsAppButton from './WhatsAppButton.vue';

interface Props {
  config: RestaurantConfig;
}

defineProps<Props>();

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

const navItems = [
  { href: '#inicio', label: 'Inicio', icon: Home },
  { href: '#menu', label: 'Menú', icon: UtensilsCrossed },
  { href: '#contacto', label: 'Contacto', icon: MessageCircle },
  { href: '#qr', label: 'Compartir', icon: QrCode },
];

const navClasses = computed(() => ({
  'bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-lg': isScrolled.value,
  'bg-transparent': !isScrolled.value,
}));

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const handleMobileNavClick = (href: string) => {
  closeMobileMenu();
  smoothScroll(href);
};

const smoothScroll = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const handleLogoError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
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

/* Enhance mobile menu appearance */
@media (max-width: 768px) {
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
