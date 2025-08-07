<template>
  <Card custom-classes="text-center">
    <h3 class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
      <QrCode class="inline mr-2" :size="20" />
      Escanea y Comparte
    </h3>
    
    <div v-if="qrCode" class="mb-3 sm:mb-4">
      <img 
        :src="qrCode" 
        alt="QR Code del menú" 
        class="mx-auto rounded-lg shadow-md w-48 h-48 sm:w-64 sm:h-64 object-contain"
      />
    </div>
    
    <div v-else class="w-48 h-48 sm:w-64 sm:h-64 mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
      <div class="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary dark:border-primary-400"></div>
    </div>

    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
      Comparte este código QR para que otros puedan ver nuestro menú
    </p>

    <div class="flex flex-col sm:flex-row gap-2 justify-center">
      <button
        @click="downloadQR"
        :disabled="!qrCode"
        class="flex items-center justify-center gap-2 bg-primary hover:bg-red-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation active:scale-95"
      >
        <Download :size="14" class="sm:w-4 sm:h-4" />
        <span class="hidden sm:inline">Descargar</span>
        <span class="sm:hidden">💾</span>
      </button>
      
      <button
        @click="shareMenu"
        class="flex items-center justify-center gap-2 bg-secondary hover:bg-yellow-500 dark:bg-secondary-600 dark:hover:bg-secondary-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base touch-manipulation active:scale-95"
      >
        <Share2 :size="14" class="sm:w-4 sm:h-4" />
        <span class="hidden sm:inline">Compartir</span>
        <span class="sm:hidden">📤</span>
      </button>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QrCode, Download, Share2 } from 'lucide-vue-next';
import { generateQR } from '../utils';
import { Card } from './common';

const qrCode = ref<string | null>(null);

onMounted(async () => {
  const currentUrl = window.location.href;
  qrCode.value = await generateQR(currentUrl);
});

const downloadQR = () => {
  if (!qrCode.value) return;
  
  const link = document.createElement('a');
  link.download = 'menu-qr-code.png';
  link.href = qrCode.value;
  link.click();
};

const shareMenu = async () => {
  const url = window.location.href;
  const text = 'Mira este increíble menú de restaurante';
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Menú del Restaurante',
        text,
        url
      });
    } catch (error) {
      console.log('Error sharing:', error);
      fallbackShare(url, text);
    }
  } else {
    fallbackShare(url, text);
  }
};

const fallbackShare = (url: string, text: string) => {
  navigator.clipboard.writeText(`${text} ${url}`).then(() => {
    alert('¡Enlace copiado al portapapeles!');
  }).catch(() => {
    alert(`Comparte este enlace: ${url}`);
  });
};
</script>
