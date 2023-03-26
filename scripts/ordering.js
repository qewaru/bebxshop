const continueButton = document.querySelector(".btn-continue")
const continueButtonS = document.querySelector(".btn-continue-s")
const formGrid = document.querySelector(".form-adress")
const mainGrid = document.querySelector("#order_form")
const payButton = document.querySelector(".ok")

const inputContacts = document.querySelector(".contacts")
const inputDelivery = document.querySelector(".delivery")

const nameField = document.querySelector(".name")
const surnameField = document.querySelector(".surname")
const phoneField = document.querySelector(".phone")
const emailField = document.querySelector(".mail")

const codeField = document.querySelector(".zip-code")

function isNameValid(name) {
    const nameRegex = /^[a-zA-Z]{1,50}$/;
    return nameRegex.test(name);
}

function isPhoneValid(phone) {
    const phoneRegex = /^\d{8}$/;
    return phoneRegex.test(phone);
}

function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isCodeValid(code) {
    const codeRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return codeRegex.test(code);
}

continueButton.addEventListener("click", function() {
    const inputFields = document.querySelectorAll(".in-contacts")
    let hasEmptyField = false
    let hasInvalidEmail = false;
    let hasInvalidPhone = false;
    let hasInvalidName = false;
    inputFields.forEach(function(field) {
        if (field.value === '') {
            hasEmptyField = true;
            field.classList.add("invalid-red-input");
            field.addEventListener("input", function() {
                if (field.value !== '') {
                    field.classList.remove("invalid-red-input");
                }
            });
        } else if (field === emailField && !isEmailValid(field.value)) {
            hasInvalidEmail = true;
            field.classList.add("invalid-red-input");
            field.addEventListener("input", function() {
                if (isEmailValid(field.value)) {
                    field.classList.remove("invalid-red-input");
                }
            });    
        } else if (field === phoneField && !isPhoneValid(field.value)) {
            hasInvalidPhone = true;
            field.classList.add("invalid-red-input");
            field.addEventListener("input", function() {
                if (isPhoneValid(field.value)) {
                field.classList.remove("invalid-red-input");
            }
        });
        } else if (field === nameField && !isNameValid(field.value)) {
            hasInvalidName = true;
            field.classList.add("invalid-red-input");
            field.addEventListener("input", function() {
                if (isNameValid(field.value)) {
                field.classList.remove("invalid-red-input");
            }
        });
        } else if (field === surnameField && !isNameValid(field.value)) {
            hasInvalidName = true;
            field.classList.add("invalid-red-input");
            field.addEventListener("input", function() {
                if (isNameValid(field.value)) {
                field.classList.remove("invalid-red-input");
            }
        });
        } else {
            field.classList.remove("invalid-red-input");
        }
    });
    if (!hasEmptyField && !hasInvalidEmail && !hasInvalidPhone && !hasInvalidName) {
        inputContacts.classList.remove("appear")
        continueButton.classList.remove("open")
        inputDelivery.classList.add("appear")
        continueButtonS.classList.add("open")

        let contactDataContent = ""
        inputFields.forEach((inputField) => {
            contactDataContent += `<span class="contact-data">${inputField.value}</span>`
        })

        var contactData = document.createElement("div")
        contactData.innerHTML = contactDataContent
        contactData.classList.add("contact-container")
        formGrid.appendChild(contactData)
        var contactTitle = document.querySelector(".form-adress-title")
        var deliveryTitle = document.querySelector(".form-delivery-title")
        contactTitle.classList.add("checked")
        deliveryTitle.classList.remove("checked")
        formGrid.style.gridTemplateRows = "50% 25%"
        mainGrid.style.gridTemplateRows = "20% 40% 40%"
        
        continueButtonS.addEventListener("click", function() {
            const inputFields = document.querySelectorAll(".in-delivery")
            inputFields.forEach(function(field) {
                if (field.value === '') {
                    hasEmptyField = true;
                    field.classList.add("invalid-red-input");
                    field.addEventListener("input", function() {
                        if (field.value !== '') {
                            field.classList.remove("invalid-red-input");
                        }
                    })
                } else {
                    field.classList.remove("invalid-red-input");
                }
            })
            if (!hasEmptyField) {
                inputDelivery.classList.remove("appear")
                continueButtonS.classList.remove("open")
                payButton.classList.add("open")

                let deliveryDataContent = ""
                inputFields.forEach((inputField) => {
                    deliveryDataContent += `<span class="contact-data">${inputField.value}</span>`
                })

                const formGrid = document.querySelector(".form-delivery")
                var deliveryData = document.createElement("div")
                deliveryData.innerHTML = deliveryDataContent
                deliveryData.classList.add("delivery-container")
                formGrid.appendChild(deliveryData)
                formGrid.style.gridTemplateRows = "repeat(2, 30%)"
                mainGrid.style.gridTemplateRows = "20% 20% 40%"
                deliveryTitle.classList.add("checked")
            }
        })
    }
});

const countrySelect = document.querySelector(".country")
const citySelect = document.querySelector(".city")

countrySelect.addEventListener("change", function(event) {
    const selectedValue = event.target.value
    citySelect.innerHTML = ""

    if (selectedValue == "Latvia") {
        const option1 = document.createElement("option")
        option1.value = "Riga"
        option1.textContent = "Рига"
        citySelect.appendChild(option1);

        const option2 = document.createElement("option")
        option2.value = "Daugavpils"
        option2.textContent = "Даугавпилс"
        citySelect.appendChild(option2);
        
        const option3 = document.createElement("option")
        option3.value = "Jurmala"
        option3.textContent = "Юрмала"
        citySelect.appendChild(option3);

        const option4 = document.createElement("option")
        option4.value = "Ventspils"
        option4.textContent = "Вентспилс"
        citySelect.appendChild(option4);
    }

    if (selectedValue == "Lithuania") {
        const option1 = document.createElement("option")
        option1.value = "Vilnius"
        option1.textContent = "Вильнюс"
        citySelect.appendChild(option1);

        const option2 = document.createElement("option")
        option2.value = "Kaunas"
        option2.textContent = "Каунас"
        citySelect.appendChild(option2);
        
        const option3 = document.createElement("option")
        option3.value = "Klaipeda"
        option3.textContent = "Клайпеда"
        citySelect.appendChild(option3);

        const option4 = document.createElement("option")
        option4.value = "Siauliai"
        option4.textContent = "Шяуляй"
        citySelect.appendChild(option4);
    }

    if (selectedValue == "Estonia") {
        const option1 = document.createElement("option")
        option1.value = "Tallinn"
        option1.textContent = "Таллинн"
        citySelect.appendChild(option1);

        const option2 = document.createElement("option")
        option2.value = "Tartu"
        option2.textContent = "Тарту"
        citySelect.appendChild(option2);
        
        const option3 = document.createElement("option")
        option3.value = "Narva"
        option3.textContent = "Нарва"
        citySelect.appendChild(option3);

        const option4 = document.createElement("option")
        option4.value = "Parnu"
        option4.textContent = "Пярну"
        citySelect.appendChild(option4);
    }
})