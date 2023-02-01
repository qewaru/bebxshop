var addToCartButton = document.getElementsByClassName("add_cart_btn")
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener("click", addToCartClicked)
    }

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("hd_text")[0].innerText
    var price = shopItem.getElementsByClassName("price")[0].innerText
    var imageSrc = shopItem.getElementsByClassName("image")[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
}

function addItemToCart(title, price, imageSrc) {
    itemInformation = [title, price, imageSrc]
    console.log(itemInformation)
}


// function addItemToCart(title, price, imageSrc) {
//     var cartRow = document.createElement("div")
//     var cartItems = document.getElementsByClassName("cart_table")[0]
//     var cartRowContents = `
//     <div class="cart_row">
//         <a href="merch_cloth1.html"><img class="cart_img" src="black_hoodie.png" width="150px" height="150px"></a>
//         <p class="cart_item_name"><b>PARIS HOODIE</b></p>
//         <p class="cart_price">129.13 €</p>
//         <input class="cart_quantity" type="number" value="1">
//         <button class="btn_remove" type="button">УДАЛИТЬ</button>
//     </div>`
//     cartRow.innerHTML = cartRowContents
//     console.log(cartRow)
//     cartItems.append(cartRow)
// }