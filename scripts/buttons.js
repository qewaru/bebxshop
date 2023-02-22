const openSidebar = document.querySelector(".btn_sidebar");
const sidebar = document.querySelector(".sidebar");
const container = document.querySelector(".main_cont");
const container1 = document.querySelector(".main_container");
const container2 = document.querySelector(".main_grid");

openSidebar.addEventListener("click", function() {
  sidebar.style.left = "0";
});
if (container) {
  container.addEventListener("click", function() {
    sidebar.style.left = "-300px";
});
}

if (container1) {
  container1.addEventListener("click", function() {
    sidebar.style.left = "-300px";
  });
}

if (container2) {
  container2.addEventListener("click", function() {
    sidebar.style.left = "-300px";
  });
}


// const descriptButton = document.querySelector(".btn_description");
// const descriptContent = document.querySelector(".dropdown_descript_content");
// const deliveryButton = document.querySelector(".btn_delivery");
// const deliveryContent = document.querySelector(".dropdown_delivery_content");

// descriptButton.addEventListener("click", function() {
//   descriptContent.style.display = "block";
//   descriptButton.style.borderBottom = "3px solid aliceblue";
// });

// deliveryButton.addEventListener("click", function() {
//   descriptContent.style.display = "block";
//   deliveryButton.style.borderBottom = "3px solid aliceblue";
// });

const descButton = document.querySelector(".btn_description");
const descContent = document.querySelector(".dropdown_descript_content");
const deliveryButton = document.querySelector(".btn_delivery");
const deliveryContent = document.querySelector(".dropdown_delivery_content");

descButton.addEventListener("click", function() {
  if (!descButton.classList.contains("active")) {
    deliveryContent.classList.remove('show');
    descContent.classList.add('show');
    descButton.classList.add("active");
    deliveryButton.classList.remove("active");
  }
});

deliveryButton.addEventListener("click", function() {
  if (!deliveryButton.classList.contains("active")) {
    descContent.classList.remove('show');
    deliveryContent.classList.add('show');  
    deliveryButton.classList.add("active");
    descButton.classList.remove("active");
  }
});