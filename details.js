const params = new URLSearchParams(window.location.search);

const productId = params.get("productId");
console.log("Resource id:", productId);

const URL = "https://striveschool-api.herokuapp.com/api/product/" + productId;

window.onload = () => {
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxOWY3YTRjNTllYzAwMTk5MGQ3MDUiLCJpYXQiOjE3MDkyODUyNDIsImV4cCI6MTcxMDQ5NDg0Mn0.2ag0uAfsD3-iJSnTOlbshY9Ht5CIovZwjH9g98oa6Vg",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);

      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel reperimento dati");
      }
    })
    .then((product) => {
      console.log(product, "products");
      console.log(product.name);
      const detailsContainer = document.getElementById("details-container");
      console.log(product);
      detailsContainer.innerHTML = `<div class="bg-body-secondary p-3 rounded border border-black"><div>
    <img
    width="500px"
    src="${product.imageUrl}"
    alt=""
    />
    </div>
    <div class="d-flex justify-content-between mx-3 mt-3">
    <h5>${product.name}</h5>
    <p>${product.price}</p>
    </div>
    <div class="mx-3">
    <p>${product.brand}</p>
    <p>${product.description}</p>
    </div></div>`;
    })
    .catch((error) => console.log(error));
};

const handleBtnClick = () => {
  window.location.assign("./backoffice.html?agendaId=" + productId);
};
