fetch("https://kea-alt-del.dk/t5/api/productlist")
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        dataReceived(data);
    })

function dataReceived(products) {
    products.forEach(showProduct)
}

function showProduct(singleDish) {
    //getting template
    const dishTemplate = document.querySelector("#dishTemplate").content;

    //kloniranje template
    const templateClone = dishTemplate.cloneNode(true);

    //fill ou template
    templateClone.querySelector(".dishName").textContent = singleDish.name;
    templateClone.querySelector(".dishPrice").textContent = singleDish.price;
    templateClone.querySelector(".shortDescription").textContent = singleDish.shortdescription;


    //append
    const parentElement = document.querySelector("#starter");
    parentElement.appendChild(templateClone)
}
