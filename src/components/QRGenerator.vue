<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 text-center">
    <h3 class="text-xl font-semibold text-gray-800 mb-4">
      <QrCode class="inline mr-2" :size="24" />
      Escanea y Comparte
    </h3>
    
    <div v-if="qrCode" class="mb-4">
      <img 
        :src="qrCode" 
        alt="QR Code del menú" 
        class="mx-auto rounded-lg shadow-md"
      />
    </div>
    
    <div v-else class="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <p class="text-sm text-gray-600 mb-4">
      Comparte este código QR para que otros puedan ver nuestro menú
    </p>

    <div class="flex gap-2 justify-center">
      <button
        @click="downloadQR"
        :disabled="!qrCode"
        class="flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download :size="16" />
        Descargar
      </button>
      
      <button
        @click="shareMenu"
        class="flex items-center gap-2 bg-secondary hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
      >
        <Share2 :size="16" />
        Compartir
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { QrCode, Download, Share2 } from 'lucide-vue-next';
import { generateQR } from '../utils';

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
