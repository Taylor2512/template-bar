<template>
  <div class="flex items-start gap-4">
    <div :class="[
      'flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center',
      iconBgClass
    ]">
      <component 
        :is="icon" 
        :class="iconColorClass" 
        :size="20" 
      />
    </div>
    <div class="flex-1 min-w-0">
      <h4 class="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
        {{ title }}
      </h4>
      <div class="text-sm md:text-base text-gray-600 dark:text-gray-300">
        <slot>
          <component 
            v-if="href" 
            :is="href.startsWith('tel:') || href.startsWith('mailto:') ? 'a' : 'p'"
            :href="href"
            :class="href ? hoverColorClass + ' transition-colors' : ''"
            v-html="content"
          />
          <p v-else v-html="content" class="leading-relaxed" />
        </slot>
      </div>
      <slot name="extra" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

interface Props {
  icon: Component;
  title: string;
  content?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
});

const iconBgClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-secondary-100 dark:bg-secondary-900/30';
    case 'accent':
      return 'bg-accent-100 dark:bg-accent-900/30';
    default:
      return 'bg-primary-100 dark:bg-primary-900/30';
  }
});

const iconColorClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'text-secondary-600 dark:text-secondary-400';
    case 'accent':
      return 'text-accent-600 dark:text-accent-400';
    default:
      return 'text-primary-600 dark:text-primary-400';
  }
});

const hoverColorClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'hover:text-secondary-600 dark:hover:text-secondary-400';
    case 'accent':
      return 'hover:text-accent-600 dark:hover:text-accent-400';
    default:
      return 'hover:text-primary-600 dark:hover:text-primary-400';
  }
});
</script>

<script lang="ts">
import { computed } from 'vue';
</script>
