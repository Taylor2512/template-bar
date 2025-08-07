<template>
  <SectionContainer section-id="menu" background="gray-to-white">
    <!-- Section Header -->
    <SectionHeader
      title="Nuestro"
      highlight-text="Menú"
      description="Descubre una selección cuidadosamente curada de sabores auténticos, preparados con ingredientes frescos y mucho amor"
      :icon-component="UtensilsCrossed"
    />

    <!-- Menu Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6 mt-6 sm:mt-8 md:mt-12 max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16">
      <StatsCard
        :value="totalItems"
        label="Platos"
        variant="primary"
      />
      <StatsCard
        :value="menu.length"
        label="Categorías"
        variant="secondary"
      />
      <StatsCard
        :value="vegetarianItems"
        label="Vegetarianos"
        variant="accent"
      />
      <StatsCard
        value="Fresh"
        label="Daily"
        variant="green"
      />
    </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-2">
        <button @click="selectedCategory = null" :class="[
          'px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105',
          selectedCategory === null
            ? 'bg-primary-600 dark:bg-primary-500 text-white dark:text-white shadow-lg dark:shadow-primary-500/30'
            : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white shadow-sm hover:shadow-md dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700'
        ]">
          <span class="flex items-center gap-1 md:gap-2">
            <span>Todos</span>
            <span :class="[
              'text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full',
              selectedCategory === null
                ? 'bg-white/20 dark:bg-white/20 text-white dark:text-white'
                : 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
            ]">{{ totalItems }}</span>
          </span>
        </button>
        <button v-for="category in menu" :key="category.category" @click="selectedCategory = category.category" :class="[
          'px-4 md:px-6 py-2 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 flex items-center gap-1 md:gap-2',
          selectedCategory === category.category
            ? 'bg-primary-600 dark:bg-primary-500 text-white dark:text-white shadow-lg dark:shadow-primary-500/30'
            : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white shadow-sm hover:shadow-md dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700'
        ]">
          <span class="text-base md:text-lg">{{ category.icon }}</span>
          <span class="sm:inline">{{ category.category }}</span>
          <span class="sm:hidden">{{ category.category.substring(0, 8) }}{{ category.category.length > 8 ? '...' : '' }}</span>
          <span :class="[
            'text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full',
            selectedCategory === category.category
              ? 'bg-white/20 dark:bg-white/20 text-white dark:text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          ]">{{ category.items.length }}</span>
        </button>
      </div>

      <!-- Menu Items -->
      <div class="space-y-12 md:space-y-16">
        <div v-for="category in filteredMenu" :key="category.category" class="fade-in">
          <!-- Category Header -->
          <div class="text-center mb-6 md:mb-8">
            <h3 class="text-2xl md:text-3xl font-playfair font-semibold text-gray-800 dark:text-gray-100 mb-2">
              <span class="text-3xl md:text-4xl mr-2 md:mr-3">{{ category.icon }}</span>
              {{ category.category }}
            </h3>
            <div
              class="w-16 md:w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 mx-auto rounded-full">
            </div>
          </div>

          <!-- Featured Items First -->
          <div v-if="featuredItems(category).length > 0" class="mb-8 md:mb-12">
            <h4 class="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 md:mb-6 text-center">⭐ Especialidades</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <MenuCard v-for="item in featuredItems(category)" :key="item.name" :item="item"
                :category-name="category.category" :config="config" class="slide-up" />
            </div>
          </div>

          <!-- Regular Items -->
          <div v-if="regularItems(category).length > 0">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              <MenuCard v-for="item in regularItems(category)" :key="item.name" :item="item"
                :category-name="category.category" :config="config" class="slide-up" />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredMenu.length === 0" class="text-center py-16">
        <div class="text-6xl mb-4">🍽️</div>
        <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No hay elementos en esta categoría</h3>
        <p class="text-gray-600 dark:text-gray-400">Selecciona otra categoría para ver más opciones</p>
      </div>

    <!-- Call to Action -->
    <Card custom-classes="text-center mt-16">
      <h3 class="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">¿Listo para ordenar?</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Haz tu pedido directamente por
        WhatsApp y lo preparamos para ti</p>
      <WhatsAppButton :phone="config.phoneNumber" :base-message="config.whatsappMessage"
        button-text="Hacer Pedido Completo" class="text-sm sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full" />
    </Card>
  </SectionContainer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { UtensilsCrossed } from 'lucide-vue-next';
import type { MenuCategory, RestaurantConfig } from '../types';
import MenuCard from './MenuCard.vue';
import WhatsAppButton from './WhatsAppButton.vue';
import { SectionContainer, SectionHeader, StatsCard, Card } from './common';

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

const totalItems = computed(() => {
  return props.menu.reduce((total, category) => total + category.items.length, 0);
});

const vegetarianItems = computed(() => {
  return props.menu.reduce((total, category) => {
    return total + category.items.filter(item => item.isVegetarian || item.isVegan).length;
  }, 0);
});
</script>
