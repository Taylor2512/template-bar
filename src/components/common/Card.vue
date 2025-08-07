<template>
  <div 
    v-if="visible"
    :class="[
      baseClasses,
      variantClasses,
      sizeClasses,
      animationClasses,
      interactionClasses,
      customClasses
    ]"
    :style="customStyles"
    @click="handleClick"
  >
    <!-- Optional header slot -->
    <div v-if="$slots.header" :class="headerClasses">
      <slot name="header" />
    </div>

    <!-- Main content -->
    <div :class="contentClasses">
      <slot />
    </div>

    <!-- Optional footer slot -->
    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>

    <!-- Loading overlay -->
    <div v-if="loading" :class="loadingOverlayClasses">
      <div :class="loadingSpinnerClasses"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useUI } from '../../composables/useUI';

interface Props {
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: string;
  hoverEffect?: boolean;
  clickable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  visible?: boolean;
  animated?: boolean;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: string;
  border?: string;
  customClasses?: string;
  customStyles?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  hoverEffect: false,
  clickable: false,
  loading: false,
  disabled: false,
  visible: true,
  animated: true,
  borderRadius: 'lg',
  shadow: 'md'
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const { config, getAnimationClasses } = useUI();

// Base classes that apply to all cards
const baseClasses = computed(() => {
  return 'relative overflow-hidden transition-all duration-300';
});

// Variant-specific styling
const variantClasses = computed(() => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg dark:shadow-gray-900/30',
    outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
    ghost: 'bg-gray-50 dark:bg-gray-900/50 border-none',
    glass: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-white/20 dark:border-gray-700/50'
  }[props.variant];

  return variants;
});

// Size-based padding and spacing
const sizeClasses = computed(() => {
  if (props.padding) {
    return props.padding;
  }

  const sizes = {
    sm: 'p-3 md:p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
    xl: 'p-8 md:p-10'
  }[props.size];

  return sizes;
});

// Dynamic border radius
const borderRadiusClass = computed(() => {
  const radiusMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  }[props.borderRadius || 'lg'];

  return radiusMap;
});

// Dynamic shadow
const shadowClass = computed(() => {
  if (props.shadow === 'none') return '';
  
  const shadowMap = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl'
  }[props.shadow || 'md'];

  return shadowMap;
});

// Animation classes
const animationClasses = computed(() => {
  if (!props.animated || !config.value.animations.enabled) return '';
  return `${getAnimationClasses.value} ${borderRadiusClass.value} ${shadowClass.value}`;
});

// Interaction states
const interactionClasses = computed(() => {
  if (props.disabled) {
    return 'opacity-50 cursor-not-allowed';
  }

  let classes = '';

  if (props.clickable) {
    classes += 'cursor-pointer ';
  }

  if (props.hoverEffect && !props.disabled) {
    switch (props.variant) {
      case 'elevated':
        classes += 'hover:shadow-xl dark:hover:shadow-gray-900/40 hover:-translate-y-1 ';
        break;
      case 'outlined':
        classes += 'hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/10 ';
        break;
      case 'glass':
        classes += 'hover:bg-white/90 dark:hover:bg-gray-900/90 ';
        break;
      default:
        classes += 'hover:shadow-lg dark:hover:shadow-gray-900/40 ';
    }
  }

  return classes;
});

// Content area classes
const contentClasses = computed(() => {
  return props.loading ? 'opacity-50' : '';
});

// Header classes
const headerClasses = computed(() => {
  return 'border-b border-gray-200 dark:border-gray-700 pb-4 mb-4';
});

// Footer classes
const footerClasses = computed(() => {
  return 'border-t border-gray-200 dark:border-gray-700 pt-4 mt-4';
});

// Loading overlay
const loadingOverlayClasses = computed(() => {
  return 'absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-10';
});

// Loading spinner
const loadingSpinnerClasses = computed(() => {
  return 'w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin';
});

// Handle click events
const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;
  if (props.clickable) {
    emit('click', event);
  }
};
</script>

<style scoped>
/* Glass effect enhancement */
.bg-white\/80 {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .border-gray-200 {
    border-color: #000;
  }
  
  .border-gray-700 {
    border-color: #fff;
  }
}

/* Focus styles for accessibility */
div:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transition-all {
    transition: none;
  }
  
  .hover\:-translate-y-1:hover {
    transform: none;
  }
  
  .animate-spin {
    animation: none;
  }
}
</style>
