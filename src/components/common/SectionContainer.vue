<template>
  <section 
    :id="sectionId"
    :class="[
      'py-8 sm:py-12 md:py-20',
      backgroundClass
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  sectionId?: string;
  background?: 'white-to-gray' | 'gray-to-white' | 'gray-to-dark' | 'white' | 'gray' | 'transparent';
}

const props = withDefaults(defineProps<Props>(), {
  background: 'white-to-gray'
});

const backgroundClass = computed(() => {
  switch (props.background) {
    case 'gray-to-white':
      return 'bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800';
    case 'gray-to-dark':
      return 'bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-800';
    case 'white':
      return 'bg-white dark:bg-gray-900';
    case 'gray':
      return 'bg-gray-50 dark:bg-gray-800';
    case 'transparent':
      return 'bg-transparent';
    default: // white-to-gray
      return 'bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900';
  }
});
</script>

<script lang="ts">
import { computed } from 'vue';
</script>
