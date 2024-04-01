// CARDS DINAMICAS


// Función para crear una card
function createCard(servicio, descripcion, precio, imagen) {
    // Crear elementos HTML
    let cardDiv = document.createElement('div');
    cardDiv.className = 'card-precios';

    let imgDiv = document.createElement('div');
    imgDiv.className = 'centrar-textos';
    let img = document.createElement('img');
    img.src = imagen;
    img.alt = 'imagen-servicio';
    img.title = 'imagen-servicio';
    imgDiv.appendChild(img);

    let titleH3 = document.createElement('h3');
    titleH3.className = 'centrar-textos espacio-textos';
    titleH3.textContent = servicio;

    let descriptionH4 = document.createElement('h4');
    descriptionH4.className = 'centrar-textos';
    descriptionH4.textContent = descripcion;

    let priceH3 = document.createElement('h3');
    priceH3.className = 'centrar-textos';
    priceH3.textContent = '$' + precio;

    let buttonDiv = document.createElement('div');
    buttonDiv.className = 'boton-azul';
    let addButtonH4 = document.createElement('h4');
    addButtonH4.textContent = 'Agregar al Carrito';

    // Agregar evento click al botón
    cardDiv.onclick = function() {
        addToCart(servicio, precio);
    };

    // Adjuntar elementos al contenedor principal
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(titleH3);
    cardDiv.appendChild(descriptionH4);
    cardDiv.appendChild(priceH3);
    buttonDiv.appendChild(addButtonH4);
    cardDiv.appendChild(buttonDiv);

    return cardDiv;
}

// Función para agregar la card al contenedor
function addCardToContainer(container, card) {
    container.appendChild(card);
}

// Obtener el contenedor de las cards
let cardContainer3 = document.getElementById('cardContainer3');

// Cargar el archivo JSON
fetch('../db/db.json')
    .then(response => response.json())
    .then(data => {
        // Obtener los datos de la página 3
        let datosPagina3 = data.pagina3;

        // Crear las cards dinámicamente con los datos de la página 3
        datosPagina3.forEach(item => {
            let nuevaCard = createCard(item.servicio, item.descripcion, item.precio, item.imagen);
            addCardToContainer(cardContainer3, nuevaCard);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));





//codigo viejo

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartTotal = 0;

function addToCart(serviceName, servicePrice) {
    Toastify({
        text: "Servicio Agregado",
        duration: 3000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "info",
        style: {
            background: "#007994",
        },
        onClick: function() {} // Callback after click
    }).showToast();

    // Agrega el servicio al carrito
    cart.push({
        name: serviceName,
        price: servicePrice
    });

    // Guarda el carrito en el Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualiza la lista en el carrito
    updateCartUI();

    // Actualiza el total del carrito
    updateCartTotal();
}



function removeFromCart(index) {
    // Remueve el elemento del carrito basado en el índice
    cart.splice(index, 1);

    // Guarda el carrito actualizado en el Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualiza la lista en el carrito
    updateCartUI();

    // Actualiza el total del carrito
    updateCartTotal();
}

function updateCartUI() {
    let cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';

    // Agrega cada elemento del carrito a la lista
    cart.forEach(function(item, index) {
        let listItem = document.createElement('li');
        listItem.className = 'cartItem';
        listItem.textContent = item.name + ' - $' + item.price;

        // Agrega un botón para remover el ítem del carrito
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = function() {
            removeFromCart(index);
        };

        listItem.appendChild(removeButton);
        cartItemsElement.appendChild(listItem);
    });
}

function updateCartTotal() {
    // Recupera el total del carrito del Local Storage, si está disponible
    let storedCartTotal = JSON.parse(localStorage.getItem('cartTotal'));

    // Si hay un total almacenado en el Local Storage, lo muestra
    if (storedCartTotal !== null) {
        cartTotal = storedCartTotal;
    } else {
        // Calcula el total del carrito solo si hay elementos en él
        if (cart.length > 0) {
            cartTotal = cart.reduce(function(total, item) {
                return total + item.price;
            }, 0);
        }
    }

    // Actualiza el elemento HTML con el total
    document.getElementById('cartTotal').textContent = cartTotal;
}
window.onload = function() {
    updateCartTotal();
    updateCartUI();
};

function vaciarCarrito() {
    // Vaciar el arreglo del carrito
    cart = [];

    // Guardar el carrito vacío en el Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Actualizar la interfaz de usuario para reflejar que el carrito está vacío
    updateCartUI();

    // Actualizar el total del carrito para mostrar que el total es $0
    updateCartTotal();
}


function finalizarCompra() {
    if (cart.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "El carrito está vacío!",
            footer: 'Agrega productos para comprar'
        });
    } else {
        let mensaje = 'Hola buen día, vengo del sitio Web de Trabajos en Mendoza. Me interesan los siguientes productos:' + ' ';
        cart.forEach(function(item) { mensaje += item.name + ' - $' + item.price + ' // '; });
        mensaje += ' Total: $' + cartTotal;
        mensaje = mensaje.replace(/ /g, '%20');
        window.open('https://api.whatsapp.com/send?phone=+5492615022513&text=' + mensaje, '_blank');

        // Vaciar el carrito después de finalizar la compra
        vaciarCarrito();    
    }
}