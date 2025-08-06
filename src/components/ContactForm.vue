<template>
  <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700">
    <h3 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6 text-center">Contáctanos</h3>
    
    <form @submit.prevent="submitForm" class="space-y-4 sm:space-y-6">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nombre completo
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base touch-manipulation"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Correo electrónico
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base touch-manipulation"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Teléfono (opcional)
        </label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base touch-manipulation"
          placeholder="+593 999 999 999"
        />
      </div>

      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Asunto
        </label>
        <select
          id="subject"
          v-model="form.subject"
          required
          class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm sm:text-base touch-manipulation"
        >
          <option value="">Selecciona un asunto</option>
          <option value="reserva">Reserva de mesa</option>
          <option value="evento">Organizar evento</option>
          <option value="catering">Servicio de catering</option>
          <option value="sugerencia">Sugerencia</option>
          <option value="queja">Queja o reclamo</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          v-model="form.message"
          required
          rows="4"
          class="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base touch-manipulation"
          placeholder="Escribe tu mensaje aquí..."
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-primary hover:bg-red-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation active:scale-[0.98] active:duration-75"
      >
        <Send v-if="!isSubmitting" :size="20" />
        <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
      </button>
    </form>

    <!-- Contact Info -->
    <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
      <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-4 text-sm sm:text-base">Información de contacto</h4>
      <div class="space-y-3">
        <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          <MapPin :size="20" class="text-primary dark:text-primary-400 flex-shrink-0" />
          <span class="break-words">{{ config.address }}</span>
        </div>
        <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          <Phone :size="20" class="text-primary dark:text-primary-400 flex-shrink-0" />
          <a :href="`tel:${config.phoneNumber}`" class="hover:text-primary dark:hover:text-primary-400 transition-colors touch-manipulation">
            {{ config.phoneNumber }}
          </a>
        </div>
        <div class="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          <MapPin :size="20" class="text-primary dark:text-primary-400 flex-shrink-0" />
          <span>Lunes a Domingo: 9:00 AM - 10:00 PM</span>
        </div>
      </div>

      <!-- Social Links -->
      <div v-if="config.social" class="flex gap-4 mt-6">
        <a
          v-if="config.social.facebook"
          :href="config.social.facebook"
          target="_blank"
          class="p-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full transition-colors touch-manipulation active:scale-95"
        >
          <Facebook :size="20" />
        </a>
        <a
          v-if="config.social.instagram"
          :href="config.social.instagram"
          target="_blank"
          class="p-3 bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white rounded-full transition-colors touch-manipulation active:scale-95"
        >
          <Instagram :size="20" />
        </a>
      </div>
    </div>

    <!-- Success Message -->
    <Transition name="fade">
      <div
        v-if="showSuccess"
        class="mt-6 p-4 bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded-lg"
      >
        ¡Gracias por tu mensaje! Te responderemos pronto.
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Send, MapPin, Phone, Facebook, Instagram } from 'lucide-vue-next';
import type { RestaurantConfig } from '../types';

interface Props {
  config: RestaurantConfig;
}

defineProps<Props>();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  
  try {
    // Simular envío de formulario
    // En producción, aquí enviarías a tu endpoint
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    
    showSuccess.value = true;
    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
    
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error al enviar el mensaje. Por favor intenta de nuevo.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
