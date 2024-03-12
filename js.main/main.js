    var cart = JSON.parse(localStorage.getItem('cart')) || [];
    var cartTotal = 0;

    function addToCart(serviceName, servicePrice) {
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
        var cartItemsElement = document.getElementById('cartItems');
        cartItemsElement.innerHTML = '';

        // Agrega cada elemento del carrito a la lista
        cart.forEach(function(item, index) {
            var listItem = document.createElement('li');
            listItem.className = 'cartItem';
            listItem.textContent = item.name + ' - $' + item.price;

            // Agrega un botón para remover el ítem del carrito
            var removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.onclick = function() {
                removeFromCart(index);
            };

            listItem.appendChild(removeButton);
            cartItemsElement.appendChild(listItem);
        });
    }

    function updateCartTotal() {
        // Calcula el total del carrito
        cartTotal = cart.reduce(function(total, item) {
            return total + item.price;
        }, 0);

        // Actualiza el elemento HTML con el total
        document.getElementById('cartTotal').textContent = cartTotal;
    }

    function finalizarCompra() {
        // Verifica si el carrito está vacío
        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega servicios antes de finalizar la compra.');
            return; // Detiene la ejecución de la función si el carrito está vacío
        }

        // Construye el mensaje con la descripción de cada elemento del carrito
        var mensaje = 'Hola buen día, vengo del sitio Web de Trabajos en Mendoza. Me interesan los siguientes productos:' + ' ';
        cart.forEach(function(item) {
            mensaje += item.name + ' - $' + item.price + ' // ';
        });

        // Agrega el total al mensaje
        mensaje += ' Total: $' + cartTotal;

        // Encuentra y reemplaza los espacios con %20 para el formato correcto en la URL
        mensaje = mensaje.replace(/ /g, '%20');

        // Redirige a WhatsApp con el mensaje construido
        window.location.href = 'https://api.whatsapp.com/send?phone=+5492615022513&text=' + mensaje;
    }