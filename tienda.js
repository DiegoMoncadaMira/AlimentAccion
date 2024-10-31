let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');


const products = [
    { id: 1, name: "Kit de Mancuernas", price: 180000, image: "img/Mancuerna1.jpg", description: "Conjunto de mancuernas de alta calidad, perfectas para rutinas de entrenamiento en casa. Diseñadas para mejorar tu fuerza y tonificación muscular. Incluye diferentes pesos para ajustarse a cualquier nivel de ejercicio.", stock: 13 },
    { id: 2, name: "Proteina Alpha Foods", price: 40000, image: "img/Proteina2.jpg", description: "Proteína vegetal de alta calidad, ideal para veganos y personas que buscan una opción natural y saludable para complementar su nutrición. Rica en aminoácidos esenciales y fácil de digerir.", stock: 6 },
    { id: 3, name: "Proteina HSN", price: 82300, image: "img/Proteinahsn.jpg", description: "Suplemento de proteína de suero con un alto contenido en aminoácidos y bajo en grasas. Perfecto para quienes buscan aumentar su masa muscular y recuperarse después de entrenamientos intensos.", stock: 5 },
    { id: 4, name: "Camisa Deportiva", price: 40000, image: "img/Camisa.jpg", description: "Camiseta deportiva ligera y transpirable, diseñada para mantenerte cómodo durante cualquier tipo de actividad física. Fabricada con materiales de secado rápido y ajuste ergonómico.", stock: 9 },
    { id: 5, name: "Rodillo para Abdominales", price: 130000, image: "img/Rodillo.jpg", description: "Herramienta compacta y eficaz para tonificar y fortalecer los músculos abdominales. Perfecta para entrenamientos en casa o en el gimnasio, y fácil de transportar.", stock: 7 },
    { id: 6, name: "Caminadora", price: 727900, image: "img/Caminadora.jpg", description: "Caminadora eléctrica plegable, ideal para ejercicios cardiovasculares en casa. Cuenta con varios niveles de velocidad y una pantalla para monitorear tu progreso.", stock: 5 },
    { id: 7, name: "Shorts Adidas", price: 140000, image: "img/Shorts.jpg", description: "Shorts deportivos ligeros y cómodos, diseñados con la tecnología Climalite que expulsa el sudor de tu cuerpo para mantenerte fresco y seco. Perfectos para entrenamientos o uso casual.", stock: 8 },
    { id: 8, name: "Proteina Muscletech", price: 178000, image: "img/Proteina.jfif", description: "Suplemento de proteína avanzada para el desarrollo muscular. Contiene una mezcla de proteínas de rápida digestión y aminoácidos esenciales, ideal para maximizar la recuperación después de entrenamientos intensos.", stock: 4 },
    { id: 9, name: "Proteina Life Pro Nutrition", price: 135000, image: "img/Proteinalife.jpg", description: "Proteína aislada de alta pureza, libre de lactosa y baja en carbohidratos. Ideal para quienes buscan mejorar su composición corporal y aumentar su masa muscular sin grasas añadidas.", stock: 6 },
    { id: 10, name: "Botella Hombre", price: 20000, image: "img/Botellahombre.png", description: "Botella deportiva con diseño ergonómico y tapa anti-derrames. Ideal para mantenerte hidratado durante tus entrenamientos o actividades diarias, con capacidad suficiente para largos periodos de uso.", stock: 12 },
    { id: 11, name: "Botella Mujer", price: 41500, image: "img/Botellamujer.jfif", description: "Botella de agua diseñada especialmente para mujeres activas. Con un diseño atractivo y fácil de transportar, cuenta con tapa a prueba de fugas y marcadores de hidratación para seguir tu consumo de agua diario.", stock: 10 },
    { id: 12, name: "Banco de Peso", price: 999999, image: "img/Bancodepeso.jpg", description: "Banco de entrenamiento ajustable, ideal para ejercicios de fuerza y levantamiento de pesas. Fabricado con materiales robustos, soporta altas cargas de peso y permite realizar una variedad de ejercicios.", stock: 3 }
];


function formatCurrency(value) {
    return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} COP`;
}


const productList = document.getElementById('product-list');
products.forEach(product => {
    productList.innerHTML += `
        <div class="food-1" data-id="${product.id}">
            <div class="food-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="food-txt">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>${formatCurrency(product.price)}</span>
                <p>Disponible: <span id="stock-${product.id}">${product.stock}</span></p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                <p id="out-of-stock-${product.id}" class="out-of-stock" style="display: none;">¡Producto agotado!</p>
            </div>
        </div>
    `;
});


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product.stock > 0) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1; 
        } else {
            cart.push({ ...product, quantity: 1 }); 
        }
        product.stock -= 1; 
        updateCart(); 
        document.getElementById(`stock-${product.id}`).textContent = product.stock; 

       
        if (product.stock === 0) {
            document.getElementById(`out-of-stock-${product.id}`).style.display = 'block';
        }
    }
}


function updateCart() {
    cartCountElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0); 
    cartItemsElement.innerHTML = ''; 
    let total = 0;

    
    cart.forEach((item, index) => {
        cartItemsElement.innerHTML += `
            <div class="cart-item">
                <span>${item.name} (x${item.quantity}) = ${formatCurrency(item.price * item.quantity)}</span>
                <button class="remove-from-cart" onclick="removeFromCart(${index})">Eliminar Uno</button>
                <button class="remove-all-from-cart" onclick="removeAllFromCart(${item.id})">Eliminar Todo</button>
            </div>
        `;
        total += item.price * item.quantity; 
    });

    cartTotalElement.textContent = `Total: ${formatCurrency(total)}`; 
}


function removeFromCart(index) {
    const item = cart[index];
    const product = products.find(p => p.id === item.id);
    product.stock += 1; 
    item.quantity -= 1; 

    if (item.quantity === 0) {
        cart.splice(index, 1); 
    }
    
    updateCart(); 
    document.getElementById(`stock-${product.id}`).textContent = product.stock; 
    document.getElementById(`out-of-stock-${product.id}`).style.display = product.stock === 0 ? 'block' : 'none'; 
}


function removeAllFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        const product = products.find(p => p.id === item.id);
        product.stock += item.quantity; 
        cart.splice(itemIndex, 1);
        updateCart(); 
        document.getElementById(`stock-${product.id}`).textContent = product.stock; 
        document.getElementById(`out-of-stock-${product.id}`).style.display = product.stock === 0 ? 'block' : 'none'; 
    }
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product.stock > 0) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1; 
        } else {
            cart.push({ ...product, quantity: 1 }); 
        }
        product.stock -= 1; 
        updateCart(); 
        document.getElementById(`stock-${product.id}`).textContent = product.stock;

        
        const warningElement = document.getElementById("no-products-warning");
        if (warningElement) {
            warningElement.style.display = "none";
        }

        
        if (product.stock === 0) {
            document.getElementById(`out-of-stock-${product.id}`).style.display = 'block';
        }
    }
}


btn.onclick = function () {
    const warningElement = document.getElementById("no-products-warning");

    if (cart.length === 0) {
        warningElement.style.display = "block";
        warningElement.textContent = "No hay productos en el carrito para pagar.";
    } else {
        warningElement.style.display = "none"; 
        modal.style.display = "flex"; 
        modal.classList.add('show'); 
    }
};


span.onclick = function () {
    modal.style.display = "none"; 
}


window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"; 
    }
}






