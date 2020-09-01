init();

function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            categoriesReceived(data);
        })
}

function categoriesReceived(cats) {
    createNavigation(cats);
    createSections(cats);
    fetchProducts();
}

function createSections(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h2 = document.createElement("h2");
        h2.textContent = category;
        document.querySelector("#menu").appendChild(section);
        section.appendChild(h2);

    })
}

function createNavigation(categories) {

    categories.forEach(cat => {
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href",`#${cat}`)
        document.querySelector("nav").appendChild(a);
    })
}


function fetchProducts() {

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

    if (singleDish.vegetarian) {
        templateClone.querySelector(".vegetarian").classList.remove("hidden");
    }
    if (singleDish.alcohol) {
        templateClone.querySelector(".alcohol").classList.remove("hidden");
    }
    if (singleDish.soldout) {
        templateClone.querySelector(".soldout").classList.remove("hidden");
    }


    //fill ou template
    templateClone.querySelector(".dishName").textContent = singleDish.name;
    templateClone.querySelector(".dishPrice").textContent = singleDish.price;
    templateClone.querySelector(".shortDescription").textContent = singleDish.shortdescription;


    //append
    const parentElement = document.querySelector("#" + singleDish.category);
    parentElement.appendChild(templateClone)
}

}
