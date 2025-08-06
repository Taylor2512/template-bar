<template>
  <button
    @click="sendWhatsApp"
    class="inline-flex items-center justify-center gap-1 sm:gap-2 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl dark:shadow-green-600/20 dark:hover:shadow-green-500/30 text-sm sm:text-base touch-manipulation"
  >
    <MessageCircle :size="16" class="sm:w-5 sm:h-5 flex-shrink-0" />
    <span class="truncate">{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next';
import type { CartItem } from '../types';

interface Props {
  phone: string;
  baseMessage?: string;
  item?: {
    name: string;
    price: number;
  };
  cartItems?: CartItem[];
  buttonText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  baseMessage: 'Hola, quiero hacer un pedido:',
  buttonText: 'Pedir por WhatsApp'
});

const sendWhatsApp = () => {
  const cleanPhone = props.phone.replace(/\D/g, '');
  let message = props.baseMessage;

  if (props.cartItems && props.cartItems.length > 0) {
    // Multiple items from cart
    const itemsList = props.cartItems
      .map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    
    const total = props.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    message = `${props.baseMessage}\n\n*PEDIDO:*\n${itemsList}\n\n*TOTAL: $${total.toFixed(2)}*`;
  } else if (props.item) {
    // Single item
    message = `${props.baseMessage}\n\n*PRODUCTO:*\n${props.item.name} - $${props.item.price.toFixed(2)}`;
  }

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};
</script>
