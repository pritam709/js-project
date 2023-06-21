let btn = document.getElementById("btn");
let sp = document.getElementById("sp");
let prodName = document.getElementById("prodName");
let myList = document.getElementById("myList");
let total = document.getElementById("total");


function totalAmount() {
    let amount =0;
  axios
    .get("https://crudcrud.com/api/364b351a33d7496692c33aeb1cb7c907/products")
    .then((response) => {
      let array = response.data;
      for (let i = 0; i < array.length; i++) {

        amount += parseFloat(array[i].sellingPrice) ;
      }

      const node = document.createTextNode(amount.toString());
      total.innerHTML = total.innerHTML.replace('zero', amount.toString());
   
    });
}

btn.addEventListener("click", () => {
  axios
    .post(
      "https://crudcrud.com/api/364b351a33d7496692c33aeb1cb7c907/products",
      {
        sellingPrice: sp.value,
        productName: prodName.value,
      }
    )
    .then((response) => {
     
      let li = document.createElement("li");

      let delbtn = document.createElement("button");
      delbtn.id = "dltButton";
      delbtn.innerHTML = "Delete Product";
      delbtn.addEventListener("click", () => {
        axios
          .delete(
            "https://crudcrud.com/api/364b351a33d7496692c33aeb1cb7c907/products/" +
              response.data._id
          )
          .then((response) => {
            location.reload();
          })
          .catch((err) => console.log(err));
      });
      li.innerText = sp.value + " " + prodName.value + " ";
      li.appendChild(delbtn);

      myList.appendChild(li);
    })
    .catch((err) => console.log(err));
    totalAmount();
});

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/364b351a33d7496692c33aeb1cb7c907/products")
    .then((response) => {
      let array = response.data;
      for (let i = 0; i < array.length; i++) {
        let li = document.createElement("li");

        let delbtn = document.createElement("button");
        delbtn.id = "dltButton";
        delbtn.innerHTML = "Delete Product";
        li.innerText = array[i].sellingPrice + " " + array[i].productName + " ";
        li.appendChild(delbtn);

        myList.appendChild(li);

      }
      totalAmount();
    });
});
