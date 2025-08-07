import type { UIConfig } from '../types/ui';

// Default UI configuration
export const defaultUIConfig: UIConfig = {
  theme: {
    mode: 'system',
    primaryColor: '#3b82f6',
    accentColor: '#10b981',
    borderRadius: 'md',
    respectSystem: true
  },
  features: {
    whatsapp: { enabled: true, visible: true },
    cart: { enabled: true, visible: true },
    menu: { enabled: true, visible: true },
    navigation: { enabled: true, visible: true },
    hero: { enabled: true, visible: true },
    contact: { enabled: true, visible: true },
    footer: { enabled: true, visible: true },
    socialMedia: { enabled: true, visible: true },
    menuCategories: { enabled: true, visible: true },
    menuStats: { enabled: true, visible: true },
    menuFilters: { enabled: true, visible: true },
    contactForm: { enabled: true, visible: true },
    backToTop: { enabled: true, visible: true },
    floatingCart: { enabled: true, visible: true },
    qr: { enabled: true, visible: true }
  },
  layout: {
    spacing: {
      sections: '2rem',
      components: '1rem'
    },
    borderRadius: 'md',
    shadows: 'md'
  },
  animations: {
    enabled: true,
    speed: 'normal',
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
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#10b981',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    neutral: '#6b7280'
  },
  typography: {
    primaryFont: 'Inter, system-ui, sans-serif',
    secondaryFont: 'Inter, system-ui, sans-serif',
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
    },
    containerSizes: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  }
};

// Configuration presets for different types of businesses
export const uiPresets = {
  restaurant: {
    ...defaultUIConfig,
    theme: {
      ...defaultUIConfig.theme,
      primaryColor: '#f97316',
      accentColor: '#ef4444'
    },
    colors: {
      primary: '#f97316',
      secondary: '#64748b',
      accent: '#ef4444',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      neutral: '#6b7280'
    },
    layout: {
      ...defaultUIConfig.layout,
      borderRadius: 'lg' as const,
      shadows: 'lg' as const
    }
  },
  
  cafe: {
    ...defaultUIConfig,
    theme: {
      ...defaultUIConfig.theme,
      primaryColor: '#f59e0b',
      accentColor: '#d97706'
    },
    colors: {
      primary: '#f59e0b',
      secondary: '#78716c',
      accent: '#d97706',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      neutral: '#6b7280'
    },
    layout: {
      ...defaultUIConfig.layout,
      borderRadius: 'xl' as const,
      shadows: 'xl' as const
    }
  },
  
  bar: {
    ...defaultUIConfig,
    theme: {
      mode: 'dark' as const,
      primaryColor: '#8b5cf6',
      accentColor: '#ec4899',
      borderRadius: 'md' as const,
      respectSystem: false
    },
    colors: {
      primary: '#8b5cf6',
      secondary: '#64748b',
      accent: '#ec4899',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      neutral: '#6b7280'
    },
    animations: {
      enabled: true,
      speed: 'fast' as const,
      respectReducedMotion: false
    }
  },
  
  fastfood: {
    ...defaultUIConfig,
    theme: {
      ...defaultUIConfig.theme,
      primaryColor: '#ef4444',
      accentColor: '#fbbf24'
    },
    colors: {
      primary: '#ef4444',
      secondary: '#64748b',
      accent: '#fbbf24',
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
      neutral: '#6b7280'
    },
    layout: {
      ...defaultUIConfig.layout,
      spacing: {
        sections: '1.5rem',
        components: '0.75rem'
      }
    },
    features: {
      ...defaultUIConfig.features,
      floatingCart: { enabled: true, visible: true }
    }
  }
};

// Create a Vue plugin for UI configuration
export const UIConfigPlugin = {
  install(app: any, config: Partial<UIConfig> = {}) {
    const finalConfig = mergeUIConfig(defaultUIConfig, config);
    app.provide('uiConfig', finalConfig);
  }
};

// Helper function to get preset configuration
export function getUIPreset(presetName: keyof typeof uiPresets): UIConfig {
  return uiPresets[presetName] || defaultUIConfig;
}

// Helper function to merge configurations
export function mergeUIConfig(base: UIConfig, override: Partial<UIConfig>): UIConfig {
  return {
    theme: { ...base.theme, ...override.theme },
    layout: { ...base.layout, ...override.layout },
    animations: { ...base.animations, ...override.animations },
    accessibility: { ...base.accessibility, ...override.accessibility },
    features: { ...base.features, ...override.features },
    colors: { ...base.colors, ...override.colors },
    typography: { ...base.typography, ...override.typography },
    responsive: { ...base.responsive, ...override.responsive },
    customCSS: override.customCSS || base.customCSS
  };
}

// Business type detection helper
export function detectBusinessType(keywords: string[]): keyof typeof uiPresets {
  const patterns = {
    restaurant: ['restaurant', 'restaurante', 'comida', 'food', 'dining', 'cuisine'],
    cafe: ['cafe', 'café', 'coffee', 'coffeehouse', 'bistro'],
    bar: ['bar', 'pub', 'cocktail', 'drinks', 'nightlife', 'lounge'],
    fastfood: ['fast food', 'burger', 'pizza', 'quick', 'takeaway']
  };
  
  for (const [type, terms] of Object.entries(patterns)) {
    if (terms.some(term => keywords.some(keyword => 
      keyword.toLowerCase().includes(term.toLowerCase())
    ))) {
      return type as keyof typeof uiPresets;
    }
  }
  
  return 'restaurant'; // Default fallback
}

// Theme utilities
export const themeUtils = {
  // Generate CSS custom properties from theme config
  generateCSSVariables(config: UIConfig): Record<string, string> {
    const vars: Record<string, string> = {};
    
    // Color variables
    Object.entries(config.colors).forEach(([key, value]) => {
      vars[`--color-${key}`] = value;
    });
    
    // Border radius
    const radiusMap: Record<string, string> = {
      none: '0',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px'
    };
    vars['--border-radius'] = radiusMap[config.layout.borderRadius || 'md'];
    
    // Animation duration
    const speedMap: Record<string, string> = {
      slow: '500ms',
      normal: '300ms',
      fast: '150ms'
    };
    vars['--animation-duration'] = speedMap[config.animations.speed || 'normal'];
    
    // Typography
    vars['--font-primary'] = config.typography.primaryFont;
    vars['--font-secondary'] = config.typography.secondaryFont;
    vars['--font-size-base'] = config.typography.baseSize || '16px';
    vars['--line-height-base'] = config.typography.lineHeight?.toString() || '1.6';
    
    return vars;
  },
  
  // Apply CSS variables to document
  applyCSSVariables(config: UIConfig): void {
    const variables = this.generateCSSVariables(config);
    const root = document.documentElement;
    
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  },
  
  // Get computed theme mode
  getComputedThemeMode(mode: 'light' | 'dark' | 'system' | 'auto'): 'light' | 'dark' {
    if (mode === 'system' || mode === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return mode;
  }
};

export default {
  defaultUIConfig,
  uiPresets,
  UIConfigPlugin,
  getUIPreset,
  mergeUIConfig,
  detectBusinessType,
  themeUtils
};
