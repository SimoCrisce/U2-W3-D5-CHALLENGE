const url = "https://striveschool-api.herokuapp.com/api/product/";

fetch(url, {
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
      throw new Error("Errore nel ricevimento dei dati");
    }
  })
  .then((products) => {
    console.log(products, "products");
    const containerCard = document.querySelector(".album .row");
    products.forEach((product) => {
      const card = document.createElement("div");
      containerCard.appendChild(card);
      card.classList.add("col-md-4");
      card.innerHTML = `<div class="card mb-4 shadow-sm" id="card">
      <img src="${product.imageUrl}" class="bd-placeholder-img card-img-top" />
      <div class="card-body">
        <div class="d-flex justify-content-between">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">€${product.price}</p>
        </div>
            <p class="card-text">
        ${product.description}
        </p>
            <a href="./details.html?productId=${product._id}" class="text-decoration-none">Dettagli</a>
        </div>
      </div>
    </div>`;
    });
  })
  .catch((error) => console.log(error));
