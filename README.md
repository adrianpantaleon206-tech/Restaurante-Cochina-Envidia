Cochina Envidia — Restaurante & Bar
Página web responsive para Cochina Envidia, un restaurante y bar con menú digital, navegación por pestañas, tarjetas de productos, contacto y enlaces directos a WhatsApp y Google Maps.
Vista general
El proyecto está construido con tecnologías web básicas:
•	HTML5 para la estructura.
•	CSS3 integrado para el diseño visual y responsive.
•	JavaScript vanilla para la navegación y las interacciones.
•	Google Fonts para la tipografía.
•	Font Awesome para los iconos.
•	Imágenes externas cargadas mediante URLs.
Funcionalidades
•	Encabezado con nombre y categoría del restaurante.
•	Navegación entre las secciones:
o	Menú & Cocina.
o	¿Qué es Cochina Envidia?
o	Contacto y Ubicación.
•	Menú dividido en:
o	Especialidades de la casa.
o	Barra y licores.
•	Tarjetas de productos con:
o	Imagen.
o	Nombre.
o	Descripción.
o	Precio.
o	Botón para agregar al carrito.
•	Mensaje de confirmación al seleccionar un producto.
•	Diseño adaptable para computadoras, tabletas y teléfonos.
•	Enlace directo a WhatsApp.
•	Enlace de correo electrónico.
•	Enlace a Google Maps.
•	Efectos visuales al pasar el cursor sobre las tarjetas.
Estructura del proyecto
cochina-envidia/
└── cochina-envidia-ordenado.html

Actualmente, el CSS y el JavaScript están incluidos dentro del archivo HTML para facilitar la ejecución del proyecto.
Una estructura más escalable podría ser:
cochina-envidia/
├── index.html
├── css/
│   └── estilos.css
├── js/
│   └── app.js
└── imagenes/
    ├── porkbelly.jpg
    ├── arepa-reina-pepiada.jpg
    ├── hamburguesa.jpg
    ├── ron-santa-teresa.jpg
    └── whisky-old-parr.jpg

Instalación y ejecución
No necesitas instalar dependencias ni utilizar un servidor para probar la versión actual.
1.	Descarga el archivo cochina-envidia-ordenado.html.
2.	Renómbralo como index.html si deseas utilizarlo como página principal.
3.	Ábrelo con Google Chrome, Firefox, Microsoft Edge o cualquier navegador moderno.
4.	Verifica que tengas conexión a Internet para cargar las fuentes, los iconos y las imágenes externas.
También puedes abrir el proyecto usando Visual Studio Code y la extensión Live Server:
1.	Abre la carpeta del proyecto en Visual Studio Code.
2.	Instala la extensión Live Server.
3.	Haz clic derecho sobre index.html.
4.	Selecciona Open with Live Server.
Personalización
Cambiar el nombre del restaurante
Busca en el HTML:
<h1>Cochina Envidia</h1>

Y reemplázalo por el nombre que quieras mostrar.
Cambiar un producto
Cada producto está dentro de un elemento como este:
<article class="menu-card">

Dentro puedes modificar el nombre, la descripción, la imagen y el precio:
<h3>Nombre del producto</h3>
<p>Descripción del producto.</p>
<span class="price-tag">$10.00</span>

Cambiar una imagen
Modifica el valor de src:
<img
  src="https://ejemplo.com/imagen.jpg"
  alt="Descripción de la imagen"
>

El texto de alt debe describir correctamente la imagen para mejorar la accesibilidad.
Cambiar colores
Los colores principales están definidos al principio del CSS:
:root {
  --primary-orange: #f97316;
  --dark-orange: #c2410c;
  --light-orange: #ffedd5;
  --text-dark: #1e293b;
}

Puedes cambiar estos valores para adaptar la página a la identidad visual del restaurante.
Cambiar los datos de contacto
Actualiza el teléfono de WhatsApp:
<a href="https://wa.me/584221454341">

Actualiza el correo:
<a href="mailto:cochinaenvidia@gmail.com">

Actualiza la dirección y el enlace de Google Maps dentro de la sección de contacto.
Funcionamiento del carrito
En la versión actual, el botón Agregar al Carrito muestra un mensaje de confirmación mediante JavaScript:
alert(`${productName} fue agregado al carrito.`);

Esto es una demostración visual. Todavía no guarda productos, cantidades ni total de compra.
Para convertirlo en un carrito real sería necesario agregar:
•	Una lista de productos seleccionados.
•	Cantidades por producto.
•	Cálculo del total.
•	Botones para eliminar productos.
•	Persistencia con localStorage.
•	Un formulario de datos del cliente.
•	Envío del pedido a un backend o a WhatsApp.
Imágenes externas
Las imágenes actuales se cargan desde servicios externos. Esto significa que necesitan conexión a Internet y que el proveedor externo puede modificar o bloquear sus enlaces.
Para producción, es recomendable descargar imágenes con autorización y guardarlas localmente:
<img src="imagenes/porkbelly.jpg" alt="Porkbelly con guacamole">

No utilices imágenes protegidas por derechos de autor sin contar con permiso o licencia.
Accesibilidad
El proyecto incluye varias buenas prácticas:
•	Atributo lang="es" en el documento.
•	Uso de alt en las imágenes.
•	Elementos semánticos como header, main, section, article y footer.
•	Botones reales para las acciones.
•	Enlaces descriptivos para WhatsApp, correo y mapas.
Como mejora futura, puedes añadir estados de foco visibles para navegación mediante teclado y mensajes accesibles para lectores de pantalla.
Compatibilidad
El sitio funciona en navegadores modernos que soporten:
•	HTML5.
•	CSS Grid.
•	CSS Flexbox.
•	JavaScript moderno.
•	querySelector y addEventListener.
Mejoras recomendadas
•	Separar HTML, CSS y JavaScript en archivos independientes.
•	Crear un carrito funcional.
•	Guardar el carrito en localStorage.
•	Añadir cantidades y total de compra.
•	Conectar el formulario con WhatsApp.
•	Optimizar y alojar las imágenes localmente.
•	Añadir validación de formularios.
•	Incorporar un backend para administrar pedidos.
•	Agregar información sobre horarios y métodos de pago.
•	Implementar SEO con descripción, favicon y etiquetas Open Graph.
Autoría
•	Proyecto: Cochina Envidia — Restaurante & Bar.
•	Desarrollado por: Adrian Pantaleon.
•	Interfaz organizada y optimizada para una experiencia responsive.
Licencia
Este proyecto puede utilizarse como base para fines personales o comerciales. Antes de publicar la página, verifica las licencias de las imágenes, fuentes, iconos y demás recursos externos utilizados.
