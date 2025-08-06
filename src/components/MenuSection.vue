<template>
  <section id="menu" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
          Nuestro <span class="gradient-text">Menú</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre sabores auténticos preparados con ingredientes frescos y recetas tradicionales
        </p>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          @click="selectedCategory = null"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all duration-300',
            selectedCategory === null
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
          ]"
        >
          Todos
        </button>
        <button
          v-for="category in menu"
          :key="category.category"
          @click="selectedCategory = category.category"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2',
            selectedCategory === category.category
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
          ]"
        >
          <span>{{ category.icon }}</span>
          {{ category.category }}
        </button>
      </div>

      <!-- Menu Items -->
      <div class="space-y-16">
        <div
          v-for="category in filteredMenu"
          :key="category.category"
          class="fade-in"
        >
          <!-- Category Header -->
          <div class="text-center mb-8">
            <h3 class="text-3xl font-playfair font-semibold text-gray-800 mb-2">
              <span class="text-4xl mr-3">{{ category.icon }}</span>
              {{ category.category }}
            </h3>
            <div class="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <!-- Featured Items First -->
          <div v-if="featuredItems(category).length > 0" class="mb-12">
            <h4 class="text-xl font-semibold text-gray-700 mb-6 text-center">⭐ Especialidades</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
</script>
