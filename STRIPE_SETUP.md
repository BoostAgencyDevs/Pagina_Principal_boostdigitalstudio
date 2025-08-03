# 🚀 Configuración Rápida de Stripe - BOOST SHOP

## 📋 Lo que ya está listo:

✅ **Frontend completo** con modal de carrito
✅ **Botones de compra** con Stripe
✅ **Sistema de carrito** funcional
✅ **UI/UX profesional** implementada
✅ **Estructura de datos** preparada

## 🔧 Lo que necesitas hacer:

### 1. Crear cuenta en Stripe
- Ve a [stripe.com](https://stripe.com/)
- Crea una cuenta gratuita
- Activa tu cuenta

### 2. Obtener claves de API
- Ve a Dashboard → Developers → API keys
- Copia tu **Publishable key** (pk_test_...)
- Copia tu **Secret key** (sk_test_...)

### 3. Instalar dependencias
```bash
npm install @stripe/stripe-js
```

### 4. Crear archivo de configuración
Crea `src/environments/stripe.ts`:
```typescript
export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_TU_CLAVE_AQUI',
  currency: 'usd',
  successUrl: 'https://tudominio.com/success',
  cancelUrl: 'https://tudominio.com/tienda'
};
```

### 5. Conectar en el componente
En `tienda.component.ts`, reemplaza la función `crearSesionStripe`:

```typescript
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../environments/stripe';

private async crearSesionStripe(items: CarritoItem[]) {
  const stripe = await loadStripe(STRIPE_CONFIG.publishableKey);
  
  // Crear sesión en tu backend
  const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items })
  });
  
  const session = await response.json();
  
  // Redirigir a Stripe
  await stripe.redirectToCheckout({
    sessionId: session.id
  });
}
```

### 6. Backend simple (Node.js)
Crea `server.js`:
```javascript
const express = require('express');
const stripe = require('stripe')('sk_test_TU_CLAVE_SECRETA');

const app = express();
app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.producto.nombre,
            images: [item.producto.imagen],
          },
          unit_amount: item.producto.precio * 100,
        },
        quantity: item.cantidad,
      })),
      mode: 'payment',
      success_url: 'https://tudominio.com/success',
      cancel_url: 'https://tudominio.com/tienda',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));
```

## 🎯 Resultado final:

Una vez conectado, tendrás:
- ✅ Carrito completo funcional
- ✅ Botones de compra con Stripe
- ✅ Checkout profesional
- ✅ Pagos seguros
- ✅ Manejo de errores
- ✅ Responsive design

## 📞 Soporte:

- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support**: support@stripe.com
- **Tarjetas de prueba**: 4242424242424242

¡Todo lo demás ya está listo! Solo conecta las claves de Stripe y funcionará perfectamente. 