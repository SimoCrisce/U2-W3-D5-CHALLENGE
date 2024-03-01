function submitProduct(e) {
  e.preventDefault();
  const url = "https://striveschool-api.herokuapp.com/api/product/";
  const productName = document.getElementById("product-name");
  const description = document.getElementById("description");
  const brand = document.getElementById("brand");
  const imageUrl = document.getElementById("url");
  const pricing = document.getElementById("pricing");

  const addProduct = {
    name: productName.value,
    description: description.value,
    brand: brand.value,
    imageUrl: imageUrl.value,
    price: pricing.value,
  };
  console.log(addProduct);
  fetch(url, {
    method: "POST",
    body: JSON.stringify(addProduct),
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
    .then((addProduct) => {
      alert("Il prodotto è stato creato correttamente", addProduct);
    })
    .catch((error) => console.log(error));
}

const form = document.querySelector("form");
form.addEventListener("submit", submitProduct);
