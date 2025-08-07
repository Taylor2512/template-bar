<template>
  <div class="text-center mb-8 sm:mb-12 md:mb-16">
    <div class="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
      <div class="w-6 sm:w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-primary-600 dark:to-primary-400"></div>
      <component 
        :is="iconComponent" 
        class="text-primary-600 dark:text-primary-400" 
        :size="20" 
      />
      <div class="w-6 sm:w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-primary-600 dark:to-primary-400"></div>
    </div>

    <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
      <slot name="title">
        {{ title }} <span v-if="highlightText" class="gradient-text">{{ highlightText }}</span>
      </slot>
    </h2>
    
    <p v-if="description || $slots.description" 
       class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  title?: string;
  highlightText?: string;
  description?: string;
  iconComponent: Component;
}

defineProps<Props>();
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #E88506 0%, #DC2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
