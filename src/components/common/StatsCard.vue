<template>
  <div :class="[
    'text-center bg-white dark:bg-gray-900 rounded-lg md:rounded-xl shadow-sm dark:shadow-gray-900/20 hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700',
    padding,
    hoverShadowClass
  ]">
    <div :class="[
      'font-bold mb-1',
      valueSize,
      valueColorClass
    ]">
      {{ value }}
    </div>
    <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  value: string | number;
  label: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'green';
  size?: 'sm' | 'md' | 'lg';
  padding?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  padding: 'p-2 sm:p-3 md:p-4'
});

const valueSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-base sm:text-lg md:text-xl';
    case 'lg':
      return 'text-xl sm:text-2xl md:text-3xl';
    default:
      return 'text-lg sm:text-xl md:text-2xl';
  }
});

const valueColorClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'text-secondary-600 dark:text-secondary-300';
    case 'accent':
      return 'text-accent-600 dark:text-accent-300';
    case 'green':
      return 'text-green-600 dark:text-green-300';
    default:
      return 'text-primary-600 dark:text-primary-300';
  }
});

const hoverShadowClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'dark:hover:shadow-primary-900/30';
    default:
      return 'dark:hover:shadow-gray-900/30';
  }
});
</script>

<script lang="ts">
import { computed } from 'vue';
</script>
