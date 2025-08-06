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
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Restaurant Info -->
            <div>
              <h3 class="text-xl font-semibold mb-4">{{ config.restaurantName }}</h3>
              <p class="text-gray-400 mb-4">{{ config.hero?.subtitle || 'Experiencia culinaria única' }}</p>
              <div class="flex space-x-4">
                <a
                  v-if="config.social?.facebook"
                  :href="config.social.facebook"
                  target="_blank"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook :size="24" />
                </a>
                <a
                  v-if="config.social?.instagram"
                  :href="config.social.instagram"
                  target="_blank"
                  class="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram :size="24" />
                </a>
              </div>
            </div>

            <!-- Contact Info -->
            <div>
              <h3 class="text-xl font-semibold mb-4">Contacto</h3>
              <div class="space-y-2 text-gray-400">
                <div class="flex items-center gap-2">
                  <MapPin :size="16" />
                  <span>{{ config.address }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Phone :size="16" />
                  <a :href="`tel:${config.phoneNumber}`" class="hover:text-white transition-colors">
                    {{ config.phoneNumber }}
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <Mail :size="16" />
                  <a :href="`mailto:${config.email}`" class="hover:text-white transition-colors">
                    {{ config.email }}
                  </a>
                </div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div>
              <h3 class="text-xl font-semibold mb-4">Acciones Rápidas</h3>
              <div class="space-y-3">
                <WhatsAppButton
                  :phone="config.phoneNumber"
                  :base-message="config.whatsappMessage"
                  button-text="Hacer Pedido"
                  class="w-full justify-center"
                />
                <a
                  href="#menu"
                  class="block text-center bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Ver Menú Completo
                </a>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {{ new Date().getFullYear() }} {{ config.restaurantName }}. Todos los derechos reservados.</p>
            <p class="mt-2 text-sm">Template diseñado con ❤️ para restaurantes</p>
          </div>
        </div>
      </footer>

      <!-- Cart Sidebar -->
      <CartSidebar :config="config" />

      <!-- Back to Top Button -->
      <button
        @click="scrollToTop"
        class="fixed bottom-24 left-6 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 z-40"
        :class="{ 'opacity-0 pointer-events-none': !showBackToTop }"
      >
        <ChevronUp :size="24" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Facebook, Instagram, MapPin, Phone, Mail, ChevronUp } from 'lucide-vue-next';
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
  restaurantName: '',
  primaryColor: '#B91C1C',
  secondaryColor: '#F59E0B',
  phoneNumber: '',
  address: '',
  whatsappMessage: '',
  email: ''
});

const isLoading = ref(true);
const showBackToTop = ref(false);

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
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(async () => {
  await loadData();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
