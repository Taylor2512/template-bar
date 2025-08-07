<template>
  <button 
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-1 sm:gap-2 font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm sm:text-base touch-manipulation',
      sizeClasses,
      variantClasses,
      disabled && 'opacity-50 cursor-not-allowed hover:scale-100'
    ]"
    @click="$emit('click', $event)"
  >
    <component 
      v-if="icon" 
      :is="icon" 
      :size="iconSize" 
      class="flex-shrink-0" 
    />
    <span v-if="$slots.default || text" class="truncate">
      <slot>{{ text }}</slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'green' | 'blue' | 'pink' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: Component;
  iconSize?: number;
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  iconSize: 16,
  type: 'button',
  disabled: false
});

defineEmits<{
  click: [event: MouseEvent];
}>();

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-2 text-xs sm:text-sm';
    case 'lg':
      return 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg';
    default:
      return 'px-4 py-2 sm:px-6 sm:py-3';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-secondary-600 hover:bg-secondary-700 dark:bg-secondary-500 dark:hover:bg-secondary-600 text-white rounded-lg dark:shadow-secondary-500/20 dark:hover:shadow-secondary-400/30';
    case 'accent':
      return 'bg-accent-600 hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-600 text-white rounded-lg dark:shadow-accent-500/20 dark:hover:shadow-accent-400/30';
    case 'green':
      return 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg dark:shadow-green-600/20 dark:hover:shadow-green-500/30';
    case 'blue':
      return 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg dark:shadow-blue-600/20 dark:hover:shadow-blue-500/30';
    case 'pink':
      return 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg';
    case 'outline':
      return 'border-2 border-primary-600 text-primary-600 dark:text-primary-400 dark:border-primary-400 bg-transparent hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 dark:hover:text-gray-900 rounded-lg';
    default: // primary
      return 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg dark:shadow-primary-500/20 dark:hover:shadow-primary-400/30';
  }
});
</script>

<script lang="ts">
import { computed } from 'vue';
</script>
