<template>
  <div 
    v-if="visible"
    :class="[
      'fixed top-4 right-4 z-50',
      isOpen ? 'w-80' : 'w-12',
      'transition-all duration-300'
    ]"
  >
    <!-- Toggle Button -->
    <button
      @click="togglePanel"
      :class="[
        'absolute top-0 right-0 w-12 h-12 rounded-full',
        'bg-primary-600 hover:bg-primary-700 text-white',
        'flex items-center justify-center shadow-lg',
        'transition-all duration-300 transform hover:scale-105',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
      ]"
      :aria-label="isOpen ? 'Cerrar configuración' : 'Abrir configuración'"
    >
      <Settings :size="20" :class="{ 'rotate-180': isOpen }" />
    </button>

    <!-- Configuration Panel -->
    <div
      v-if="isOpen"
      :class="[
        'bg-white dark:bg-gray-900 rounded-2xl shadow-2xl',
        'border border-gray-200 dark:border-gray-700',
        'mt-16 p-6 max-h-96 overflow-y-auto custom-scrollbar'
      ]"
    >
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Personalizar
          </h3>
          <button
            @click="resetToDefaults"
            class="text-sm text-gray-500 hover:text-primary-600 transition-colors"
          >
            Restablecer
          </button>
        </div>

        <!-- Theme Mode -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tema
          </label>
          <select
            v-model="localConfig.theme.mode"
            @change="updateTheme"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
            <option value="system">Sistema</option>
            <option value="auto">Automático</option>
          </select>
        </div>

        <!-- Appearance Presets -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Estilo
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="preset in availablePresets"
              :key="preset.name"
              @click="applyPreset(preset.name)"
              :class="[
                'p-3 rounded-lg border text-left transition-all',
                'hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20',
                'focus:outline-none focus:ring-2 focus:ring-primary-500'
              ]"
            >
              <div class="font-medium text-sm">{{ preset.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ preset.description }}</div>
            </button>
          </div>
        </div>

        <!-- Color Customization -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Colores
          </label>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm">Primario</span>
              <input
                v-model="localConfig.colors.primary"
                @change="updateColors"
                type="color"
                class="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">Secundario</span>
              <input
                v-model="localConfig.colors.secondary"
                @change="updateColors"
                type="color"
                class="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">Acento</span>
              <input
                v-model="localConfig.colors.accent"
                @change="updateColors"
                type="color"
                class="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>

        <!-- Feature Toggles -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Características
          </label>
          <div class="space-y-2">
            <div
              v-for="(feature, key) in localConfig.features"
              :key="key"
              class="flex items-center justify-between"
            >
              <span class="text-sm">{{ getFeatureLabel(String(key)) }}</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="feature!.enabled"
                  @change="updateFeatures"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Animation Settings -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Animaciones
          </label>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm">Habilitadas</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="localConfig.animations.enabled"
                  @change="updateAnimations"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div v-if="localConfig.animations.enabled">
              <label class="block text-xs text-gray-500 mb-1">Velocidad</label>
              <select
                v-model="localConfig.animations.speed"
                @change="updateAnimations"
                class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
              >
                <option value="slow">Lenta</option>
                <option value="normal">Normal</option>
                <option value="fast">Rápida</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Accessibility -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Accesibilidad
          </label>
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm">Alto contraste</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="localConfig.accessibility.highContrast"
                  @change="updateAccessibility"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">Texto grande</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="localConfig.accessibility.largeText"
                  @change="updateAccessibility"
                  type="checkbox"
                  class="sr-only peer"
                />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { Settings } from 'lucide-vue-next';
import { useUI } from '../composables/useUI';
import type { UIConfig } from '../types/ui';

interface Props {
  visible?: boolean;
}

withDefaults(defineProps<Props>(), {
  visible: true
});

const {
  config,
  updateConfig,
  setTheme,
  applyPreset,
  availablePresets,
  applyCSSVariables
} = useUI();

const isOpen = ref(false);
const localConfig = reactive<UIConfig>({ ...config.value });

// Feature labels mapping
const featureLabels: Record<string, string> = {
  navigation: 'Navegación',
  hero: 'Sección Hero',
  menu: 'Menú',
  cart: 'Carrito',
  whatsapp: 'WhatsApp',
  contact: 'Contacto',
  qr: 'Código QR',
  footer: 'Pie de página',
  socialMedia: 'Redes sociales',
  menuCategories: 'Categorías del menú',
  menuStats: 'Estadísticas del menú',
  menuFilters: 'Filtros del menú',
  contactForm: 'Formulario de contacto',
  backToTop: 'Botón volver arriba',
  floatingCart: 'Carrito flotante'
};

const togglePanel = () => {
  isOpen.value = !isOpen.value;
};

const getFeatureLabel = (key: string) => {
  return featureLabels[key] || key;
};

const updateTheme = () => {
  setTheme(localConfig.theme.mode);
  updateConfig({ theme: localConfig.theme });
};

const updateColors = () => {
  updateConfig({ colors: localConfig.colors });
  applyCSSVariables();
};

const updateFeatures = () => {
  updateConfig({ features: localConfig.features });
};

const updateAnimations = () => {
  updateConfig({ animations: localConfig.animations });
};

const updateAccessibility = () => {
  updateConfig({ accessibility: localConfig.accessibility });
  applyCSSVariables();
};

const resetToDefaults = () => {
  applyPreset('classic');
  Object.assign(localConfig, config.value);
};

// Watch for external config changes
watch(
  () => config.value,
  (newConfig) => {
    Object.assign(localConfig, newConfig);
  },
  { deep: true }
);
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.gray.400') transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: theme('colors.gray.400');
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: theme('colors.gray.500');
}

/* Animation for settings icon */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhanced focus styles */
button:focus-visible,
select:focus-visible,
input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
