// ================================
// GLOBAL VARIABLES
// ================================

const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const messageDiv = document.getElementById("message");
const syncButton = document.getElementById("syncApi");

// Array to store products
let products = [];

// API URL (fake API)
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// ================================
// LOCAL STORAGE FUNCTIONS
// ================================

// Load products from Local Storage
function loadProducts() {
  const storedProducts = localStorage.getItem("products");
  if (storedProducts) {
    products = JSON.parse(storedProducts);
    renderProducts();
  }
}

// Save products to Local Storage
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// ================================
// DOM FUNCTIONS
// ================================

// Render product list
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.textContent = `${product.name} - $${product.price}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn btn-danger btn-sm";

    deleteButton.addEventListener("click", () => {
      deleteProduct(index);
    });

    li.appendChild(deleteButton);
    productList.appendChild(li);
  });
}

// Show messages
function showMessage(text, type) {
  messageDiv.innerHTML = `
    <div class="alert alert-${type}">
      ${text}
    </div>
  `;
}

// ================================
// CRUD LOCAL FUNCTIONS
// ================================

// Add product
function addProduct(name, price) {
  const newProduct = {
    name: name,
    price: price
  };

  products.push(newProduct);
  saveProducts();
  renderProducts();
}

// Delete product
function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
  renderProducts();
}

// ================================
// FORM EVENT
// ================================

productForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const productName = document.getElementById("productName").value.trim();
  const productPrice = document.getElementById("productPrice").value.trim();

  // Validation
  if (productName === "" || productPrice === "" || productPrice <= 0) {
    showMessage("Please enter valid product data", "danger");
    return;
  }

  addProduct(productName, productPrice);
  showMessage("Product added successfully", "success");

  productForm.reset();
});

// ================================
// FETCH API FUNCTIONS
// ================================

// GET
async function fetchProductsFromApi() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("GET response:", data.slice(0, 5));
  } catch (error) {
    console.error("GET error:", error);
  }
}

// POST
async function sendProductToApi(product) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    const data = await response.json();
    console.log("POST response:", data);
  } catch (error) {
    console.error("POST error:", error);
  }
}

// Sync button
syncButton.addEventListener("click", async () => {
  showMessage("Syncing with API... Check console", "info");

  await fetchProductsFromApi();

  if (products.length > 0) {
    await sendProductToApi(products[0]);
  }
});

// ================================
// INITIAL LOAD
// ================================

loadProducts();
