# 🍽️ Template Bar - Restaurant Menu Template

Una plantilla de menú de restaurante moderna, totalmente responsiva y altamente parametrizable construida con Vue 3, TypeScript, Vite y Tailwind CSS.

## ✨ Características Principales

### 🎨 Diseño & UI/UX
- **Diseño Responsivo Completo**: Optimizado para móviles, tablets y escritorio
- **Paleta de Colores Gastronómica**: Colores cálidos y atractivos específicamente elegidos para estimular el apetito
- **Tipografía Elegante**: Combinación de Playfair Display e Inter para un look profesional
- **Animaciones Suaves**: Efectos de hover, transiciones y animaciones CSS optimizadas
- **Componentes Interactivos**: Cards de menú, botones flotantes, sidebar del carrito

### 📱 Experiencia Móvil Mejorada
- **Navegación Móvil Intuitiva**: Menú hamburguesa con navegación suave
- **Botón de Carrito Flotante**: Acceso rápido al carrito en dispositivos móviles
- **Texto Responsive**: Tamaños de fuente que se adaptan automáticamente
- **Touch-Friendly**: Botones y elementos optimizados para pantallas táctiles
- **Performance Mobile**: Imágenes optimizadas y carga rápida

### 🛒 Sistema de Carrito Avanzado
- **Gestión de Estado Reactiva**: Carrito implementado con Vue Composition API
- **Persistencia Local**: Los elementos del carrito se mantienen entre sesiones
- **Cálculos Automáticos**: Total, subtotales e impuestos calculados automáticamente
- **Integración WhatsApp**: Envío directo de pedidos via WhatsApp

### ⚙️ Configuración Flexible
- **Sistema de Configuración JSON**: Todos los aspectos personalizables desde `config.json`
- **Colores Dinámicos**: Cambio de tema completo via variables CSS
- **Contenido Editable**: Fácil modificación de textos, imágenes y datos
- **Multi-idioma Ready**: Estructura preparada para internacionalización

## 🚀 Tecnologías Utilizadas

- **Vue 3** con Composition API
- **TypeScript** para type safety
- **Vite** para build tool y dev server
- **Tailwind CSS** para styling responsivo
- **Lucide Vue** para iconografía
- **QRCode.js** para generación de códigos QR

## 📋 Estructura del Proyecto

```
template-bar/
├── public/
│   ├── config.json          # Configuración principal del restaurante
│   ├── menu.json            # Datos del menú
│   └── assets/              # Imágenes y recursos estáticos
├── src/
│   ├── components/          # Componentes Vue reutilizables
│   │   ├── Navigation.vue   # Barra de navegación responsiva
│   │   ├── HelloWorld.vue   # Sección hero con parallax
│   │   ├── MenuSection.vue  # Sección principal del menú
│   │   ├── MenuCard.vue     # Tarjeta individual de producto
│   │   ├── CartSidebar.vue  # Sidebar del carrito de compras
│   │   ├── FloatingCartButton.vue # Botón flotante para móvil
│   │   ├── ContactForm.vue  # Formulario de contacto
│   │   ├── QRGenerator.vue  # Generador de códigos QR
│   │   └── WhatsAppButton.vue # Botón de WhatsApp
│   ├── composables/         # Lógica reutilizable
│   │   └── useCart.ts       # Gestión del carrito
│   ├── types/               # Definiciones TypeScript
│   │   └── index.ts         # Tipos e interfaces
│   ├── styles/
│   │   └── index.css        # Estilos base y responsive
│   ├── App.vue              # Componente principal
│   └── main.ts              # Entry point
├── tailwind.config.js       # Configuración de Tailwind
├── vite.config.ts          # Configuración de Vite
└── tsconfig.json           # Configuración de TypeScript
```

## 🎨 Sistema de Colores

La plantilla utiliza una paleta de colores específicamente optimizada para restaurantes:

- **Primario (Naranja Cálido)**: `#E88506` - Estimula el apetito
- **Secundario (Rojo Atractivo)**: `#DC2626` - Crea urgencia y atracción
- **Acento (Verde Fresco)**: `#16A34A` - Representa frescura e ingredientes naturales

## 📱 Características Responsivas

### Mobile-First Approach
- Grid systems que se adaptan: `grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`
- Tipografía responsiva: `text-lg md:text-xl lg:text-2xl`
- Espaciado adaptativo: `p-4 md:p-6 lg:p-8`
- Navegación móvil optimizada

### Breakpoints Utilizados
- **xs**: 475px - Extra small devices
- **sm**: 640px - Small devices (phones)
- **md**: 768px - Medium devices (tablets)
- **lg**: 1024px - Large devices (laptops)
- **xl**: 1280px - Extra large devices (desktops)
- **2xl**: 1536px - 2X large devices

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (v18 o superior)
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [repository-url]
cd template-bar

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

### Configuración Básica

1. **Editar configuración del restaurante** en `public/config.json`:
```json
{
  "restaurantName": "Tu Restaurante",
  "primaryColor": "#E88506",
  "phoneNumber": "+1234567890",
  "address": "Tu dirección",
  // ... más configuraciones
}
```

2. **Personalizar el menú** en `public/menu.json`:
```json
[
  {
    "category": "Entradas",
    "icon": "🥗",
    "items": [
      {
        "name": "Tu Plato",
        "price": 12.99,
        "description": "Descripción del plato",
        // ... más propiedades
      }
    ]
  }
]
```

## 🎯 Personalización Avanzada

### Cambiar Colores del Tema
Modifica las variables CSS en `src/style.css`:
```css
:root {
  --color-primary: #E88506;
  --color-secondary: #DC2626;
  --color-accent: #16A34A;
}
```

### Añadir Nuevas Secciones
1. Crear componente en `src/components/`
2. Importar en `App.vue`
3. Añadir al template con la navegación correspondiente

### Configurar WhatsApp
```json
{
  "phoneNumber": "+593987654321",
  "whatsappMessage": "¡Hola! Quiero hacer un pedido:"
}
```

## 📊 Performance y SEO

- **Lazy Loading**: Imágenes cargadas bajo demanda
- **Code Splitting**: Chunks optimizados por Vite
- **CSS Purging**: Tailwind elimina CSS no utilizado
- **Meta Tags**: SEO configurado via `config.json`
- **Mobile-First**: Optimizado para Core Web Vitals

## 🌍 Despliegue

### Vercel (Recomendado)
```bash
npm run build
# Subir carpeta dist/ a Vercel
```

### Netlify
```bash
npm run build
# Deploy carpeta dist/
```

### Servidor Propio
```bash
npm run build
# Servir carpeta dist/ con nginx/apache
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una feature branch (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la branch (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🎉 Características Próximas

- [ ] Modo oscuro
- [ ] Multi-idioma completo
- [ ] Integración con sistemas de pago
- [ ] Panel de administración
- [ ] Analytics integrado
- [ ] PWA (Progressive Web App)
- [ ] Reservas online

---

**Hecho con ❤️ para restaurantes que quieren destacar online**
