import { ref, computed, watch, onMounted } from 'vue';
import type { UIConfig } from '../types/ui';
import { appearancePresets } from '../types/ui';

// Estado reactivo global
const uiConfig = ref<UIConfig>({
  theme: {
    mode: 'system',
    primaryColor: '#3b82f6',
    accentColor: '#10b981',
    borderRadius: 'lg',
    respectSystem: true
  },
  features: {
    navigation: { enabled: true, visible: true },
    hero: { enabled: true, visible: true },
    menu: { enabled: true, visible: true },
    cart: { enabled: true, visible: true },
    whatsapp: { enabled: true, visible: true },
    contact: { enabled: true, visible: true },
    qr: { enabled: true, visible: true },
    footer: { enabled: true, visible: true },
    socialMedia: { enabled: true, visible: true },
    menuCategories: { enabled: true, visible: true },
    menuStats: { enabled: true, visible: true },
    menuFilters: { enabled: true, visible: true },
    contactForm: { enabled: true, visible: true },
    backToTop: { enabled: true, visible: true },
    floatingCart: { enabled: true, visible: true }
  },
  layout: {
    maxWidth: '1280px',
    padding: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem'
    },
    spacing: {
      sections: '5rem',
      components: '2rem'
    },
    borderRadius: 'lg',
    shadows: 'lg'
  },
  animations: {
    enabled: true,
    speed: 'normal',
    type: 'normal',
    respectReducedMotion: true
  },
  accessibility: {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    focusIndicators: true,
    screenReaderSupport: true,
    keyboardNavigation: true
  },
  colors: {
    primary: '#E88506',
    secondary: '#DC2626',
    accent: '#16A34A'
  },
  typography: {
    primaryFont: 'Inter',
    secondaryFont: 'Playfair Display',
    headingScale: 1.25,
    baseSize: '16px',
    lineHeight: 1.6,
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  responsive: {
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  }
});

export function useUI() {
  // Detección de tema del sistema
  const systemTheme = ref<'light' | 'dark'>('light');
  
  // Tema activo calculado
  const activeTheme = computed(() => {
    if (uiConfig.value.theme.mode === 'system') {
      return systemTheme.value;
    }
    return uiConfig.value.theme.mode === 'auto' ? systemTheme.value : uiConfig.value.theme.mode;
  });

  // Verificar si una característica está habilitada y visible
  const isFeatureEnabled = (feature: keyof UIConfig['features']) => {
    const featureConfig = uiConfig.value.features[feature];
    return featureConfig?.enabled && featureConfig?.visible;
  };

  // Obtener clases CSS dinámicas basadas en configuración
  const getLayoutClasses = computed(() => {
    const { layout } = uiConfig.value;
    return {
      container: `max-w-[${layout.maxWidth}] mx-auto`,
      padding: `px-${layout.padding?.mobile} md:px-${layout.padding?.tablet} lg:px-${layout.padding?.desktop}`,
      borderRadius: `rounded-${layout.borderRadius}`,
      shadow: `shadow-${layout.shadows}`
    };
  });

  // Obtener clases de animación
  const getAnimationClasses = computed(() => {
    const { animations } = uiConfig.value;
    if (!animations.enabled) return '';
    
    const speedClass = {
      slow: 'duration-700',
      normal: 'duration-300',
      fast: 'duration-150'
    }[animations.speed || 'normal'];

    return `transition-all ${speedClass}`;
  });

  // Aplicar variables CSS personalizadas
  const applyCSSVariables = () => {
    const root = document.documentElement;
    const { colors, typography, layout } = uiConfig.value;

    // Aplicar colores
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    
    if (colors.success) root.style.setProperty('--color-success', colors.success);
    if (colors.warning) root.style.setProperty('--color-warning', colors.warning);
    if (colors.error) root.style.setProperty('--color-error', colors.error);

    // Aplicar tipografía
    root.style.setProperty('--font-primary', typography.primaryFont);
    root.style.setProperty('--font-secondary', typography.secondaryFont);
    root.style.setProperty('--font-size-base', typography.baseSize || '16px');
    root.style.setProperty('--line-height-base', typography.lineHeight?.toString() || '1.6');

    // Aplicar layout
    if (layout.maxWidth) {
      root.style.setProperty('--max-width', layout.maxWidth);
    }
  };

  // Detectar preferencias del sistema
  const detectSystemPreferences = () => {
    // Detectar tema del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    systemTheme.value = mediaQuery.matches ? 'dark' : 'light';
    
    mediaQuery.addEventListener('change', (e) => {
      systemTheme.value = e.matches ? 'dark' : 'light';
    });

    // Detectar preferencia de movimiento reducido
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches && uiConfig.value.animations.respectReducedMotion) {
      uiConfig.value.animations.enabled = false;
      uiConfig.value.accessibility.reducedMotion = true;
    }

    // Detectar preferencia de contraste alto
    const contrastQuery = window.matchMedia('(prefers-contrast: high)');
    if (contrastQuery.matches) {
      uiConfig.value.accessibility.highContrast = true;
    }
  };

  // Aplicar preset de apariencia
  const applyPreset = (presetName: string) => {
    const preset = appearancePresets.find(p => p.name === presetName);
    if (preset) {
      // Mergear configuración del preset con la actual
      uiConfig.value = {
        ...uiConfig.value,
        ...preset.config,
        // Mergear objetos anidados correctamente
        colors: { ...uiConfig.value.colors, ...preset.config.colors },
        layout: { ...uiConfig.value.layout, ...preset.config.layout },
        animations: { ...uiConfig.value.animations, ...preset.config.animations },
        accessibility: { ...uiConfig.value.accessibility, ...preset.config.accessibility }
      };
      applyCSSVariables();
    }
  };

  // Actualizar configuración específica
  const updateConfig = (updates: Partial<UIConfig>) => {
    uiConfig.value = { ...uiConfig.value, ...updates };
    applyCSSVariables();
  };

  // Alternar característica
  const toggleFeature = (feature: keyof UIConfig['features'], enabled?: boolean) => {
    if (uiConfig.value.features[feature]) {
      uiConfig.value.features[feature]!.enabled = enabled ?? !uiConfig.value.features[feature]!.enabled;
    }
  };

  // Cambiar tema
  const setTheme = (mode: 'light' | 'dark' | 'system' | 'auto') => {
    uiConfig.value.theme.mode = mode;
  };

  // Obtener clases específicas para componente
  const getComponentClasses = (componentType: string) => {
    const base = getAnimationClasses.value;
    const layout = getLayoutClasses.value;

    switch (componentType) {
      case 'card':
        return `${base} ${layout.borderRadius} ${layout.shadow} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`;
      case 'button':
        return `${base} ${layout.borderRadius} font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`;
      case 'input':
        return `${base} ${layout.borderRadius} border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent`;
      case 'section':
        return `${layout.container} ${layout.padding} py-8 sm:py-12 md:py-20`;
      default:
        return base;
    }
  };

  // Guardar configuración en localStorage
  const saveConfig = () => {
    try {
      localStorage.setItem('ui-config', JSON.stringify(uiConfig.value));
    } catch (error) {
      console.warn('No se pudo guardar la configuración UI:', error);
    }
  };

  // Cargar configuración desde localStorage
  const loadConfig = () => {
    try {
      const saved = localStorage.getItem('ui-config');
      if (saved) {
        const parsed = JSON.parse(saved);
        uiConfig.value = { ...uiConfig.value, ...parsed };
        applyCSSVariables();
      }
    } catch (error) {
      console.warn('No se pudo cargar la configuración UI:', error);
    }
  };

  // Inicializar
  onMounted(() => {
    detectSystemPreferences();
    loadConfig();
    applyCSSVariables();
  });

  // Observar cambios y aplicar CSS
  watch(
    () => uiConfig.value,
    () => {
      applyCSSVariables();
      saveConfig();
    },
    { deep: true }
  );

  // Observar cambios de tema
  watch(
    activeTheme,
    (newTheme) => {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    },
    { immediate: true }
  );

  return {
    // Estado
    config: uiConfig,
    activeTheme,
    systemTheme,
    
    // Computed
    getLayoutClasses,
    getAnimationClasses,
    
    // Métodos
    isFeatureEnabled,
    getComponentClasses,
    applyCSSVariables,
    applyPreset,
    updateConfig,
    toggleFeature,
    setTheme,
    saveConfig,
    loadConfig,
    
    // Presets disponibles
    availablePresets: appearancePresets
  };
}

// Exportar configuración global para usar en otros lugares
export { uiConfig };
