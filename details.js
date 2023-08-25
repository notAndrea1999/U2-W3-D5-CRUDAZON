const URL = "https://striveschool-api.herokuapp.com/api/product/";
const productId = new URLSearchParams(window.location.search).get("productId");
console.log(productId);

window.onload = async () => {
  try {
    const response = await fetch(URL + productId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
      },
    });

    const products = await response.json();
    console.log(products);

    const row = document.getElementById("row");
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
            <div class="card">
            <img src="${products.imageUrl}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${products.name}</h5>
              <p class="card-text">${products.description}</p>
              <p class="card-text">${products.brand}</p>
              <p class="card-text">${products.price}€</p>
              <a href="./backoffice.html?productId=${products._id}" class="btn btn-primary">Modifica Prodotto</a>
            </div>
            </div>`;

    row.appendChild(col);
  } catch (error) {
    console.log(error);
  }
};
