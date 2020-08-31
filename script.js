// 1. odabir templatea
const dishTemplate = document.querySelector("#dishTemplate").content;

// 2. izrada klona

const dishClone = dishTemplate.cloneNode(true);

// 3. Promjena sadrzaja klona (opcionalno)
dishClone.querySelector("h1").textContent = "Russian Ringbread"

// 4. Odabir novog parent elementa
const parentElement = document.querySelector("#menu");

// 5. Append ili dodjeli clone novome parent elementu
parentElement.appendChild(dishClone);
