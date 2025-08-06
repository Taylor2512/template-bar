<template>
  <section id="menu" class="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Enhanced Section Header -->
      <div class="text-center mb-8 sm:mb-12 md:mb-16">
        <div class="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
          <div class="w-6 sm:w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-primary-600 dark:to-primary-400"></div>
          <UtensilsCrossed class="text-primary-600 dark:text-primary-400" :size="20" />
          <div class="w-6 sm:w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-primary-600 dark:to-primary-400"></div>
        </div>
        
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
          Nuestro <span class="gradient-text">Menú</span>
        </h2>
        <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
          Descubre una selección cuidadosamente curada de sabores auténticos, preparados con ingredientes frescos y mucho amor
        </p>
        
        <!-- Menu Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6 mt-6 sm:mt-8 md:mt-12 max-w-2xl mx-auto">
          <div class="text-center p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow border border-gray-100 dark:border-gray-700">
            <div class="text-lg sm:text-xl md:text-2xl font-bold text-primary-600 dark:text-primary-400">{{ totalItems }}</div>
            <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Platos</div>
          </div>
          <div class="text-center p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow border border-gray-100 dark:border-gray-700">
            <div class="text-lg sm:text-xl md:text-2xl font-bold text-secondary-600 dark:text-secondary-400">{{ menu.length }}</div>
            <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Categorías</div>
          </div>
          <div class="text-center p-2 sm:p-3 md:p-4 bg-white dark:bg-gray-800 rounded-lg md:rounded-xl shadow-sm dark:shadow-gray-900/20 hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow border border-gray-100 dark:border-gray-700">
            <div class="text-lg sm:text-xl md:text-2xl font-bold text-accent-600 dark:text-accent-400">{{ vegetarianItems }}</div>
            <div class="text-xs md:text-sm text-gray-600">Vegetarianos</div>
          </div>
          <div class="text-center p-3 md:p-4 bg-white rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="text-xl md:text-2xl font-bold text-green-600">Fresh</div>
            <div class="text-xs md:text-sm text-gray-600">Daily</div>
          </div>
        </div>
      </div>

      <!-- Enhanced Category Filter -->
      <div class="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
        <button
          @click="selectedCategory = null"
          :class="[
            'px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105',
            selectedCategory === null
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm hover:shadow-md'
          ]"
        >
          <span class="flex items-center gap-1 md:gap-2">
            <span>Todos</span>
            <span class="text-xs bg-primary-100 text-primary-700 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">{{ totalItems }}</span>
          </span>
        </button>
        <button
          v-for="category in menu"
          :key="category.category"
          @click="selectedCategory = category.category"
          :class="[
            'px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 flex items-center gap-1 md:gap-2',
            selectedCategory === category.category
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm hover:shadow-md'
          ]"
        >
          <span class="text-base md:text-lg">{{ category.icon }}</span>
          <span class="hidden sm:inline">{{ category.category }}</span>
          <span class="sm:hidden">{{ category.category.substring(0, 8) }}{{ category.category.length > 8 ? '...' : '' }}</span>
          <span class="text-xs bg-gray-100 text-gray-600 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">{{ category.items.length }}</span>
        </button>
      </div>

      <!-- Menu Items -->
      <div class="space-y-12 md:space-y-16">
        <div
          v-for="category in filteredMenu"
          :key="category.category"
          class="fade-in"
        >
          <!-- Category Header -->
          <div class="text-center mb-6 md:mb-8">
            <h3 class="text-2xl md:text-3xl font-playfair font-semibold text-gray-800 mb-2">
              <span class="text-3xl md:text-4xl mr-2 md:mr-3">{{ category.icon }}</span>
              {{ category.category }}
            </h3>
            <div class="w-16 md:w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <!-- Featured Items First -->
          <div v-if="featuredItems(category).length > 0" class="mb-8 md:mb-12">
            <h4 class="text-lg md:text-xl font-semibold text-gray-700 mb-4 md:mb-6 text-center">⭐ Especialidades</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <MenuCard
                v-for="item in featuredItems(category)"
                :key="item.name"
                :item="item"
                :category-name="category.category"
                :config="config"
                class="slide-up"
              />
            </div>
          </div>

          <!-- Regular Items -->
          <div v-if="regularItems(category).length > 0">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <MenuCard
                v-for="item in regularItems(category)"
                :key="item.name"
                :item="item"
                :category-name="category.category"
                :config="config"
                class="slide-up"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredMenu.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🍽️</div>
        <h3 class="text-2xl font-semibold text-gray-700 mb-2">No hay elementos en esta categoría</h3>
        <p class="text-gray-600">Selecciona otra categoría para ver más opciones</p>
      </div>

      <!-- Call to Action -->
      <div class="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg">
        <h3 class="text-2xl font-semibold text-gray-800 mb-4">¿Listo para ordenar?</h3>
        <p class="text-gray-600 mb-6">Haz tu pedido directamente por WhatsApp y lo preparamos para ti</p>
        <WhatsAppButton
          :phone="config.phoneNumber"
          :base-message="config.whatsappMessage"
          button-text="Hacer Pedido Completo"
          class="text-lg px-8 py-4 rounded-full"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { UtensilsCrossed } from 'lucide-vue-next';
import type { MenuCategory, RestaurantConfig } from '../types';
import MenuCard from './MenuCard.vue';
import WhatsAppButton from './WhatsAppButton.vue';

interface Props {
  menu: MenuCategory[];
  config: RestaurantConfig;
}

const props = defineProps<Props>();

const selectedCategory = ref<string | null>(null);

const filteredMenu = computed(() => {
  if (selectedCategory.value === null) {
    return props.menu;
  }
  return props.menu.filter(category => category.category === selectedCategory.value);
});

const featuredItems = (category: MenuCategory) => {
  return category.items.filter(item => item.featured);
};

const regularItems = (category: MenuCategory) => {
  return category.items.filter(item => !item.featured);
};

// Enhanced computed properties
const totalItems = computed(() => {
  return props.menu.reduce((total, category) => total + category.items.length, 0);
});

const vegetarianItems = computed(() => {
  return props.menu.reduce((total, category) => {
    return total + category.items.filter(item => item.isVegetarian || item.isVegan).length;
  }, 0);
});
</script>
