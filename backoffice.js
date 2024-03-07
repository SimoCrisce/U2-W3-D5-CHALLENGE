const productId = new URLSearchParams(window.location.search).get("productId");
const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";
const method = productId ? "PUT" : "POST";
console.log(productId);
function submitProduct(e) {
  e.preventDefault();

  const productName = document.getElementById("product-name");
  const description = document.getElementById("description");
  const brand = document.getElementById("brand");
  const imageUrl = document.getElementById("url");
  const pricing = document.getElementById("pricing");

  const addOrEditProduct = {
    name: productName.value,
    description: description.value,
    brand: brand.value,
    imageUrl: imageUrl.value,
    price: pricing.value,
  };
  console.log(addOrEditProduct);
  fetch(URL, {
    method,
    body: JSON.stringify(addOrEditProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWY3YTRjNTllYzAwMTk5MGQ3MDUiLCJpYXQiOjE3MDkyODUyNDIsImV4cCI6MTcxMDQ5NDg0Mn0.2ag0uAfsD3-iJSnTOlbshY9Ht5CIovZwjH9g98oa6Vg",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel ricevimento dei dati backoffice");
      }
    })
    .then((addOrEditProduct) => {
      if (productId) {
        alert("Il prodotto con id: " + addOrEditProduct._id + " è stato modificato correttamente");
      } else {
        alert("Il prodotto con id: " + addOrEditProduct._id + " è stato creato correttamente");
        e.target.reset();
      }
    })
    .catch((error) => console.log(error));
}

const handleDelete = () => {
  const confirmed = confirm("Sei sicuro di voler eliminare?");

  if (confirmed) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWY3YTRjNTllYzAwMTk5MGQ3MDUiLCJpYXQiOjE3MDkyODUyNDIsImV4cCI6MTcxMDQ5NDg0Mn0.2ag0uAfsD3-iJSnTOlbshY9Ht5CIovZwjH9g98oa6Vg",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((deletedProduct) => {
        alert(deletedProduct.name + " è stato eliminato");

        window.location.assign("./index.html");
      });
  } else {
    alert("Il prodotto non è stato eliminato");
  }
};

const handleReset = () => {
  document.getElementById("product-name").value = "";
  document.getElementById("description").value = "";
  document.getElementById("brand").value = "";
  document.getElementById("url").value = "";
  document.getElementById("pricing").value = "";
};

window.onload = () => {
  const submitBtn = document.querySelector("button[type='submit']");
  const deleteBtn = document.getElementById("delete-button");

  if (productId) {
    submitBtn.innerText = "Modifica prodotto";
    submitBtn.classList.add("btn-success");
    deleteBtn.classList.remove("d-none");

    fetch(URL, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWY3YTRjNTllYzAwMTk5MGQ3MDUiLCJpYXQiOjE3MDkyODUyNDIsImV4cCI6MTcxMDQ5NDg0Mn0.2ag0uAfsD3-iJSnTOlbshY9Ht5CIovZwjH9g98oa6Vg",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nel reperimento dei dati");
        }
      })
      .then((product) => {
        document.getElementById("product-name").value = product.name;
        document.getElementById("description").value = product.description;
        document.getElementById("brand").value = product.brand;
        document.getElementById("url").value = product.imageUrl;
        document.getElementById("pricing").value = product.price;
      })
      .catch((error) => console.log(error));
  } else {
    submitBtn.innerText = "Aggiungi prodotto";
    submitBtn.classList.add("btn-primary");
  }
};
