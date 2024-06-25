// function Product(id, title, price, description, image) {
//   this.id = id;
//   this.title = title;
//   this.price = price;
//   this.description = description;
//   this.image = image;
// }

// // Fetch data from FakeStoreAPI and render products
// async function fetchProductsAndRender() {
 
//       const response = await fetch('https://fakestoreapi.com/products/');
//       const data = await response.json();

//       // Limit to first 20 products for simplicity
//       const products = data.slice(0, 20);

//       // Map through products and create Product objects
//       const productObjects = products.map(product => {
//           return new Product(product.id, product.title, product.price, product.description, product.image);
//       });

//       // Render products
//       renderProducts(productObjects);
 
// }

// // Function to render product cards in the main section
// function renderProducts(products) {
//   const mainSection = document.getElementById('main-section');
//   mainSection.innerHTML = ''; // Clear previous content

//   products.forEach(product => {
//       const card = document.createElement('div');
//       card.classList.add('card');
//       card.innerHTML = `
//       <img src="${product.image}" alt="${product.title}">
//           <h2>${product.title}</h2>
//           <p id="price">Price: $${product.price}</p>
//           <p>${product.description}</p>
          
//       `;
//       mainSection.appendChild(card);
//   });
// }

// // Call fetchProductsAndRender when the page loads
// window.onload = fetchProductsAndRender;
function FakeProduct(title, price, description, image) {
  this.Title = title;
  this.Price = price;
  this.Description = description;
  this.Image = image;
}

fetch("https://fakestoreapi.com/products")
.then((response) => response.json())
.then((json) => {

      const productsArray = json.map(item => new FakeProduct(item.title, item.price, item.description, item.image));



      console.log(productsArray);

      let a = document.getElementById("main-section"); 

      productsArray.forEach(ele => {
          let x = document.createElement("div");
              x.className = "card";
              let val =   `
              <img src="${ele.Image}" alt="${ele.Title}"style = width:500px;hight:500px; >
                  <h2>${ele.Title}</h2>
                  <p id="price">Price: ${ele.Price}</p>
                  <p>Description: ${ele.Description}</p>
                  `
                  ;
                  x.innerHTML = val;
                  a.appendChild(x);
              });

          })






