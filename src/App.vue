<template>
  <div 
    class="min-h-screen"
    :style="`--color-primary: ${config.primaryColor}; --color-secondary: ${config.secondaryColor}; --color-accent: ${config.primaryColor}bb`"
  >
    <!-- Loading State -->
    <div v-if="isLoading" class="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-gray-600">Cargando menú...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Navigation -->
      <Navigation :config="config" />

      <!-- Hero Section -->
            <!-- Hero Section -->
      <section id="inicio">
        <HelloWorld :config="config" />
      </section>

      <!-- Menu Section -->
      <MenuSection :menu="menu" :config="config" />

      <!-- Contact & QR Section -->
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <!-- Contact Form -->
            <div id="contacto">
              <ContactForm :config="config" />
            </div>

            <!-- QR Generator -->
            <div id="qr">
              <QRGenerator />
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-5">
          <div class="absolute inset-0 bg-dots-pattern"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Restaurant Info -->
            <div class="lg:col-span-2">
              <div class="flex items-center gap-3 mb-6">
                <img 
                  v-if="config.logo" 
                  :src="config.logo" 
                  :alt="config.restaurantName"
                  class="h-12 w-12 rounded-full"
                  @error="handleLogoError"
                />
                <div>
                  <h3 class="text-2xl font-playfair font-bold">{{ config.restaurantName }}</h3>
                  <p class="text-gray-400">{{ config.hero?.subtitle || 'Sabores Auténticos' }}</p>
                </div>
              </div>
              
              <p class="text-gray-300 mb-6 leading-relaxed max-w-md">
                {{ config.hero?.description || 'Descubre una experiencia gastronómica única con sabores auténticos y ingredientes frescos.' }}
              </p>
              
              <!-- Social Links -->
              <div class="flex gap-4">
                <a
                  v-if="config.social?.facebook"
                  :href="config.social.facebook"
                  target="_blank"
                  class="p-3 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors transform hover:scale-110"
                >
                  <Facebook :size="20" />
                </a>
                <a
                  v-if="config.social?.instagram"
                  :href="config.social.instagram"
                  target="_blank"
                  class="p-3 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all transform hover:scale-110"
                >
                  <Instagram :size="20" />
                </a>
                <a
                  v-if="config.social?.twitter"
                  :href="config.social.twitter"
                  target="_blank"
                  class="p-3 bg-gray-800 hover:bg-blue-400 rounded-lg transition-colors transform hover:scale-110"
                >
                  <Twitter :size="20" />
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h4 class="text-lg font-semibold mb-6 text-white">Enlaces Rápidos</h4>
              <nav class="space-y-3">
                <a href="#inicio" class="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200">Inicio</a>
                <a href="#menu" class="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200">Menú</a>
                <a href="#contacto" class="block text-gray-300 hover:text-white transition-colors hover:translate-x-1 transform duration-200">Contacto</a>
                <WhatsAppButton
                  :phone="config.phoneNumber"
                  :base-message="config.whatsappMessage"
                  button-text="Hacer Pedido"
                  class="text-left p-0 text-gray-300 hover:text-green-400 transition-colors hover:translate-x-1 transform duration-200"
                />
              </nav>
            </div>

            <!-- Contact Info -->
            <div>
              <h4 class="text-lg font-semibold mb-6 text-white">Contacto</h4>
              <div class="space-y-4">
                <div class="flex items-start gap-3">
                  <MapPin class="text-primary-400 flex-shrink-0 mt-1" :size="18" />
                  <span class="text-gray-300 text-sm">{{ config.address }}</span>
                </div>
                <div class="flex items-center gap-3">
                  <Phone class="text-primary-400 flex-shrink-0" :size="18" />
                  <a 
                    :href="`tel:${config.phoneNumber}`"
                    class="text-gray-300 hover:text-white transition-colors"
                  >
                    {{ config.phoneNumber }}
                  </a>
                </div>
                <div class="flex items-center gap-3">
                  <Clock class="text-primary-400 flex-shrink-0" :size="18" />
                  <span class="text-gray-300 text-sm">Lun-Dom: 9:00-22:00</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="border-t border-gray-800 mt-12 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
              <p class="text-gray-400 text-sm">
                © {{ currentYear }} {{ config.restaurantName }}. Todos los derechos reservados.
              </p>
              <div class="flex items-center gap-6 text-sm text-gray-400">
                <span>Hecho con ❤️ para {{ config.restaurantName }}</span>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>En línea</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <!-- Cart Sidebar -->
      <CartSidebar :config="config" />

      <!-- Scroll to Top Button -->
      <Transition name="fade">
        <button
          v-if="showBackToTop"
          @click="scrollToTop"
          class="fixed bottom-24 left-6 bg-white hover:bg-gray-50 text-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
        >
          <ChevronUp :size="24" />
        </button>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.bg-dots-pattern {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
  background-size: 20px 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Facebook, Instagram, Twitter, MapPin, Phone, Clock, ChevronUp } from 'lucide-vue-next';
import type { MenuCategory, RestaurantConfig } from './types';

// Components
import Navigation from './components/Navigation.vue';
import HelloWorld from './components/HelloWorld.vue';
import MenuSection from './components/MenuSection.vue';
import ContactForm from './components/ContactForm.vue';
import QRGenerator from './components/QRGenerator.vue';
import CartSidebar from './components/CartSidebar.vue';
import WhatsAppButton from './components/WhatsAppButton.vue';

const menu = ref<MenuCategory[]>([]);
const config = ref<RestaurantConfig>({
  restaurantName: 'Restaurant Name',
  accentColor: '#10B981',
  textColor: '#1F2937',
  backgroundColor: '#FFFFFF',
  website: '',
  logo: '',
  primaryColor: '#B91C1C',
  secondaryColor: '#F59E0B',
  phoneNumber: '',
  address: '',
  email: '',
  whatsappMessage: '',
  theme: {
    fontPrimary: 'Inter',
    fontSecondary: 'Playfair Display',
    borderRadius: '0.5rem',
    shadowIntensity: 'medium',
    animationSpeed: 'normal'
  },
  hero: {
    title: '',
    subtitle: '',
    description: '',
    backgroundImage: '',
    overlayOpacity: 0.6,
    ctaText: 'Ver Menú'
  },
  social: {
    facebook: '',
    instagram: '',
    twitter: ''
  },
  contact: {
    schedule: {
      monday: '9:00 - 22:00',
      tuesday: '9:00 - 22:00',
      wednesday: '9:00 - 22:00',
      thursday: '9:00 - 22:00',
      friday: '9:00 - 23:00',
      saturday: '10:00 - 23:00',
      sunday: '10:00 - 21:00'
    },
    location: {
      lat: 0,
      lng: 0,
      googleMapsUrl: ''
    }
  },
  features: [
    {
      icon: '🚚',
      number: '30min',
      text: 'Delivery',
      description: 'Entrega rápida'
    }
  ],
  seo: {
    title: '',
    description: '',
    keywords: ''
  }
});

const isLoading = ref(true);
const showBackToTop = ref(false);

const currentYear = computed(() => new Date().getFullYear());

const loadData = async () => {
  try {
    // Load configuration
    const configResponse = await fetch('/config.json');
    const configData = await configResponse.json();
    config.value = { ...config.value, ...configData };

    // Load menu
    const menuResponse = await fetch('/menu.json');
    const menuData = await menuResponse.json();
    menu.value = menuData;

  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleLogoError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
};

onMounted(async () => {
  await loadData();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
