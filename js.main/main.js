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

    function finalizarCompra() {
        cart.length === 0 ?
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "El carrito está vacío!",
                footer: 'Agrega productos para comprar'
            }) :
            (function() {
                let mensaje = 'Hola buen día, vengo del sitio Web de Trabajos en Mendoza. Me interesan los siguientes productos:' + ' ';
                cart.forEach(function(item) { mensaje += item.name + ' - $' + item.price + ' // '; });
                mensaje += ' Total: $' + cartTotal;
                mensaje = mensaje.replace(/ /g, '%20');
                window.location.href = 'https://api.whatsapp.com/send?phone=+5492615022513&text=' + mensaje;
            })();
    }