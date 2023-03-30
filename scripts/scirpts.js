const items = [
    {
        name: 'BEBXSH PARIS Black Hoodie',
        tag: 'parisHoodie',
        img: '../images/black_hoodie.png',
        src: 'merch_cloth1.html',
        price: 29.95,
        size: '',
        inCart: 0
    },
    {
        name: 'BEBXSH GREENLIGHT T-Shirt',
        tag: 'greenShirt',
        img: '../images/greenlight.png',
        src: 'merch_cloth2.html',
        price: 24.99,
        size: '',
        inCart: 0
    },
    {
        name: 'BEBXSH EMMET T-Shirt',
        tag: 'lightShirt',
        img: '../images/lightning.png',
        src: 'merch_cloth3.html',
        price: 24.99,
        size: '',
        inCart: 0
    }
]

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    var removeCartButtons = document.getElementsByClassName("btn_remove")
    for (var i = 0; i <removeCartButtons.length; i++) {
        var  button = removeCartButtons[i]
        button.addEventListener("click", removeCartItem)
    }
    
    var quantityInput = document.getElementsByClassName("cart_quantity")
    for (var i = 0; i < quantityInput.length; i++) {
        input = quantityInput[i]
        input.addEventListener("change", quantityChange)
    }

    var addToCartButton = document.getElementsByClassName("add_cart_btn")
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener("click", addToCartClicked)
    }
}


let cartArray = []
if (localStorage.getItem("cartItems")) {
    cartArray = JSON.parse(localStorage.getItem("cartItems"));
}

function addToCartClicked(event) {
    var button = event.target

    var sizeInput = document.querySelector('input[name="size_check"]:checked');
    var sizeRadios = document.getElementsByName("size_check");
    var size = sizeInput ? sizeInput.value : null;
    var sizeSelected = false

    addToCartButton = document.getElementsByClassName("add_cart_btn")
    itemName = document.getElementsByClassName("hd_text")

    for (let i = 0; i < sizeRadios.length; i++) {
        if (sizeRadios[i].checked) {
            sizeSelected = true;
            break;
        }
    }

    if (sizeSelected) {
        for (let i = 0; i < items.length; i++) {
            for (let j = 0; j < itemName.length; j++) {
              if (itemName[j].innerText === items[i].name) {
                if (items[i].inCart == 0) {
                    items[i].inCart += 1;
                    items[i].size = size
                    cartArray.push(items[i]);
                    localStorage.setItem("cartItems", JSON.stringify(cartArray));
                    console.log(cartArray)
                    break;
                } else {
                    var alertBox = document.querySelector(".alert-window-exists")
                    alertBox.classList.add("show")
                    var alertBoxButton = document.querySelector(".btn-close-alert-exists")
                    alertBoxButton.addEventListener("click", function() {
                    alertBox.classList.remove("show");
                    })
                    return
                }
                }
            }
        }
    } else {
        const alertBox = document.querySelector(".alert-window-nosize")
        alertBox.classList.add("show")
        const alertBoxButton = document.querySelector(".btn-close-alert-nosize")
        alertBoxButton.addEventListener("click", function() {
        alertBox.classList.remove("show");
        })
        return
    }

    const inCartWindow = document.querySelector(".alert-window-incart")

    inCartWindow.classList.add("show")
    setTimeout(function() {
        inCartWindow.classList.remove("show")
    }, 7000)

    button.innerText = "Added to cart"
}   

var cartItemsData = JSON.parse(localStorage.getItem("cartItems"));
var cartItems = document.getElementsByClassName("cart_table")[0]

if (cartItemsData && cartItemsData.length > 0) {
    for (let i = 0; i < cartItemsData.length; i++) {
        var cartRow = document.createElement("div")

        var cartRowContents = `
        <div class="cart_row">
            <a href="${cartItemsData[i].src}"><img class="cart_img" src="${cartItemsData[i].img}" width="150px" height="150px"></a>
            <p class="cart_item_name"><b>${cartItemsData[i].name}</b></p>
            <p class="cart_price">${cartItemsData[i].price} €</p>
            <select class="cart_size">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
            </select>
            <input id="${cartItemsData[i].tag}-quantity" class="cart_quantity" type="number" value="1">
            <button class="btn_remove" type="button">REMOVE</button>
        </div>
        <div class="border_line"></div>`
        
        cartRow.innerHTML = cartRowContents
        cartItems.appendChild(cartRow)
        cartRow.getElementsByClassName("btn_remove")[0].addEventListener("click", removeCartItem)
        cartRow.getElementsByClassName("cart_quantity")[0].addEventListener("change", quantityChange)
        var cartSizeSelect = cartRow.getElementsByClassName("cart_size")[0];
        cartSizeSelect.value = cartItemsData[i].size;
}
var cartRowBottom = document.createElement("div")
var cartRowBottomContent = `
<div class="cart_row_footer">
        <p class="cart_text_total cart_footer" >TOTAL PRICE:</p>
        <p class="cart_totalprice cart_footer">0</p>
</div>`
cartRowBottom.innerHTML = cartRowBottomContent
cartItems.appendChild(cartRowBottom)

updateCartTotal();
} else {
    var cartHeader = document.getElementsByClassName("cart_row_header")[0];
    cartHeader.remove()
    var cartEmpty = document.createElement("div")
    var cartEmptyContent = `
    <div class="cart_empty">
    <h1>Cart is empty</h1>
    <p>Add products in cart</p>
    </div>`
    cartEmpty.innerHTML = cartEmptyContent
    cartItems.appendChild(cartEmpty)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    var cartItemContainer = buttonClicked.parentElement;
    var itemName = cartItemContainer.getElementsByClassName("cart_item_name")[0].innerText;
    for (let i = 0; i < cartArray.length; i++) {
        if (cartArray[i].name === itemName) {
            cartArray.splice(i, 1);
            break;
        }
    }
    cartItemContainer.remove();
    localStorage.setItem("cartItems", JSON.stringify(cartArray))
    updateCartTotal();
}

function quantityChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart_table")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart_row")
    var total = 0
    var cartArray = JSON.parse(localStorage.getItem("cartItems"));

    if (cartArray == null || cartArray.length == 0) {

        var cartBorder = document.getElementsByClassName("border_line")[0];
        var cartFooter = document.getElementsByClassName("cart_row_footer")[0];
        var cartHeader = document.getElementsByClassName("cart_row_header")[0];
        if (cartBorder && cartFooter && cartHeader) {
            cartBorder.remove();
            cartFooter.remove();
            cartHeader.remove();
        }

        var cartEmpty = document.createElement("div");
        var cartEmptyContent = `
          <div class="cart_empty">
            <h1>Cart is empty</h1>
            <p>Add products in cart</p>
          </div>
        `;
        cartEmpty.innerHTML = cartEmptyContent;
        cartItemContainer.appendChild(cartEmpty);
        return;
      }
    
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart_price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart_quantity")[0]
        var price = parseFloat(priceElement.innerText.replace("€", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart_totalprice")[0].innerText = total + "€"
}

var paymentButton = document.getElementById("payment-button");
paymentButton.addEventListener("click", checkCartBeforePayment);

function checkCartBeforePayment(event) {
    event.preventDefault();
    
    if (cartArray.length === 0) {
        // alert("Ваша корзина пуста!");
        var alertBox = document.querySelector(".alert-window")
        alertBox.classList.add("show")
        var alertBoxButton = document.querySelector(".btn-close-alert")
        alertBoxButton.addEventListener("click", function() {
                alertBox.classList.remove("show");
          })
    } else {
        for (var i = 0; i < cartArray.length; i++) {
            var quantityInput = document.getElementById(cartArray[i].tag + "-quantity");
            var selectedQuantity = quantityInput.value;
            cartArray[i].quantity = selectedQuantity;
        }
        localStorage.setItem("cartItems", JSON.stringify(cartArray));
        window.location.href = event.target.href;
    }
}