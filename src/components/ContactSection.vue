<template>
  <SectionContainer section-id="contacto" background="white-to-gray">
    <!-- Section Header -->
    <SectionHeader 
      title="Ponte en"
      highlight-text="Contacto"
      description="Estamos aquí para atenderte. Contáctanos para reservas, consultas o cualquier información que necesites"
      :icon-component="MessageCircle"
    />

    <!-- Contact Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
      
      <!-- Contact Information -->
      <div class="space-y-6 md:space-y-8">
        <!-- Contact Methods -->
        <Card>
          <h3 class="text-xl md:text-2xl font-playfair font-semibold text-gray-800 dark:text-gray-100 mb-6 md:mb-8">
            Información de Contacto
          </h3>
          
          <div class="space-y-4 md:space-y-6">
            <!-- Phone -->
            <ContactInfoItem
              :icon="Phone"
              title="Teléfono"
              :content="config.phoneNumber"
              :href="`tel:${config.phoneNumber}`"
              variant="primary"
            />

            <!-- Email -->
            <ContactInfoItem
              :icon="Mail"
              title="Email"
              :content="config.email"
              :href="`mailto:${config.email}`"
              variant="secondary"
            />

            <!-- Address -->
            <ContactInfoItem
              :icon="MapPin"
              title="Dirección"
              :content="config.address"
              variant="accent"
            >
              <template #extra>
                <a v-if="config.contact?.location?.googleMapsUrl" 
                   :href="config.contact.location.googleMapsUrl" 
                   target="_blank"
                   class="inline-flex items-center gap-1 mt-2 text-sm text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors">
                  <ExternalLink :size="14" />
                  Ver en Google Maps
                </a>
              </template>
            </ContactInfoItem>
          </div>
        </Card>

        <!-- Schedule -->
        <Card v-if="config.contact?.schedule">
          <h3 class="text-xl md:text-2xl font-playfair font-semibold text-gray-800 dark:text-gray-100 mb-6 md:mb-8 flex items-center gap-3">
            <Clock class="text-primary-600 dark:text-primary-400" :size="24" />
            Horarios de Atención
          </h3>
          
          <div class="space-y-3">
            <div v-for="(time, day) in config.contact.schedule" :key="day" 
                 class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
              <span class="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 capitalize">
                {{ formatDayName(day) }}
              </span>
              <span class="text-sm md:text-base text-gray-600 dark:text-gray-400">
                {{ time || 'Cerrado' }}
              </span>
            </div>
          </div>
        </Card>

        <!-- Social Media -->
        <Card v-if="config.social">
          <h3 class="text-xl md:text-2xl font-playfair font-semibold text-gray-800 dark:text-gray-100 mb-6 md:mb-8">
            Síguenos en Redes Sociales
          </h3>
          
          <div class="flex flex-wrap gap-4">
            <IconButton
              v-if="config.social.facebook"
              variant="blue"
              :icon="Facebook"
              text="Facebook"
              @click="() => openLink(config.social.facebook!)"
            />
            
            <IconButton
              v-if="config.social.instagram"
              variant="pink"
              :icon="Instagram"
              text="Instagram"
              @click="() => openLink(config.social.instagram!)"
            />
            
            <IconButton
              v-if="config.social.twitter"
              variant="blue"
              :icon="Twitter"
              text="Twitter"
              @click="() => openLink(config.social.twitter!)"
            />
          </div>
        </Card>
      </div>

      <!-- Contact Form -->
      <div>
        <ContactForm :config="config" />
      </div>
    </div>

    <!-- Quick Action Buttons -->
    <div class="mt-12 md:mt-16 text-center">
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <WhatsAppButton 
          :phone="config.phoneNumber" 
          :base-message="config.whatsappMessage"
          button-text="Contactar por WhatsApp"
          size="lg"
          variant="default"
          custom-classes="transform hover:scale-105 shadow-lg hover:shadow-xl"
        />
        
        <IconButton
          variant="primary"
          :icon="Phone"
          text="Llamar Ahora"
          @click="() => callPhone(config.phoneNumber)"
        />
      </div>
    </div>
  </SectionContainer>
</template>

<script setup lang="ts">
import { MessageCircle, Phone, Mail, MapPin, Clock, ExternalLink, Facebook, Instagram, Twitter } from 'lucide-vue-next';
import type { RestaurantConfig } from '../types';
import ContactForm from './ContactForm.vue';
import WhatsAppButton from './WhatsAppButton.vue';
import { SectionHeader, Card, IconButton, ContactInfoItem, SectionContainer } from './common';

interface Props {
  config: RestaurantConfig;
}

defineProps<Props>();

const formatDayName = (day: string): string => {
  const dayNames: Record<string, string> = {
    monday: 'Lunes',
    tuesday: 'Martes', 
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };
  return dayNames[day] || day;
};

const openLink = (url: string) => {
  window.open(url, '_blank');
};

const callPhone = (phone: string) => {
  window.location.href = `tel:${phone}`;
};
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(135deg, #E88506 0%, #DC2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced hover effects */
.transform {
  transition: transform 0.2s ease-in-out;
}

/* Focus states for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid rgba(232, 133, 6, 0.6);
  outline-offset: 2px;
}

/* Smooth animations */
.transition-all {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
