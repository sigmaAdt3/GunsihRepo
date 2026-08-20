/* =========================================================
   GUNISH JEWELS - WEBSITE CONFIGURATION
========================================================= */

const CONFIG = {
    whatsappNumber: "919620993137",
    instagram: "https://instagram.com/gunishjewels"
};


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [

    {
        id: "E001",
        name: "Elegant Gold Earrings",
        category: "Earrings",
        price: 199,
        image: "https://i.ibb.co/cSvBDCKR/IMG-7425.png",
        description:
            "Elegant lightweight anti-tarnish earrings designed for everyday wear and special occasions.",
        badge: "BESTSELLER"
    },

    {
        id: "E002",
        name: "Pearl Drop Earrings",
        category: "Earrings",
        price: 179,
        image: "https://i.ibb.co/cSvBDCKR/IMG-7425.png",
        description:
            "A timeless pearl-inspired design that adds a soft, elegant finish to any outfit.",
        badge: "NEW"
    },


    {
        id: "R001",
        name: "Minimal Gold Ring",
        category: "Rings",
        price: 149,
        image: "https://i.ibb.co/pjmjK98S/DBD10-C40-0-E25-4-C74-9-D7-B-599-EAB34-AD32.png",
        description:
            "A clean minimal ring that works beautifully with everyday outfits.",
        badge: ""
    },

    {
        id: "R002",
        name: "Statement Ring",
        category: "Rings",
        price: 199,
        image: "https://i.ibb.co/pjmjK98S/DBD10-C40-0-E25-4-C74-9-D7-B-599-EAB34-AD32.png",
        description:
            "A bold statement piece designed to stand out at parties and special occasions.",
        badge: "POPULAR"
    },


    {
        id: "N001",
        name: "Classic Necklace",
        category: "Necklaces",
        price: 199,
        image: "https://i.ibb.co/pjmjK98S/DBD10-C40-0-E25-4-C74-9-D7-B-599-EAB34-AD32.png",
        description:
            "An elegant necklace that pairs effortlessly with ethnic and western looks.",
        badge: "NEW"
    },

    {
        id: "N002",
        name: "Layered Necklace",
        category: "Necklaces",
        price: 199,
        image: "https://i.ibb.co/pjmjK98S/DBD10-C40-0-E25-4-C74-9-D7-B-599-EAB34-AD32.png",
        description:
            "A modern layered look for customers who love a little extra sparkle.",
        badge: ""
    },


    {
        id: "B001",
        name: "Elegant Bracelet",
        category: "Bracelets",
        price: 189,
        image: "https://i.ibb.co/dwSsdwHc/8981575-F-B361-4185-9-B7-E-BA811-B776-C53.png",
        description:
            "A delicate anti-tarnish bracelet with a premium finish.",
        badge: "BESTSELLER"
    },

    {
        id: "B002",
        name: "Classic Charm Bracelet",
        category: "Bracelets",
        price: 179,
        image: "https://i.ibb.co/cSvBDCKR/IMG-7425.png",
        description:
            "A versatile bracelet designed to complement everyday styling.",
        badge: ""
    }

];


/* =========================================================
   STATE
========================================================= */

let currentFilter = "All";
let currentSearch = "";
let selectedProduct = null;
let quantity = 1;


/* =========================================================
   DOM ELEMENTS
========================================================= */

const productGrid = document.getElementById("grid");
const emptyMessage = document.getElementById("empty");

const filterContainer = document.getElementById("filters");
const searchInput = document.getElementById("search");

const modal = document.getElementById("modal");
const modalClose = document.getElementById("close");

const modalImage = document.getElementById("mImg");
const modalCategory = document.getElementById("mCat");
const modalName = document.getElementById("mName");
const modalPrice = document.getElementById("mPrice");
const modalDescription = document.getElementById("mDesc");

const quantityValue = document.getElementById("q");

const quantityMinus = document.getElementById("minus");
const quantityPlus = document.getElementById("plus");

const modalWhatsApp = document.getElementById("mWA");

const menuButton = document.getElementById("menu");
const mobileNavigation = document.getElementById("mobileNav");

const floatingWhatsApp = document.getElementById("floatWA");
const footerWhatsApp = document.getElementById("footerWA");

const yearElement = document.getElementById("year");


/* =========================================================
   PRICE FORMAT
========================================================= */

function formatPrice(price) {

    return "₹" + Number(price).toLocaleString("en-IN");

}


/* =========================================================
   WHATSAPP URL
========================================================= */

function createWhatsAppUrl(product, productQuantity = 1) {

    const message = `Hi GunIsh Jewels 👋

I am interested in:

Product: ${product.name}
Product ID: ${product.id}
Category: ${product.category}
Price: ${formatPrice(product.price)}
Quantity: ${productQuantity}

Please confirm availability and ordering details.`;


    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

}


/* =========================================================
   GENERIC WHATSAPP
========================================================= */

function createGenericWhatsAppUrl() {

    const message =
        `Hi GunIsh Jewels 👋

I would like to know more about your jewellery collection.`;

    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const filteredProducts = products.filter(product => {

        const categoryMatch =
            currentFilter === "All" ||
            product.category === currentFilter;


        const searchMatch =
            `${product.name} ${product.category}`
                .toLowerCase()
                .includes(currentSearch.toLowerCase());


        return categoryMatch && searchMatch;

    });


    productGrid.innerHTML = "";


    filteredProducts.forEach(product => {

        const article = document.createElement("article");

        article.className = "card";


        article.innerHTML = `

            <button
                class="pic"
                data-product-id="${product.id}"
                type="button"
                aria-label="View ${product.name}"
            >

                ${
                    product.badge
                        ? `<span class="badge">${product.badge}</span>`
                        : ""
                }

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='${products[0].image}'"
                >

            </button>


            <div class="info">

                <div class="cat">
                    ${product.category}
                </div>


                <h3 class="name">
                    ${product.name}
                </h3>


                <div class="price">
                    ${formatPrice(product.price)}
                </div>


                <div class="actions">

                    <button
                        type="button"
                        data-product-id="${product.id}"
                        class="detailsButton"
                    >
                        VIEW DETAILS
                    </button>


                    <a
                        class="wa"
                        href="${createWhatsAppUrl(product)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WHATSAPP
                    </a>

                </div>

            </div>

        `;


        productGrid.appendChild(article);

    });


    emptyMessage.classList.toggle(
        "hidden",
        filteredProducts.length !== 0
    );

}


/* =========================================================
   OPEN PRODUCT MODAL
========================================================= */

function openProductModal(product) {

    selectedProduct = product;

    quantity = 1;


    modalImage.src = product.image;

    modalImage.alt = product.name;


    modalCategory.textContent =
        product.category;


    modalName.textContent =
        product.name;


    modalPrice.textContent =
        formatPrice(product.price);


    modalDescription.textContent =
        product.description;


    quantityValue.textContent =
        quantity;


    updateModalWhatsApp();


    modal.classList.remove("hidden");


    document.body.style.overflow = "hidden";

}


/* =========================================================
   UPDATE MODAL WHATSAPP
========================================================= */

function updateModalWhatsApp() {

    if (!selectedProduct) {
        return;
    }


    modalWhatsApp.href =
        createWhatsAppUrl(
            selectedProduct,
            quantity
        );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProductModal() {

    modal.classList.add("hidden");

    document.body.style.overflow = "";

    selectedProduct = null;

}


/* =========================================================
   PRODUCT GRID CLICK
========================================================= */

productGrid.addEventListener("click", function (event) {

    const target =
        event.target.closest("[data-product-id]");


    if (!target) {
        return;
    }


    /*
       Don't open product modal when
       WhatsApp link is clicked.
    */

    if (event.target.closest(".wa")) {
        return;
    }


    const productId =
        target.dataset.productId;


    const product =
        products.find(
            item => item.id === productId
        );


    if (product) {

        openProductModal(product);

    }

});


/* =========================================================
   CATEGORY FILTERS
========================================================= */

filterContainer.addEventListener(
    "click",
    function (event) {

        const button =
            event.target.closest(
                "[data-filter]"
            );


        if (!button) {
            return;
        }


        currentFilter =
            button.dataset.filter;


        document
            .querySelectorAll(
                "#filters button"
            )
            .forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


        button.classList.add(
            "active"
        );


        renderProducts();

    }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    function (event) {

        currentSearch =
            event.target.value;


        renderProducts();

    }
);


/* =========================================================
   MODAL CLOSE
========================================================= */

modalClose.addEventListener(
    "click",
    closeProductModal
);


/* Close when clicking outside modal */

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            closeProductModal();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            !modal.classList.contains("hidden")
        ) {

            closeProductModal();

        }

    }
);


/* =========================================================
   QUANTITY - MINUS
========================================================= */

quantityMinus.addEventListener(
    "click",
    function () {

        quantity =
            Math.max(
                1,
                quantity - 1
            );


        quantityValue.textContent =
            quantity;


        updateModalWhatsApp();

    }
);


/* =========================================================
   QUANTITY - PLUS
========================================================= */

quantityPlus.addEventListener(
    "click",
    function () {

        quantity++;


        quantityValue.textContent =
            quantity;


        updateModalWhatsApp();

    }
);


/* =========================================================
   COLLECTION BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".collections button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const category =
                    button.dataset.cat;


                currentFilter =
                    category;


                document
                    .querySelectorAll(
                        "#filters button"
                    )
                    .forEach(filterButton => {

                        filterButton.classList.toggle(
                            "active",
                            filterButton.dataset.filter === category
                        );

                    });


                renderProducts();


                document
                    .getElementById("products")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================================================
   MOBILE MENU
========================================================= */

menuButton.addEventListener(
    "click",
    function () {

        mobileNavigation.classList.toggle(
            "open"
        );

    }
);


/* Close mobile menu after navigation */

mobileNavigation
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            function () {

                mobileNavigation.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================================================
   GENERIC WHATSAPP BUTTONS
========================================================= */

const genericWhatsApp =
    createGenericWhatsAppUrl();


floatingWhatsApp.href =
    genericWhatsApp;


footerWhatsApp.href =
    genericWhatsApp;


/* =========================================================
   INSTAGRAM
========================================================= */

const instagramLinks =
    document.querySelectorAll(
        'a[href*="instagram.com"]'
    );


instagramLinks.forEach(link => {

    link.href =
        CONFIG.instagram;

});


/* =========================================================
   CURRENT YEAR
========================================================= */

yearElement.textContent =
    new Date().getFullYear();


/* =========================================================
   INITIAL LOAD
========================================================= */

renderProducts();