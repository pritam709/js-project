let btn = document.getElementById("btn");
let sp = document.getElementById("sp");
let prodName = document.getElementById("prodName");
let myList = document.getElementById("myList");
function totalAmount() {
  let amount = 0;
  axios
    .get("https://crudcrud.com/api/9cd82f215880439189b8bcda461086d5/products")
    .then((response) => {
      const array = response.data;
      for (let i = 0; i < array.length; i++) {
        amount += parseFloat(array[i].sellingPrice);
      }

      console.log(amount);

      document.getElementById("total").innerHTML = amount;
    });
}

btn.addEventListener("click", () => {
  axios
    .post(
      "https://crudcrud.com/api/9cd82f215880439189b8bcda461086d5/products",
      {
        sellingPrice: sp.value,
        productName: prodName.value,
      }
    )
    .then((response) => {
      location.reload();
    })
    .catch((err) => console.log(err));
});

window.addEventListener("DOMContentLoaded", () => {
  limaker();
});

function limaker() {
  axios
    .get("https://crudcrud.com/api/9cd82f215880439189b8bcda461086d5/products")
    .then((response) => {
      const array = response.data;
      for (let i = 0; i < array.length; i++) {
        const li = document.createElement("li");

        const delbtn = document.createElement("button");
        delbtn.innerHTML = "Delete Product";
        delbtn.addEventListener("click", () => {
          id = array[i]._id;
          axios
            .delete(
              "https://crudcrud.com/api/9cd82f215880439189b8bcda461086d5/products/" +
                id
            )
            .then((response) => {
              location.reload();
            })
            .catch((err) => console.log(err));
        });

        li.innerText = array[i].sellingPrice + " " + array[i].productName + " ";
        li.appendChild(delbtn);

        myList.appendChild(li);
        totalAmount();
      }
    })
    .catch((err) => console.log(err));
}
