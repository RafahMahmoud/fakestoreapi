
function Product(id, title, price, description, image) {
  this.id = id;
  this.title = title;
  this.price = price;
  this.description = description;
  this.image = image;
}

// Fetch data from FakeStoreAPI and render products
async function fetchProductsAndRender() {
 
      const response = await fetch('https://fakestoreapi.com/products/');
      const data = await response.json();

      // Limit to first 20 products for simplicity
      const products = data.slice(0, 20);

      // Map through products and create Product objects
      const productObjects = products.map(product => {
          return new Product(product.id, product.title, product.price, product.description, product.image);
      });

      // Render products
      renderProducts(productObjects);
 
}

// Function to render product cards in the main section
function renderProducts(products) {
  const mainSection = document.getElementById('main-section');
  mainSection.innerHTML = ''; // Clear previous content

  products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p id="price">Price: $${product.price}</p>
          <p>${product.description}</p>
          
      `;
      mainSection.appendChild(card);
  });
}

// Call fetchProductsAndRender when the page loads
window.onload = fetchProductsAndRender;

// Initialize Firebase
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

const postForm = document.getElementById('post-form');
const postText = document.getElementById('post-text');
const postCards = document.getElementById('post-cards');

// Function to create a new post
const createPost = (postContent) => {
  app.collection('posts').add({
    content: postContent,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    postForm.reset(); // Clear the form
  })
  .catch(error => {
    console.error('Error adding document: ', error);
  });
};

// Function to render posts
const renderPosts = () => {
  postCards.innerHTML = ''; // Clear previous cards
  app.collection('posts').orderBy('timestamp', 'desc').get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const postData = doc.data();
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        postCard.innerHTML = `
          <p>${postData.content}</p>
          <div class="post-actions">
            <button class="delete" onclick="deletePost('${doc.id}')">Delete</button>
            <button class="update" onclick="updatePost('${doc.id}', '${postData.content}')">Update</button>
          </div>
        `;
        postCards.appendChild(postCard);
      });
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
    });
};

// Function to delete a post
const deletePost = (postId) => {
  db.collection('posts').doc(postId).delete()
    .then(() => {
      console.log('Document successfully deleted!');
      renderPosts(); // Refresh posts
    })
    .catch(error => {
      console.error('Error removing document: ', error);
    });
};

// Function to update a post
const updatePost = (postId, currentContent) => {
  const updatedContent = prompt('Update your post:', currentContent);
  if (updatedContent && updatedContent !== currentContent) {
    db.collection('posts').doc(postId).update({
      content: updatedContent
    })
    .then(() => {
      console.log('Document successfully updated!');
      renderPosts(); // Refresh posts
    })
    .catch(error => {
      console.error('Error updating document: ', error);
    });
  }
};

// Event listener for form submission
postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const content = postText.value.trim();
  if (content !== '') {
    createPost(content);
  }
});

// Initial render of posts
renderPosts();




