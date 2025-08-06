<template>
  <section id="menu" class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Enhanced Section Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 mb-6">
          <div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary-600"></div>
          <UtensilsCrossed class="text-primary-600" :size="32" />
          <div class="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary-600"></div>
        </div>
        
        <h2 class="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
          Nuestro <span class="gradient-text">Menú</span>
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Descubre una selección cuidadosamente curada de sabores auténticos, preparados con ingredientes frescos y mucho amor
        </p>
        
        <!-- Menu Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-2xl mx-auto">
          <div class="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="text-2xl font-bold text-primary-600">{{ totalItems }}</div>
            <div class="text-sm text-gray-600">Platos</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="text-2xl font-bold text-secondary-600">{{ menu.length }}</div>
            <div class="text-sm text-gray-600">Categorías</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="text-2xl font-bold text-accent-600">{{ vegetarianItems }}</div>
            <div class="text-sm text-gray-600">Vegetarianos</div>
          </div>
          <div class="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div class="text-2xl font-bold text-green-600">Fresh</div>
            <div class="text-sm text-gray-600">Daily</div>
          </div>
        </div>
      </div>

      <!-- Enhanced Category Filter -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button
          @click="selectedCategory = null"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105',
            selectedCategory === null
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm hover:shadow-md'
          ]"
        >
          <span class="flex items-center gap-2">
            <span>Todos</span>
            <span class="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">{{ totalItems }}</span>
          </span>
        </button>
        <button
          v-for="category in menu"
          :key="category.category"
          @click="selectedCategory = category.category"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2',
            selectedCategory === category.category
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-sm hover:shadow-md'
          ]"
        >
          <span class="text-lg">{{ category.icon }}</span>
          <span>{{ category.category }}</span>
          <span class="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{{ category.items.length }}</span>
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
