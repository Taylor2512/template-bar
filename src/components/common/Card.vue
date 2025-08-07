<template>
  <div :class="[
    'bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 transition-all duration-300',
    padding,
    hoverEffect && 'hover:shadow-xl dark:hover:shadow-gray-900/40 hover:-translate-y-1',
    clickable && 'cursor-pointer',
    customClasses
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  padding?: string;
  hoverEffect?: boolean;
  clickable?: boolean;
  customClasses?: string;
}

withDefaults(defineProps<Props>(), {
  padding: 'p-6 md:p-8',
  hoverEffect: false,
  clickable: false,
  customClasses: ''
});
</script>
