// Conectar a la página
console.log("¡Conectado a Google Store!");

// Variable para el contador del carrito
let cartCount = 0;

// Función para actualizar el contador en pantalla
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Función para añadir al carrito
function addToCart() {
    cartCount++; // Suma 1 al contador
    updateCartCount(); // Actualiza el número en pantalla
    alert("¡Producto añadido al carrito! Ahora tienes " + cartCount + " artículos.");
}

// Conectar el botón "Add to cart" al hacer clic
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.querySelector('button'); // Busca el botón "Add to cart"
    if (addButton) {
        addButton.addEventListener('click', addToCart);
    }
    updateCartCount(); // Muestra 0 al inicio
});

// Mensaje de bienvenida (simplificado)
function showWelcomeMessage() {
    alert("¡Bienvenidx a Google Store! Desde nuestro departamento de marketing, las coders encargadas de hacer de esta página y de los productos que contiene un lugar accesible para todas las personas, hemos querido faciliaros queridos clientes, la siguiente información: haciendo click en cada producto, se puede visualizar cada producto, y clickando en la pestaña add to cart, aparece un mensaje de que se ha añadido una unidad del producto al carrito. Para recibir orientación más individualizada acerca de las compras online en nuestra página web, recibir información acerca de nuestros productos de gran calidad o sobre las condiciones de envio, así como, tramitar cualquier queja, duda o sugertencia llame al teléfono 91-748-6400 y una persona cualificada le responderá al momento y le proporcionará la informacíon que necesita. Atención disponible 24 horas. Gracias por su atención. Saludos, atentamente. Fem Coders Google Camp");
}
showWelcomeMessage();