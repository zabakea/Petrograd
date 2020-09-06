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
        a.setAttribute("href", `#${cat}`)
        document.querySelector("nav").appendChild(a);
    })
}


function fetchProducts() {


    //fetching JSON file
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            dataReceived(data);
        })

    //Passing data to a function & forEach (loop) every product

    function dataReceived(products) {
        products.forEach(showProduct)
    }

    function showProduct(singleDish) {
        //getting template
        const dishTemplate = document.querySelector("#dishTemplate").content;

        //kloniranje template
        const templateClone = dishTemplate.cloneNode(true);

        //grabbing images
        const img = templateClone.querySelector("img");
        img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${singleDish.image}-md.jpg`);


        const article = templateClone.querySelector('article');
        if (singleDish.vegetarian) {
            article.classList.add("itisVegetarian");
        }
        if (singleDish.alcohol) {
            article.classList.add("hasAlcohol");
        }

        //fill out template
        templateClone.querySelector(".dishName").textContent = singleDish.name;
        templateClone.querySelector(".dishPrice").textContent = singleDish.price;
        templateClone.querySelector(".shortDescription").textContent = singleDish.shortdescription;

        templateClone.querySelector(".readMore").addEventListener("click", () => {
            fetch(`https://kea-alt-del.dk/t5/api/product?id=` + singleDish.id)
                .then(res => res.json())
                .then(function (descript) {
                    showMore(descript);
                })

        })

        //filling template with allergens & soldout

        if (singleDish.vegetarian) {
            templateClone.querySelector(".vegetarian").classList.remove("hidden");
        }
        if (singleDish.alcohol) {
            templateClone.querySelector(".alcohol").classList.remove("hidden");
        }
        if (singleDish.soldout) {
            templateClone.querySelector(".dishImg").classList.add("soldout");
        }

        //discount price

        const price = singleDish.price;
        const discount = singleDish.discount;
        const newPrice = price - discount;

        if (singleDish.discount > 0) {
            templateClone.querySelector(".newPrice").textContent = newPrice;
            templateClone.querySelector(".dishPrice").classList.add("strikethrough");
        } else {
            templateClone.querySelector(".newPrice").classList.add("hidden");
        }

        //Toggle short & long description - interpolation of class name(id)

        templateClone.querySelector('article').id = "dish_" + singleDish.id

        function showMore(data) {
            document.querySelector(`#dish_${data.id} .longDescription`).textContent = data.longdescription;
            document.querySelector(`#dish_${data.id} .longDescription`).classList.toggle("hidden");
            document.querySelector(`#dish_${data.id} .shortDescription`).classList.toggle("hidden");
        }


        //append
        const parentElement = document.querySelector("#" + singleDish.category);
        parentElement.appendChild(templateClone)
    }

}

const vegFilter = document.querySelector("#vegFilter");
vegFilter.addEventListener("click", vegFilterClicked);

const alcFilter = document.querySelector("#alcFilter");
alcFilter.addEventListener("click", alcFilterClicked);

function vegFilterClicked() {
    const articles = document.querySelectorAll("article:not(.itisVegetarian)");

    articles.forEach(elem => {
        elem.classList.toggle("hidden");
    })
}

function alcFilterClicked() {
    const articles2 = document.querySelectorAll("article:not(.hasAlcohol)");

    articles2.forEach(elem => {
        elem.classList.toggle("hide");
    })
}
