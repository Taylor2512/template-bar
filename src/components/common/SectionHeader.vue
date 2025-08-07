<template>
  <div 
    v-if="visible"
    :class="[
      'text-center',
      spacingClasses,
      animationClasses
    ]"
  >
    <!-- Icon Line Decorations -->
    <div 
      v-if="showIcon"
      :class="[
        'inline-flex items-center gap-2 sm:gap-3',
        iconSpacingClasses
      ]"
    >
      <div 
        v-if="showDecorations"
        :class="decorationClasses"
      ></div>
      
      <component 
        v-if="iconComponent"
        :is="iconComponent" 
        :size="iconSize" 
        :class="iconColorClasses"
      />
      
      <div 
        v-if="showDecorations"
        :class="decorationClasses"
      ></div>
    </div>

    <!-- Main Heading -->
    <h2 
      :class="[
        headingClasses,
        textSizeClasses,
        headingColorClasses
      ]"
    >
      <slot name="title">
        {{ title }}<span 
          v-if="highlightText" 
          :class="gradientTextClasses"
        > {{ highlightText }}</span>
      </slot>
    </h2>
    
    <!-- Description -->
    <p 
      v-if="(description || $slots.description) && showDescription" 
      :class="[
        descriptionClasses,
        descriptionSizeClasses,
        descriptionColorClasses
      ]"
    >
      <slot name="description">{{ description }}</slot>
    </p>

    <!-- Custom Content Slot -->
    <div v-if="$slots.content" :class="contentSpacingClasses">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import { useUI } from '../../composables/useUI';

interface Props {
  title?: string;
  highlightText?: string;
  description?: string;
  iconComponent?: Component;
  iconSize?: number;
  variant?: 'default' | 'large' | 'small' | 'minimal';
  alignment?: 'left' | 'center' | 'right';
  showIcon?: boolean;
  showDecorations?: boolean;
  showDescription?: boolean;
  visible?: boolean;
  animated?: boolean;
  spacing?: 'tight' | 'normal' | 'loose';
  customClasses?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  alignment: 'center',
  iconSize: 20,
  showIcon: true,
  showDecorations: true,
  showDescription: true,
  visible: true,
  animated: true,
  spacing: 'normal'
});

const { config, getAnimationClasses } = useUI();

// Computed classes based on variant and configuration
const spacingClasses = computed(() => {
  const spacing = {
    tight: 'mb-6 sm:mb-8 md:mb-10',
    normal: 'mb-8 sm:mb-12 md:mb-16',
    loose: 'mb-12 sm:mb-16 md:mb-20'
  }[props.spacing];

  const alignment = props.alignment === 'left' ? 'text-left' : 
                   props.alignment === 'right' ? 'text-right' : 'text-center';

  return `${spacing} ${alignment}`;
});

const iconSpacingClasses = computed(() => {
  const spacing = {
    small: 'mb-2 sm:mb-3 md:mb-4',
    minimal: 'mb-1 sm:mb-2 md:mb-3',
    default: 'mb-3 sm:mb-4 md:mb-6',
    large: 'mb-4 sm:mb-6 md:mb-8'
  }[props.variant];

  return spacing;
});

const headingClasses = computed(() => {
  return 'font-playfair font-bold mb-3 sm:mb-4';
});

const textSizeClasses = computed(() => {
  const sizes = {
    minimal: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    small: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    default: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    large: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
  }[props.variant];

  return sizes;
});

const headingColorClasses = computed(() => {
  return config.value.accessibility.highContrast 
    ? 'text-gray-900 dark:text-white'
    : 'text-gray-800 dark:text-gray-100';
});

const descriptionClasses = computed(() => {
  return 'max-w-2xl mx-auto leading-relaxed px-4';
});

const descriptionSizeClasses = computed(() => {
  const sizes = {
    minimal: 'text-sm sm:text-base md:text-lg',
    small: 'text-base sm:text-lg md:text-xl',
    default: 'text-base sm:text-lg md:text-xl',
    large: 'text-lg sm:text-xl md:text-2xl'
  }[props.variant];

  return sizes;
});

const descriptionColorClasses = computed(() => {
  return config.value.accessibility.highContrast
    ? 'text-gray-700 dark:text-gray-200'
    : 'text-gray-600 dark:text-gray-300';
});

const decorationClasses = computed(() => {
  const width = {
    minimal: 'w-4 sm:w-6 md:w-8',
    small: 'w-6 sm:w-8 md:w-10',
    default: 'w-6 sm:w-8 md:w-12',
    large: 'w-8 sm:w-12 md:w-16'
  }[props.variant];

  return `${width} h-0.5 bg-gradient-to-r from-transparent to-primary-600 dark:to-primary-400`;
});

const iconColorClasses = computed(() => {
  return 'text-primary-600 dark:text-primary-400';
});

const gradientTextClasses = computed(() => {
  return config.value.accessibility.highContrast
    ? 'text-primary-600 dark:text-primary-400'
    : 'gradient-text';
});

const contentSpacingClasses = computed(() => {
  return 'mt-4 sm:mt-6 md:mt-8';
});

const animationClasses = computed(() => {
  if (!props.animated || !config.value.animations.enabled) return '';
  return getAnimationClasses.value;
});
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #E88506 0%, #DC2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
