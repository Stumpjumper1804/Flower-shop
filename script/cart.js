const products = [
  {
    flower: "Rose",
    image: "colour-5350257_640.jpg",
    price: 4.2,
    qtty: 1,
  },
  {
    flower: "Tulip",
    image: "colour-5148913_640.jpg",
    price: 2.6,
    qtty: 1,
  },
  {
    flower: "Viola",
    image: "pansy-1279354_640.jpg",
    price: 1.8,
    qtty: 1,
  },
  {
    flower: "Daffodil",
    image: "daffodil-4111577_640.jpg",
    price: 2.5,
    qtty: 1,
  },
  {
    flower: "Peonies",
    image: "pion-4736447_640.jpg",
    price: 4.2,
    qtty: 1,
  },
  {
    flower: "Gerbera",
    image: "gerbera-4576979_640.jpg",
    price: 3.7,
    qtty: 1,
  },
];

//current object formatter
const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});

//select the products row and add items dynamically
let productsRow = document.querySelector(".products");

for (let product of products) {
  productsRow.innerHTML += `
  <div class="card product col m-3" style="width: 300px;">
                <img class="card-img-top mt-2 px-3" src="./images/${
                  product.image
                }" alt="${product.flower}">
                <div class="card-body px-3 py-0">
                    <h4 class="card-title text-center mt-3">${
                      product.flower
                    }</h4>
                    <p class="card-text">If you want to buy this lovely flower, just add it to your cart.</p>
                    <p class="card-text h3 text-end">${currencyFormater.format(
                      product.price
                    )}</p>
                    <p class="card-text3 d-flex justify-content-end"><button class="btn w-75 product-button"><i class="fs-4 bi bi-cart-plus"></i> Add to cart</button></p>

                </div>
            </div>
    `;
}

//cart declared
const cart = [];

//product button selected
const addToCartBtn = document.querySelectorAll(".product-button");

//add event to add to cart buttons
addToCartBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    addToCart(products[i]);
  });
});

//adds product to cart
const addToCart = (product) => {
  if (cart.find((val) => val.flower == product.flower)) {
    // console.log(cart.find((val) => val.name == product.name));
    product.qtty++;
  } else {
    cart.push(product);
  }
  console.table(cart);
  createRows();
  cartTotal();
  itemsTotal();
};

//increases item quantity
const plusQtty = (index) => {
  cart[index].qtty++;
  createRows();
  cartTotal();
};
//decreases item quantity
const minusQtty = (index) => {
  if (cart[index].qtty == 1) {
    cart.splice(index, 1);
  } else {
    cart[index].qtty--;
  }
  createRows();
  cartTotal();
};

//deletes item from cart
const deleteItem = (index) => {
  cart[index].qtty = 1;
  cart.splice(index, 1);
  createRows();
  cartTotal();
  itemsTotal();
};
//creates row in cart - dom
const createRows = () => {
  let result = "";
  for (let item of cart) {
    result += `
    <div class="cart-row row gx-0">
    <div class="cart-item col-6 ps-md-5 my-4 d-flex align-items-center justify-content-start">
                        <img class="cart-item-image" src="./images/${
                          item.image
                        }" width="100" height="100" alt="${item.flower}">
                        <div class="cart-item-title h5 ms-2">${
                          item.flower
                        }</div>
                    </div>
                    <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
                        <div class="d-flex">
                            <i class="plus fs-5 bi bi-plus-circle-fill"></i>
                        </div>
                        <div class="text-center m-0 cart-quantity h4 w-25">${
                          item.qtty
                        }</div>
                        <div class="d-flex">
                            <i class="minus fs-5 bi bi-dash-circle-fill"></i>
                        </div>
                    </div>
                    <div class="col-1 d-flex justify-content-start align-items-center">
                    <i class="del fs-4 bi bi-trash3-fill text-danger"></i>
                    </div>
                    <div class="cart-price col-3 h5 my-auto text-end p-2 pe-sm-5">${currencyFormater.format(
                      item.price
                    )}</div>
                </div>                    
                </div>
        `;
  }
  document.querySelector(".cart-items").innerHTML = result;
  const plusBtns = document.querySelectorAll(".plus");
  const minusBtns = document.querySelectorAll(".minus");
  const deleteBtns = document.querySelectorAll(".del");
  //   console.log(plusBtns);
  plusBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      plusQtty(i);
    });
  });
  minusBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      minusQtty(i);
    });
  });
  deleteBtns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      deleteItem(i);
    });
  });
};

//updates the cart total amount
const cartTotal = () => {
  let total = 0;
  for (let item of cart) {
    total += item.price * item.qtty;
  }

  //give discount, when total >= 50 Euros
  if (total >= 50) {
    total *= 0.8;
    document.getElementById("discount").innerText = "(20 % discount incl.)";
  }
  document.getElementById("price").innerHTML = currencyFormater.format(total);
};

//display total items
const itemsTotal = () => {
  let totalItems = 0;
  for (let item of cart) {
    totalItems++;
  }
  document.getElementById("sum-items").innerText = totalItems;
};
