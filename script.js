let cart = [];
const adminUsers = ["admin1", "admin2"]; // Replace with actual admin usernames

// Check if the user is an admin
function checkAdmin() {
    const currentUser = localStorage.getItem("username"); // Example authentication method
    if (adminUsers.includes(currentUser)) {
        document.getElementById("admin-add").style.display = "block";
    }
}

window.onload = checkAdmin;

function showAddProductForm() {
    document.getElementById("add-product-form").style.display = "block";
}

function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;

    if (!name || !price) {
        alert("Please enter a valid product name and price.");
        return;
    }

    // Generate a unique product ID
    const productId = Date.now();

    // Create product element
    const newProduct = document.createElement("div");
    newProduct.classList.add("product");
    newProduct.setAttribute("data-id", productId);
    newProduct.setAttribute("data-name", name);
    newProduct.setAttribute("data-price", price);
    newProduct.innerHTML = `
        <h2>${name}</h2>
        <p>Price: $${price}</p>
        <button onclick="addToCart(${productId})">Add to Cart</button>
    `;

    document.getElementById("products-list").appendChild(newProduct);
    document.getElementById("add-product-form").style.display = "none";

    alert(`${name} added to shop!`);
}

function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id="${productId}"]`);
    const name = productElement.getAttribute("data-name");
    const price = productElement.getAttribute("data-price");

    cart.push({ id: productId, name, price });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cart");
    cartList.innerHTML = "";
    cart.forEach((item, index) => {
        cartList.innerHTML += `<li>${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button></li>`;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    alert("Proceeding to checkout!");
}
