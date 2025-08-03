// 🚀 Configuración de Stripe para BOOST SHOP
// Este archivo contiene toda la configuración necesaria para integrar Stripe

// ============================================================================
// CONFIGURACIÓN DE STRIPE
// ============================================================================

const STRIPE_CONFIG = {
  // 🔑 CLAVES DE API (REEMPLAZA CON TUS CLAVES REALES)
  publishableKey: 'pk_test_...', // Tu clave pública de Stripe
  secretKey: 'sk_test_...',      // Tu clave secreta de Stripe (solo backend)
  
  // 🌍 CONFIGURACIÓN REGIONAL
  currency: 'usd',               // Moneda principal
  locale: 'es',                  // Idioma del checkout
  
  // 🎨 PERSONALIZACIÓN
  brandName: 'BOOST SHOP',
  brandColor: '#f05f02',
  
  // 📧 CONFIGURACIÓN DE EMAILS
  successEmail: 'success@boostshop.com',
  supportEmail: 'support@boostshop.com',
  
  // 🔗 URLs DE REDIRECCIÓN
  successUrl: 'https://tudominio.com/tienda/success',
  cancelUrl: 'https://tudominio.com/tienda',
  
  // 💰 CONFIGURACIÓN DE IMPUESTOS
  taxRate: 0.19, // 19% IVA
  shippingCost: 0, // Envío gratuito
  
  // 🛡️ CONFIGURACIÓN DE SEGURIDAD
  webhookSecret: 'whsec_...', // Secreto del webhook
  requireAuth: true,
  
  // 📱 CONFIGURACIÓN MÓVIL
  allowRememberMe: true,
  billingAddressCollection: 'required',
  
  // 🎯 MÉTODOS DE PAGO
  paymentMethods: [
    'card',
    'ideal',
    'sofort',
    'bancontact',
    'giropay'
  ]
};

// ============================================================================
// FUNCIONES DE INTEGRACIÓN
// ============================================================================

// Función para crear sesión de Stripe Checkout
async function createStripeCheckoutSession(items, customerEmail = null) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: items,
        customerEmail: customerEmail,
        config: STRIPE_CONFIG
      })
    });

    const session = await response.json();
    return session;
  } catch (error) {
    console.error('Error creando sesión de Stripe:', error);
    throw error;
  }
}

// Función para redirigir a Stripe Checkout
function redirectToStripeCheckout(sessionId) {
  // Cargar Stripe.js
  const script = document.createElement('script');
  script.src = 'https://js.stripe.com/v3/';
  script.onload = () => {
    const stripe = Stripe(STRIPE_CONFIG.publishableKey);
    stripe.redirectToCheckout({
      sessionId: sessionId
    });
  };
  document.head.appendChild(script);
}

// Función para manejar webhooks
function handleStripeWebhook(event) {
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Pago completado:', event.data.object);
      // Aquí procesarías la orden completada
      break;
      
    case 'payment_intent.succeeded':
      console.log('Pago exitoso:', event.data.object);
      break;
      
    case 'payment_intent.payment_failed':
      console.log('Pago fallido:', event.data.object);
      break;
      
    default:
      console.log(`Evento no manejado: ${event.type}`);
  }
}

// ============================================================================
// CONFIGURACIÓN DEL BACKEND (Node.js/Express)
// ============================================================================

const BACKEND_CONFIG = {
  // Instalar dependencias:
  // npm install stripe express cors dotenv
  
  // Variables de entorno (.env):
  // STRIPE_SECRET_KEY=sk_test_...
  // STRIPE_PUBLISHABLE_KEY=pk_test_...
  // STRIPE_WEBHOOK_SECRET=whsec_...
  
  // Endpoints necesarios:
  endpoints: {
    createSession: '/api/create-checkout-session',
    webhook: '/api/webhook',
    success: '/api/success',
    cancel: '/api/cancel'
  }
};

// ============================================================================
// EJEMPLO DE USO
// ============================================================================

// Ejemplo de cómo usar en tu aplicación:
/*
// 1. Configurar Stripe
const stripe = new Stripe(STRIPE_CONFIG.secretKey);

// 2. Crear sesión de checkout
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price_data: {
        currency: STRIPE_CONFIG.currency,
        product_data: {
          name: 'Producto BOOST',
          images: ['https://tudominio.com/imagen.jpg'],
        },
        unit_amount: 2000, // $20.00 en centavos
      },
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: STRIPE_CONFIG.successUrl,
  cancel_url: STRIPE_CONFIG.cancelUrl,
});

// 3. Redirigir al usuario
redirectToStripeCheckout(session.id);
*/

// ============================================================================
// PASOS PARA IMPLEMENTAR
// ============================================================================

const IMPLEMENTATION_STEPS = [
  '1. Crear cuenta en Stripe.com',
  '2. Obtener claves de API (test y live)',
  '3. Configurar webhooks en el dashboard de Stripe',
  '4. Instalar dependencias: npm install @stripe/stripe-js',
  '5. Configurar backend con Node.js/Express',
  '6. Implementar endpoints de API',
  '7. Probar con tarjetas de test',
  '8. Cambiar a modo live para producción'
];

// ============================================================================
// TARJETAS DE PRUEBA
// ============================================================================

const TEST_CARDS = {
  success: '4242424242424242',
  decline: '4000000000000002',
  requiresAuth: '4000002500003155',
  insufficientFunds: '4000000000009995'
};

// ============================================================================
// EXPORTAR CONFIGURACIÓN
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    STRIPE_CONFIG,
    createStripeCheckoutSession,
    redirectToStripeCheckout,
    handleStripeWebhook,
    BACKEND_CONFIG,
    IMPLEMENTATION_STEPS,
    TEST_CARDS
  };
}

// Para uso en navegador
if (typeof window !== 'undefined') {
  window.STRIPE_CONFIG = STRIPE_CONFIG;
  window.createStripeCheckoutSession = createStripeCheckoutSession;
  window.redirectToStripeCheckout = redirectToStripeCheckout;
} 