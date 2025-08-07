<template>
  <button
    v-if="visible && showWhatsApp"
    @click="sendWhatsApp"
    :disabled="disabled || isProcessing"
    :class="[
      baseClasses,
      sizeClasses,
      variantClasses,
      stateClasses,
      animationClasses,
      customClasses
    ]"
    :style="customStyles"
    :aria-label="ariaLabel"
  >
    <!-- Loading state -->
    <div v-if="isProcessing" class="animate-spin mr-2">
      <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
    </div>
    
    <!-- WhatsApp Icon -->
    <MessageCircle 
      v-else-if="icon"
      :size="iconSize" 
      class="flex-shrink-0" 
    />
    
    <!-- Button text/content -->
    <span v-if="showText" class="truncate">
      <slot>{{ computedButtonText }}</slot>
    </span>
    
    <!-- Badge/notification -->
    <span 
      v-if="showBadge && badgeCount > 0"
      :class="badgeClasses"
    >
      {{ badgeCount > 99 ? '99+' : badgeCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { MessageCircle } from 'lucide-vue-next';
import type { CartItem } from '../types';
import { useUI } from '../composables/useUI';

interface Props {
  phone: string;
  baseMessage?: string;
  item?: {
    name: string;
    price: number;
    quantity?: number;
  };
  cartItems?: CartItem[];
  buttonText?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: boolean;
  showText?: boolean;
  disabled?: boolean;
  visible?: boolean;
  loading?: boolean;
  showBadge?: boolean;
  badgeCount?: number;
  customMessage?: string;
  openInNewTab?: boolean;
  trackEvent?: boolean;
  customClasses?: string;
  customStyles?: Record<string, string>;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  baseMessage: 'Hola, quiero hacer un pedido:',
  buttonText: 'Pedir por WhatsApp',
  variant: 'default',
  size: 'md',
  icon: true,
  showText: true,
  disabled: false,
  visible: true,
  loading: false,
  showBadge: false,
  badgeCount: 0,
  openInNewTab: true,
  trackEvent: false,
  customClasses: '',
  customStyles: () => ({})
});

const emit = defineEmits<{
  click: [phone: string, message: string];
  error: [error: string];
}>();

const { config, isFeatureEnabled } = useUI();

const isProcessing = ref(false);

// Check if WhatsApp feature is enabled
const showWhatsApp = computed(() => {
  return isFeatureEnabled('whatsapp');
});

// Compute button text based on context
const computedButtonText = computed(() => {
  if (props.item) {
    return `Pedir ${props.item.name}`;
  }
  if (props.cartItems && props.cartItems.length > 0) {
    return `Enviar Pedido (${props.cartItems.length} items)`;
  }
  return props.buttonText;
});

// Compute aria label for accessibility
const ariaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  return `Enviar pedido por WhatsApp${props.disabled ? ' (deshabilitado)' : ''}`;
});

// Compute icon size based on button size
const iconSize = computed(() => {
  const sizeMap = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  };
  return sizeMap[props.size];
});

// Base classes for all buttons
const baseClasses = computed(() => {
  return [
    'inline-flex items-center justify-center gap-1 sm:gap-2',
    'font-medium transition-all duration-300 transform',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'touch-manipulation relative overflow-hidden',
    props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
  ].join(' ');
});

// Size-specific classes
const sizeClasses = computed(() => {
  const sizeMap = {
    sm: 'px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-md',
    md: 'px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base',
    lg: 'px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg',
    xl: 'px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-lg sm:text-xl'
  };
  return sizeMap[props.size];
});

// Variant-specific styling
const variantClasses = computed(() => {
  const variants = {
    default: [
      'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700',
      'text-white shadow-lg hover:shadow-xl',
      'dark:shadow-green-600/20 dark:hover:shadow-green-500/30',
      'focus:ring-green-500'
    ].join(' '),
    
    outline: [
      'border-2 border-green-500 text-green-600 dark:text-green-400',
      'hover:bg-green-500 hover:text-white dark:hover:bg-green-600',
      'focus:ring-green-500 bg-transparent'
    ].join(' '),
    
    ghost: [
      'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
      'hover:bg-green-100 dark:hover:bg-green-900/30',
      'focus:ring-green-500'
    ].join(' '),
    
    minimal: [
      'text-green-600 dark:text-green-400 bg-transparent',
      'hover:bg-green-50 dark:hover:bg-green-900/20',
      'focus:ring-green-500'
    ].join(' ')
  };
  
  return variants[props.variant];
});

// State-based classes (disabled, loading, etc.)
const stateClasses = computed(() => {
  if (props.disabled || isProcessing.value) {
    return 'opacity-50 transform-none hover:transform-none';
  }
  
  return 'hover:scale-105 active:scale-95';
});

// Animation classes
const animationClasses = computed(() => {
  if (!config.value.animations.enabled) return '';
  
  const speed = {
    slow: 'duration-500',
    normal: 'duration-300',
    fast: 'duration-150'
  }[config.value.animations.speed || 'normal'];
  
  return speed;
});

// Badge styling
const badgeClasses = computed(() => {
  return [
    'absolute -top-1 -right-1 min-w-[1.25rem] h-5',
    'bg-red-500 text-white text-xs font-medium',
    'rounded-full flex items-center justify-center',
    'px-1.5 shadow-sm'
  ].join(' ');
});

// Format WhatsApp message
const formatMessage = (): string => {
  if (props.customMessage) {
    return props.customMessage;
  }

  let message = props.baseMessage;

  if (props.cartItems && props.cartItems.length > 0) {
    const itemsList = props.cartItems
      .map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    
    const total = props.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    message = `${props.baseMessage}\n\n*PEDIDO:*\n${itemsList}\n\n*TOTAL: $${total.toFixed(2)}*`;
  } else if (props.item) {
    const quantity = props.item.quantity || 1;
    const total = props.item.price * quantity;
    message = `${props.baseMessage}\n\n*${quantity}x ${props.item.name}*\n*Precio: $${total.toFixed(2)}*`;
  }

  return message;
};

// Send WhatsApp message
const sendWhatsApp = async () => {
  if (props.disabled || isProcessing.value) return;

  try {
    isProcessing.value = true;

    // Validate phone number
    const cleanPhone = props.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      throw new Error('Número de teléfono inválido');
    }

    const message = formatMessage();
    
    // Track event if enabled
    if (props.trackEvent && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: props.item ? 'single_item' : 'cart',
        value: props.cartItems?.length || 1
      });
    }

    // Emit click event
    emit('click', cleanPhone, message);

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    
    if (props.openInNewTab) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = whatsappUrl;
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error al enviar mensaje';
    emit('error', errorMessage);
    console.error('WhatsApp error:', error);
  } finally {
    // Add small delay for better UX
    setTimeout(() => {
      isProcessing.value = false;
    }, 500);
  }
};
</script>

<style scoped>
/* Ripple effect on click */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.button-ripple {
  position: relative;
  overflow: hidden;
}

.button-ripple::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button-ripple:active::before {
  width: 300px;
  height: 300px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-green-500 {
    background-color: #000;
    border: 2px solid #fff;
  }
  
  .text-green-600 {
    color: #000;
  }
  
  @media (prefers-color-scheme: dark) {
    .bg-green-500 {
      background-color: #fff;
      color: #000;
    }
    
    .text-green-600 {
      color: #fff;
    }
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .transform,
  .hover\\:scale-105:hover,
  .active\\:scale-95:active {
    transform: none !important;
  }
  
  .animate-spin {
    animation: none;
  }
}

/* Focus styles for keyboard navigation */
button:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}
</style>
