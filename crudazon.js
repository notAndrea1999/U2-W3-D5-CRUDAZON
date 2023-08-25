const URL = "https://striveschool-api.herokuapp.com/api/product/";

const getData = async () => {
  try {
    const response = await fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
      },
    });

    const products = await response.json();
    // console.log(products);

    const row = document.getElementById("row");
    row.innerText = "";

    products.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col";

      col.innerHTML = `
      <div class="card">
      <img src="${product.imageUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">${product.brand}</p>
        <p class="card-text">${product.price}€</p>
        <a href="./details.html?productId=${product._id}" class="btn btn-info">Scopri di più</a>
        <a href="./backoffice.html?productId=${product._id}" class="btn btn-success">Modifica ora</a>
      </div>
      </div>`;

      row.appendChild(col);
    });
  } catch (error) {
    console.log(error);
  }
};
getData();
