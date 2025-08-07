export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system' | 'auto';
  primaryColor: string;
  accentColor: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  respectSystem?: boolean;
}

export interface FeatureToggle {
  enabled: boolean;
  visible?: boolean;
  label?: string;
  description?: string;
}

export interface ComponentVisibility {
  navigation?: FeatureToggle;
  hero?: FeatureToggle;
  menu?: FeatureToggle;
  cart?: FeatureToggle;
  whatsapp?: FeatureToggle;
  contact?: FeatureToggle;
  qr?: FeatureToggle;
  footer?: FeatureToggle;
  socialMedia?: FeatureToggle;
  menuCategories?: FeatureToggle;
  menuStats?: FeatureToggle;
  menuFilters?: FeatureToggle;
  contactForm?: FeatureToggle;
  backToTop?: FeatureToggle;
  floatingCart?: FeatureToggle;
}

export interface LayoutConfig {
  maxWidth?: string;
  padding?: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  spacing?: {
    sections: string;
    components: string;
  };
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadows?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export interface AnimationConfig {
  enabled: boolean;
  speed: 'slow' | 'normal' | 'fast';
  type?: 'subtle' | 'normal' | 'dramatic';
  reduced?: boolean;
  respectReducedMotion?: boolean;
}

export interface AccessibilityConfig {
  highContrast?: boolean;
  largeText?: boolean;
  reducedMotion?: boolean;
  focusIndicators?: boolean;
  screenReaderSupport?: boolean;
  keyboardNavigation?: boolean;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  neutral?: string;
}

export interface TypographyConfig {
  primaryFont: string;
  secondaryFont: string;
  headingScale?: number;
  baseSize?: string;
  lineHeight?: number;
  fontWeights?: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface ResponsiveConfig {
  breakpoints?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  containerSizes?: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

export interface UIConfig {
  theme: ThemeConfig;
  features: ComponentVisibility;
  layout: LayoutConfig;
  animations: AnimationConfig;
  accessibility: AccessibilityConfig;
  colors: ColorPalette;
  typography: TypographyConfig;
  responsive: ResponsiveConfig;
  customCSS?: string;
}

export interface AppearancePreset {
  name: string;
  description: string;
  config: Partial<UIConfig>;
}

// Presets predefinidos
export const appearancePresets: AppearancePreset[] = [
  {
    name: 'classic',
    description: 'Diseño clásico y elegante',
    config: {
      colors: {
        primary: '#DC2626',
        secondary: '#F59E0B',
        accent: '#059669'
      },
      layout: {
        borderRadius: 'lg',
        shadows: 'lg'
      },
      animations: {
        enabled: true,
        speed: 'normal',
        type: 'normal'
      }
    }
  },
  {
    name: 'modern',
    description: 'Diseño moderno y minimalista',
    config: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#06B6D4'
      },
      layout: {
        borderRadius: '2xl',
        shadows: 'xl'
      },
      animations: {
        enabled: true,
        speed: 'fast',
        type: 'dramatic'
      }
    }
  },
  {
    name: 'cozy',
    description: 'Diseño acogedor y cálido',
    config: {
      colors: {
        primary: '#D97706',
        secondary: '#B45309',
        accent: '#059669'
      },
      layout: {
        borderRadius: 'xl',
        shadows: 'md'
      },
      animations: {
        enabled: true,
        speed: 'slow',
        type: 'subtle'
      }
    }
  },
  {
    name: 'accessible',
    description: 'Optimizado para accesibilidad',
    config: {
      accessibility: {
        highContrast: true,
        largeText: true,
        reducedMotion: true,
        focusIndicators: true
      },
      animations: {
        enabled: false,
        speed: 'normal',
        respectReducedMotion: true
      },
      layout: {
        borderRadius: 'md',
        shadows: 'sm'
      }
    }
  }
];
