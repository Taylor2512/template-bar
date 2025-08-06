# 🍽️ Template de Menú de Restaurante

Un elegante y moderno template de menú de restaurante construido con **Vue 3**, **TypeScript**, **Vite** y **Tailwind CSS**. Completamente responsive, interactivo y listo para personalizar.

## ✨ Características

- 🎨 **Diseño Elegante y Moderno** - Interfaz atractiva con animaciones suaves
- 📱 **Totalmente Responsive** - Optimizado para móvil, tablet y escritorio
- 🛒 **Carrito de Compras** - Sistema de carrito con contador y gestión de items
- 📲 **Integración WhatsApp** - Pedidos directos por WhatsApp
- 🎯 **QR Generator** - Genera códigos QR para compartir el menú
- 📧 **Formulario de Contacto** - Sistema de contacto integrado
- 🔧 **Completamente Configurable** - JSON para configuración y menú
- ⚡ **Alto Rendimiento** - Construido con Vite para máxima velocidad
- 🎭 **Animaciones Fluidas** - Transiciones y animaciones con CSS

## 🚀 Instalación y Configuración

### 1. Clonar e instalar dependencias

```bash
# Clonar el repositorio
git clone <tu-repo-url>
cd template-bar

# Instalar dependencias
npm install
```

### 2. Configurar el restaurante

Edita `public/config.json` con los datos de tu restaurante:

```json
{
  "restaurantName": "Tu Restaurante",
  "primaryColor": "#B91C1C",
  "secondaryColor": "#F59E0B", 
  "phoneNumber": "+593987654321",
  "address": "Tu dirección completa",
  "whatsappMessage": "Hola, quiero hacer un pedido:",
  "email": "contacto@turestaurante.com",
  "hero": {
    "title": "Sabores Auténticos",
    "subtitle": "Tu eslogan aquí"
  }
}
```

### 3. Configurar el menú

Edita `public/menu.json` con tus platos:

```json
[
  {
    "category": "Entradas",
    "icon": "🥗",
    "items": [
      {
        "name": "Tu Plato",
        "price": 12.50,
        "description": "Descripción del plato",
        "featured": true
      }
    ]
  }
]
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🏗️ Build para Producción

```bash
# Construir la aplicación
npm run build

# Vista previa del build
npm run preview
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Sigue las instrucciones en pantalla

### Netlify

1. Construye el proyecto:
```bash
npm run build
```

2. Sube la carpeta `dist` a Netlify

## 📁 Estructura del Proyecto

```
template-bar/
├── public/
│   ├── config.json          # Configuración del restaurante
│   ├── menu.json            # Datos del menú
│   └── placeholder-food.jpg # Imagen placeholder
├── src/
│   ├── components/          # Componentes Vue
│   │   ├── CartSidebar.vue
│   │   ├── ContactForm.vue
│   │   ├── HelloWorld.vue   # Hero section
│   │   ├── MenuCard.vue
│   │   ├── MenuSection.vue
│   │   ├── Navigation.vue
│   │   ├── QRGenerator.vue
│   │   └── WhatsAppButton.vue
│   ├── composables/         # Composables de Vue
│   │   └── useCart.ts
│   ├── types/               # Tipos TypeScript
│   │   └── index.ts
│   ├── utils/               # Utilidades
│   │   └── index.ts
│   ├── styles/              # Estilos adicionales
│   │   └── index.css
│   ├── App.vue              # Componente principal
│   ├── main.ts              # Punto de entrada
│   └── style.css            # Estilos base
├── tailwind.config.js       # Configuración Tailwind
├── postcss.config.js        # Configuración PostCSS
└── package.json
```

## 🎨 Personalización

### Colores

Los colores se configuran en `public/config.json`:
- `primaryColor`: Color principal (botones, enlaces)
- `secondaryColor`: Color secundario (acentos)

### Fuentes

Las fuentes están configuradas en `src/style.css`:
- **Playfair Display**: Para títulos elegantes
- **Inter**: Para texto general

### Imágenes

Coloca las imágenes de los platos en la carpeta `public/` y referencia en `menu.json`:

```json
{
  "name": "Mi Plato",
  "image": "/mi-plato.jpg"
}
```

## 🔧 Funcionalidades Avanzadas

### Carrito de Compras

- ✅ Agregar/quitar items
- ✅ Contador de cantidad
- ✅ Total calculado automáticamente
- ✅ Persistencia en sesión
- ✅ Animaciones fluidas

### WhatsApp Integration

- ✅ Botón en cada plato
- ✅ Mensaje personalizable
- ✅ Envío de carrito completo
- ✅ Formato de mensaje optimizado

### QR Generator

- ✅ Genera QR del menú actual
- ✅ Descarga del código QR
- ✅ Función de compartir
- ✅ Personalizable

## 📱 Responsive Design

- ✅ **Mobile First**: Optimizado primero para móviles
- ✅ **Tablet**: Layout adaptado para tablets
- ✅ **Desktop**: Experiencia completa en escritorio
- ✅ **Touch Friendly**: Botones y elementos táctiles

## 🛠️ Stack Tecnológico

- **Vue 3** - Framework JavaScript progresivo
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide Vue** - Iconos modernos
- **QRCode.js** - Generación de códigos QR

## 📞 Soporte

Si necesitas ayuda con la personalización o tienes preguntas:

1. Revisa la documentación
2. Crea un issue en GitHub
3. Contacta al desarrollador

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos comerciales.

---

**¡Perfecto para restaurantes que quieren una presencia digital moderna y funcional!** 🚀
