import QRCode from 'qrcode';

export const generateQR = async (url: string): Promise<string | null> => {
  try {
    return await QRCode.toDataURL(url, {
      width: 256,
      margin: 2,
      color: {
        dark: '#B91C1C',
        light: '#FFFFFF'
      }
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatWhatsAppMessage = (
  baseMessage: string,
  items: Array<{ name: string; quantity: number; price: number }>
): string => {
  const itemsList = items
    .map(item => `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}`)
    .join('\n');
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return `${baseMessage}\n\n*PEDIDO:*\n${itemsList}\n\n*TOTAL: ${formatPrice(total)}*`;
};
