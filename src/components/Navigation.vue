<template>
  <nav class="fixed top-0 left-0 right-0 z-40 transition-all duration-300" :class="navClasses">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-20">
        <!-- Logo Section - Simplified -->
        <div class="flex items-center group cursor-pointer" @click="smoothScroll('#inicio')">
          <img 
            v-if="config.logo" 
            :src="config.logo" 
            :alt="config.restaurantName"
            class="h-10 w-10 md:h-12 md:w-12 rounded-full mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300 object-cover"
            @error="handleLogoError"
          />
          <div class="min-w-0">
            <h1 class="font-playfair font-bold text-base md:text-xl lg:text-2xl text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
              {{ config.restaurantName }}
            </h1>
            <p class="text-xs text-gray-600 dark:text-gray-400 font-medium hidden md:block leading-tight">
              {{ config.hero?.subtitle?.substring(0, 30) || 'Sabores Auténticos' }}
            </p>
          </div>
        </div>

        <!-- Desktop Navigation - Simplified -->
        <div class="hidden lg:flex items-center space-x-6">
          <a 
            v-for="item in navItems" 
            :key="item.href"
            :href="item.href" 
            @click.prevent="smoothScroll(item.href)"
            class="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 font-medium text-sm flex items-center gap-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg"
          >
            <component :is="item.icon" :size="16" />
            <span>{{ item.label }}</span>
          </a>
        </div>

        <!-- Action Buttons (Desktop) -->
        <div class="hidden lg:flex items-center space-x-3">
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
            <span class="hidden xl:inline">Llamar</span>
          </a>
        </div>

        <!-- Mobile Actions - Compact -->
        <div class="flex items-center space-x-2 lg:hidden">
          <!-- Mobile WhatsApp Button -->
          <WhatsAppButton
            :phone="config.phoneNumber"
            :base-message="config.whatsappMessage"
            button-text=""
            class="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <MessageCircle :size="18" />
          </WhatsAppButton>

          <!-- Mobile menu button -->
          <button
            @click="toggleMobileMenu"
            class="p-3 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-600/30 transition-all duration-200"
          >
            <Menu v-if="!isMobileMenuOpen" :size="20" />
            <X v-else :size="20" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation - Simplified -->
    <Transition name="slide-down">
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-white/98 dark:bg-gray-900/98 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <div class="px-4 py-6 space-y-4">
          <!-- Navigation Links -->
          <div class="space-y-2">
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              @click="handleMobileNavClick(item.href)"
              class="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-all duration-200 font-medium"
            >
              <component :is="item.icon" :size="20" />
              <span>{{ item.label }}</span>
            </a>
          </div>
          
          <!-- Action Buttons -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <WhatsAppButton
              :phone="config.phoneNumber"
              :base-message="config.whatsappMessage"
              button-text="Hacer Pedido"
              class="w-full justify-center bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium shadow-md"
            />
            
            <a 
              :href="`tel:${config.phoneNumber}`"
              class="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white py-3 px-4 rounded-xl font-medium shadow-md transition-colors"
            >
              <Phone :size="18" />
              <span>Llamar Ahora</span>
            </a>
          </div>
          
          <!-- Restaurant Info -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ config.address }}</p>
            <div class="flex justify-center space-x-4">
              <a
                v-if="config.social?.facebook"
                :href="config.social.facebook"
                target="_blank"
                class="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Facebook :size="18" />
              </a>
              <a
                v-if="config.social?.instagram"
                :href="config.social.instagram"
                target="_blank"
                class="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
              >
                <Instagram :size="18" />
              </a>
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
  'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg': isScrolled.value,
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
  setTimeout(() => smoothScroll(href), 300); // Delay to allow menu to close
};

const smoothScroll = (href: string) => {
  const element = document.querySelector(href) as HTMLElement;
  if (element) {
    const offset = 80; // Account for fixed navbar height
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
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
