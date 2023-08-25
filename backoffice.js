const productId = new URLSearchParams(window.location.search).get("productId");
const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

const handleSubmit = async (event) => {
  event.preventDefault();
  const myProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("img").value,
    price: parseInt(document.getElementById("price").value),
  };

  try {
    const response = await fetch(URL, {
      method: productId ? "PUT" : "POST",
      body: JSON.stringify(myProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
      },
    });
    if (response.ok) {
      const response = await fetch(URL, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
        },
      });
      const product = await response.json();

      if (productId) {
        alert("Il prodotto con id " + product._id + " e' stato modificato.");
      } else {
        console.log(product._id);
        alert("Il prodotto con id " + product._id + " e' stato creato con successo.");
        document.getElementById("name").value = "";
        document.getElementById("description").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("price").value = "";
        document.getElementById("img").value = "";
      }
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = async () => {
  const mainBtn = document.getElementById("mainBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const resetBtn = document.getElementById("fieldReset");
  deleteBtn.onclick = handleDelete;
  resetBtn.onclick = resetFields;
  if (productId) {
    const response = await fetch(URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
      },
    });

    if (response.ok) {
      const { name, description, brand, imageUrl, price } = await response.json();

      document.getElementById("name").value = name;
      document.getElementById("description").value = description;
      document.getElementById("brand").value = brand;
      document.getElementById("price").value = price;
      document.getElementById("img").value = imageUrl;

      mainBtn.innerText = "Modifica Prodotto";
      mainBtn.className = "btn btn-primary bg-success border border-none me-auto";
      deleteBtn.classList.remove("d-none");
    }
  }
};

const handleDelete = async () => {
  const control = confirm("Stai per eliminare il prodotto. Vuoi procedere?");
  if (control) {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTdjMWMwMzRmZjAwMTQwM2Y0ZjEiLCJpYXQiOjE2OTI5NDg0MTcsImV4cCI6MTY5NDE1ODAxN30.EQWch_R8eD87k-4LsVV7Iq-_7aJGPswBBj-VuMTqVuE",
      },
    });
    const product = await response.json();
    alert("Hai eliminato il prodotto con nome " + product.name + " e con id: " + product._id);
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("price").value = "";
    document.getElementById("img").value = "";
  } else {
    alert("Operazione annullata con successo");
  }
};

const resetFields = () => {
  document.getElementById("name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("price").value = "";
  document.getElementById("img").value = "";
};
