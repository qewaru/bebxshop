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



function addToCartClicked(event) {
    var button = event.target
    button.innerText = "Добавлено в коризну"
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("hd_text")[0].innerText
    var price = shopItem.getElementsByClassName("price")[0].innerText
    var imageSrc = shopItem.getElementsByClassName("item_image")[0].src
    sessionStorage.setItem("cartItemIamge", JSON.stringify(imageSrc))
    sessionStorage.setItem("cartItemName", JSON.stringify(title))
    sessionStorage.setItem("cartItemPrice", JSON.stringify(price))
    
}
    

    var cartItemImage = JSON.parse(sessionStorage.getItem("cartItemImage"))
    var cartItemName = JSON.parse(sessionStorage.getItem("cartItemName"))
    var cartItemPrice = JSON.parse(sessionStorage.getItem("cartItemPrice"))
    var cartRow = document.createElement("div")
    var cartItems = document.getElementsByClassName("cart_table")[0]
    var cartEmpty = document.getElementsByClassName("cart_empty")
    var cartRowContents = `
    <div class="cart_row">
        <a href="merch_cloth1.html"><img class="cart_img" src="${cartItemImage} width="150px" height="150px"></a>
        <p class="cart_item_name"><b>${cartItemName}</b></p>
        <p class="cart_price">${cartItemPrice}</p>
        <input class="cart_quantity" type="number" value="1">
        <button class="btn_remove" type="button">УДАЛИТЬ</button>
    </div>
    <div class="border_line"></div>
    <div class="cart_row_footer">
        <p class="cart_text_total cart_footer" >ОБЩАЯ ЦЕНА:</p>
        <p class="cart_totalprice cart_footer">0</p>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn_remove")[0].addEventListener("click", removeCartItem)
    updateCartTotal()
    cartRow.getElementsByClassName("cart_quantity")[0].addEventListener("change", quantityChange)
    

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateCartTotal()
    cartItems.removeChild(cartRow)
    var cartTableContent = `<div class="cart_empty"><p>Cart is empty</p></div>`
    if (!cartItems.hasChildNodes()) {
        cartItems.innerHTML = cartTableContent
    }
}

function quantityChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemsCont = document.getElementsByClassName("cart_table")[0]
    var cartRows = cartItemsCont.getElementsByClassName("cart_row")
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart_price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart_quantity")[0]
        console.log(priceElement, quantityElement)
        var price = parseFloat(priceElement.innerText.replace("€", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart_totalprice")[0].innerText = total + "€"
}