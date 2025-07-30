# DOCUMENTACIÓN BOOST AGENCY - ESTRUCTURA ACTUALIZADA

## ESTRUCTURA ORIGINAL GUARDADA (JUNIO 2024)

### HEADER - ESTRUCTURA ORIGINAL
- **Padding reducido**: `py-1 md:py-2 lg:py-3 xl:py-4 3xl:py-5`
- **Navegación visible en pantallas medianas**: `hidden lg:flex` (en lugar de `hidden xl:flex`)
- **Logo desplazado a la izquierda**: `-ml-2 md:-ml-3 lg:-ml-4 xl:-ml-5 3xl:-ml-6`
- **CTA Button**: 
  - Visible en pantallas medianas: `hidden lg:inline-flex`
  - Sin flecha, solo texto
  - Efecto hover: fondo transparente, borde naranja, sombra blanca con opacidad
  - Efecto click: fondo transparente, borde naranja, sombra blanca
- **Menú móvil**: `lg:hidden` (en lugar de `xl:hidden`)

### FOOTER - ESTRUCTURA ORIGINAL
- **Enlaces Rápidos**: 
  - Posición: Fila superior centrada para todas las pantallas
  - Título "Enlaces Rápidos" en primera fila
  - Enlaces en segunda fila: Inicio, Servicios, Planes, Fundación, BoostCast, Tienda, Futuro, Nosotros, Contacto
  - Diseño: `px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1 sm:py-1.5 md:py-2 lg:py-2 xl:py-3`
  - Tamaño texto: `text-[10px] sm:text-xs md:text-sm lg:text-xs xl:text-sm 3xl:text-base`
  - Efectos hover: `hover:bg-[#f05f02]/20 hover:border border-[#f05f02]/30 hover:shadow-lg hover:shadow-[#f05f02]/20 hover:-translate-y-1`

- **Línea Divisoria Naranja**: 
  - Posición: Debajo de enlaces rápidos
  - Color: `bg-[#f05f02]/10` (naranja 10% opacidad)
  - Espaciado: `my-2 md:my-3 lg:my-4 xl:my-5 3xl:my-6`

- **Grid Principal**: 
  - Estructura: `lg:grid-cols-2 xl:grid-cols-2`
  - Gap: `gap-8 md:gap-12 lg:gap-16 xl:gap-20 3xl:gap-24`

- **Columna 1 - Información de la empresa**:
  - Logo: `max-w-[100px] sm:max-w-[120px] lg:max-w-[140px] xl:max-w-[160px] 3xl:max-w-[180px]`
  - Descripción: `text-xs sm:text-sm lg:text-sm xl:text-xl 3xl:text-2xl`
  - Redes sociales: Iconos centrados, sin padding, tamaños `w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 xl:w-9 xl:h-9 3xl:w-10 3xl:h-10`

- **Columna 2 - Información de contacto**:
  - Posición: Alineada a la derecha (`lg:items-end text-center lg:text-right`)
  - Título "Contacto": Posicionado encima del primer icono, alineado a la izquierda (`lg:text-left self-start`)
  - Estructura: Grid de 2 columnas con gap reducido (`gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 3xl:gap-12`)
  - Icono de teléfono: Con margen superior para alineación (`mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16`)
  - Texto: `text-xs sm:text-sm lg:text-[10px] xl:text-lg 3xl:text-xl`

- **Sección Copyright**:
  - Espaciado reducido: `mt-0 pt-2 md:pt-3 lg:pt-4`
  - Línea divisoria: `border-t border-white/20`

### PÁGINA DE INICIO - ESTRUCTURA ORIGINAL
- **H1 Hero Principal**: 
  - Tamaño: `text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl`
  - Texto: "Make digital decisions for business growth."

- **Última Franja Antes del Footer**:
  - Sin padding vertical: `py-0`
  - Ancho completo: `w-full` (sin `max-w-[1800px]`)
  - Tamaño texto: `text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl`
  - Sin efectos: Solo color naranja simple (`text-[#f05f02]`)
  - Texto: "Ready to boost your business?"

## REGLAS IMPORTANTES
1. **NO ELIMINAR CONTENIDO**: La estructura actual debe mantenerse intacta
2. **NO CAMBIAR ESTRUCTURA**: Solo modificar estilos específicos cuando se solicite
3. **RESPONSIVIDAD**: Mantener todos los breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`, `3xl:`)
4. **COLORES**: Mantener la paleta naranja (`#f05f02`, `#d94f01`)
5. **ALINEACIONES**: Respetar las alineaciones establecidas en cada sección

## ÚLTIMA ACTUALIZACIÓN
- **Fecha**: Junio 2024
- **Estado**: Estructura final y estable
- **Notas**: Todos los elementos están optimizados y alineados correctamente