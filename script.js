```javascript
/* =========================================================
   GUNISH JEWELS - WEBSITE CONFIGURATION
========================================================= */

const CONFIG = {
    whatsappNumber: "919620993137",
    instagram: "https://instagram.com/gunishjewels"
};


/* =========================================================
   PRODUCT DATA
   Change the "stock" value whenever your actual stock changes.
========================================================= */

const products = [

    {
        id: "E001",
        name: "Elegant Gold Earrings",
        category: "Earrings",
        price: 199,
        stock: 5,
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
        stock: 5,
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
        stock: 5,
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
        stock: 5,
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
        stock: 5,
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
        stock: 5,
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
        stock: 5,
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
        stock: 5,
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
   CART
========================================================= */

let cart = JSON.parse(
    localStorage.getItem("gunishCart") || "[]"
);


/* =========================================================
   CLEAN OLD / INVALID CART DATA
========================================================= */

cart = cart.filter(item => {

    const product = products.find(
        product => product.id === item.id
    );

    if (!product) {
        return false;
    }

    item.quantity = Math.min(
        Math.max(Number(item.quantity) || 0, 0),
        product.stock
    );

    return item.quantity > 0;

});


localStorage.setItem(
    "gunishCart",
    JSON.stringify(cart)
);


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
   GET PRODUCT
========================================================= */

function getProduct(productId) {

    return products.find(
        product => product.id === productId
    );

}


/* =========================================================
   GET CART ITEM QUANTITY
========================================================= */

function getCartQuantity(productId) {

    const item = cart.find(
        item => item.id === productId
    );

    return item ? item.quantity : 0;

}


/* =========================================================
   GET REMAINING STOCK
========================================================= */

function getRemainingStock(productId) {

    const product = getProduct(productId);

    if (!product) {
        return 0;
    }

    return Math.max(
        0,
        product.stock - getCartQuantity(productId)
    );

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "gunishCart",
        JSON.stringify(cart)
    );

    updateCartCount();
    renderCart();
    renderProducts();

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

    const totalQuantity = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    const cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

        cartCount.style.display =
            totalQuantity > 0
                ? "inline-flex"
                : "none";

    }

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(product, productQuantity = 1) {

    if (!product) {
        return;
    }

    if (product.stock <= 0) {

        alert("This product is out of stock.");

        return;

    }


    const existingItem = cart.find(
        item => item.id === product.id
    );


    const currentQuantity =
        existingItem
            ? existingItem.quantity
            : 0;


    const requestedQuantity =
        currentQuantity + productQuantity;


    /* Prevent quantity exceeding stock */

    if (requestedQuantity > product.stock) {

        alert(
            `Only ${product.stock} ${product.stock === 1 ? "piece" : "pieces"} available for ${product.name}.`
        );

        return;

    }


    if (existingItem) {

        existingItem.quantity =
            requestedQuantity;

    } else {

        cart.push({
            id: product.id,
            quantity: productQuantity
        });

    }


    saveCart();

}


/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

}


/* =========================================================
   EMPTY ENTIRE CART - SINGLE CLICK
========================================================= */

function emptyCart() {

    if (cart.length === 0) {
        return;
    }


    /* Optional confirmation */

    const confirmClear =
        confirm(
            "Are you sure you want to empty your entire cart?"
        );


    if (!confirmClear) {
        return;
    }


    cart = [];

    localStorage.removeItem("gunishCart");

    updateCartCount();
    renderCart();
    renderProducts();

}


/* =========================================================
   EMPTY CART BUTTON
   Works with #clearCart in your HTML.
========================================================= */

const clearCartButton =
    document.getElementById("clearCart");


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        emptyCart
    );

}


/* =========================================================
   CHANGE CART QUANTITY
========================================================= */

function changeCartQuantity(productId, change) {

    const item = cart.find(
        item => item.id === productId
    );


    const product =
        getProduct(productId);


    if (!item || !product) {
        return;
    }


    const newQuantity =
        item.quantity + change;


    /* Don't allow quantity below 1 */

    if (newQuantity <= 0) {

        removeFromCart(productId);

        return;

    }


    /* Don't allow quantity above stock */

    if (newQuantity > product.stock) {

        alert(
            `Only ${product.stock} ${product.stock === 1 ? "piece" : "pieces"} available.`
        );

        return;

    }


    item.quantity =
        newQuantity;

    saveCart();

}


/* =========================================================
   CART DETAILS
========================================================= */

function getCartProducts() {

    return cart
        .map(item => {

            const product =
                products.find(
                    product =>
                        product.id === item.id
                );


            if (!product) {
                return null;
            }


            return {
                ...product,
                quantity: Math.min(
                    item.quantity,
                    product.stock
                ),
                subtotal:
                    product.price *
                    Math.min(
                        item.quantity,
                        product.stock
                    )
            };

        })
        .filter(Boolean);

}


/* =========================================================
   CART TOTAL
========================================================= */

function getCartTotal() {

    return getCartProducts().reduce(
        (total, product) =>
            total + product.subtotal,
        0
    );

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");

    const cartEmpty =
        document.getElementById("cartEmpty");

    const cartFooter =
        document.getElementById("cartFooter");


    if (!cartItems) {
        return;
    }


    const items =
        getCartProducts();


    cartItems.innerHTML = "";


    if (items.length === 0) {

        if (cartEmpty) {
            cartEmpty.style.display = "block";
        }

        if (cartFooter) {
            cartFooter.style.display = "none";
        }

        return;

    }


    if (cartEmpty) {
        cartEmpty.style.display = "none";
    }


    if (cartFooter) {
        cartFooter.style.display = "block";
    }


    items.forEach(item => {

        const div =
            document.createElement("div");


        div.className =
            "cartItem";


        const remainingStock =
            Math.max(
                0,
                item.stock - item.quantity
            );


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="this.style.display='none'"
            >

            <div class="cartItemInfo">

                <h4>${item.name}</h4>

                <small>${item.id}</small>

                <strong>
                    ${formatPrice(item.price)}
                </strong>

                <div class="stockInfo">

                    ${
                        item.stock > 0
                            ? `Available stock: ${item.stock}`
                            : `<span class="outOfStock">
                                OUT OF STOCK
                              </span>`
                    }

                </div>

                <div class="cartQuantity">

                    <button
                        type="button"
                        data-cart-minus="${item.id}"
                        ${
                            item.quantity <= 1
                                ? "disabled"
                                : ""
                        }
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        type="button"
                        data-cart-plus="${item.id}"
                        ${
                            item.quantity >= item.stock
                                ? "disabled"
                                : ""
                        }
                    >
                        +
                    </button>

                    <button
                        type="button"
                        class="removeCart"
                        data-cart-remove="${item.id}"
                    >
                        Remove
                    </button>

                </div>

                <small class="remainingStock">

                    ${
                        remainingStock > 0
                            ? `${remainingStock} remaining in stock`
                            : "Maximum available quantity selected"
                    }

                </small>

            </div>

            <div class="cartSubtotal">

                ${formatPrice(item.subtotal)}

            </div>

        `;


        cartItems.appendChild(div);

    });


    if (cartTotal) {

        cartTotal.textContent =
            formatPrice(
                getCartTotal()
            );

    }

}


/* =========================================================
   CART EVENTS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const plus =
            event.target.closest(
                "[data-cart-plus]"
            );

        const minus =
            event.target.closest(
                "[data-cart-minus]"
            );

        const remove =
            event.target.closest(
                "[data-cart-remove]"
            );


        if (plus) {

            changeCartQuantity(
                plus.dataset.cartPlus,
                1
            );

            return;

        }


        if (minus) {

            changeCartQuantity(
                minus.dataset.cartMinus,
                -1
            );

            return;

        }


        if (remove) {

            removeFromCart(
                remove.dataset.cartRemove
            );

        }

    }
);


/* =========================================================
   SHOW CART
========================================================= */

function showCart() {

    const cartDrawer =
        document.getElementById(
            "cartDrawer"
        );


    if (cartDrawer) {

        cartDrawer.classList.add(
            "open"
        );

    }


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

    const cartDrawer =
        document.getElementById(
            "cartDrawer"
        );


    if (cartDrawer) {

        cartDrawer.classList.remove(
            "open"
        );

    }


    document.body.style.overflow =
        "";

}


/* =========================================================
   CART BUTTON
========================================================= */

const cartButton =
    document.getElementById(
        "cartButton"
    );


if (cartButton) {

    cartButton.addEventListener(
        "click",
        showCart
    );

}


/* =========================================================
   CLOSE CART BUTTON
========================================================= */

const cartClose =
    document.getElementById(
        "cartClose"
    );


if (cartClose) {

    cartClose.addEventListener(
        "click",
        closeCart
    );

}


/* =========================================================
   CART OVERLAY
========================================================= */

const cartOverlay =
    document.getElementById(
        "cartOverlay"
    );


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        closeCart
    );

}


/* =========================================================
   ORDER ENTIRE CART ON WHATSAPP
========================================================= */

function orderCartOnWhatsApp() {

    const items =
        getCartProducts();


    if (items.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    let message =
        `Hi GunIsh Jewels 👋\n\n` +
        `I would like to order the following jewellery:\n\n`;


    items.forEach(
        (item, index) => {

            message +=
                `${index + 1}. ${item.name}\n` +
                `Product ID: ${item.id}\n` +
                `Quantity: ${item.quantity}\n` +
                `Price: ${formatPrice(item.price)} each\n` +
                `Subtotal: ${formatPrice(item.subtotal)}\n\n`;

        }
    );


    message +=
        `--------------------------\n` +
        `Total Amount: ${formatPrice(getCartTotal())}\n\n` +
        `Please confirm availability and ordering details.\n` +
        `Thank you!`;


    const url =
        `https://wa.me/${CONFIG.whatsappNumber}?text=` +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   ORDER CART BUTTON
========================================================= */

const orderCartButton =
    document.getElementById(
        "orderCart"
    );


if (orderCartButton) {

    orderCartButton.addEventListener(
        "click",
        orderCartOnWhatsApp
    );

}


/* =========================================================
   WHATSAPP URL
========================================================= */

function createWhatsAppUrl(
    product,
    productQuantity = 1
) {

    const message =
        `Hi GunIsh Jewels 👋\n\n` +
        `I am interested in:\n\n` +
        `Product: ${product.name}\n` +
        `Product ID: ${product.id}\n` +
        `Category: ${product.category}\n` +
        `Price: ${formatPrice(product.price)}\n` +
        `Quantity: ${productQuantity}\n\n` +
        `Please confirm availability and ordering details.`;


    return (
        `https://wa.me/${CONFIG.whatsappNumber}` +
        `?text=${encodeURIComponent(message)}`
    );

}


/* =========================================================
   GENERIC WHATSAPP
========================================================= */

function createGenericWhatsAppUrl() {

    const message =
        `Hi GunIsh Jewels 👋\n\n` +
        `I would like to know more about your jewellery collection.`;


    return (
        `https://wa.me/${CONFIG.whatsappNumber}` +
        `?text=${encodeURIComponent(message)}`
    );

}


/* =========================================================
   PRODUCT CART CONTROL
========================================================= */

function createProductCartControl(product) {

    const cartQuantity =
        getCartQuantity(product.id);


    /* OUT OF STOCK */

    if (product.stock <= 0) {

        return `

            <div class="productStock outOfStock">
                OUT OF STOCK
            </div>

            <button
                type="button"
                class="addCartButton disabled"
                disabled
            >
                OUT OF STOCK
            </button>

        `;

    }


    /* PRODUCT NOT IN CART */

    if (cartQuantity === 0) {

        return `

            <div class="productStock">
                In Stock: ${product.stock}
            </div>

            <button
                type="button"
                class="addCartButton"
                data-add-cart="${product.id}"
            >
                ADD TO CART
            </button>

        `;

    }


    /* PRODUCT ALREADY IN CART */

    const remainingStock =
        product.stock - cartQuantity;


    return `

        <div class="productStock">

            <span>
                In Stock: ${product.stock}
            </span>

            <span>
                In Cart: ${cartQuantity}
            </span>

            ${
                remainingStock > 0
                    ? `<span>
                        ${remainingStock} remaining
                       </span>`
                    : `<span class="stockLimit">
                        Maximum stock selected
                       </span>`
            }

        </div>

        <div class="cardQuantity">

            <button
                type="button"
                class="cardQuantityButton"
                data-card-minus="${product.id}"
                ${
                    cartQuantity <= 1
                        ? "disabled"
                        : ""
                }
            >
                −
            </button>

            <span class="cardQuantityValue">
                ${cartQuantity}
            </span>

            <button
                type="button"
                class="cardQuantityButton"
                data-card-plus="${product.id}"
                ${
                    cartQuantity >= product.stock
                        ? "disabled"
                        : ""
                }
            >
                +
            </button>

        </div>

    `;

}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts() {

    const filteredProducts =
        products.filter(product => {

            const categoryMatch =
                currentFilter === "All" ||
                product.category ===
                    currentFilter;


            const searchMatch =
                `${product.name} ${product.category}`
                    .toLowerCase()
                    .includes(
                        currentSearch.toLowerCase()
                    );


            return (
                categoryMatch &&
                searchMatch
            );

        });


    productGrid.innerHTML = "";


    filteredProducts.forEach(
        product => {

            const article =
                document.createElement(
                    "article"
                );


            article.className =
                "card";


            article.innerHTML = `

                <button
                    class="pic"
                    data-product-id="${product.id}"
                    type="button"
                    aria-label="View ${product.name}"
                >

                    ${
                        product.badge
                            ? `<span class="badge">
                                ${product.badge}
                               </span>`
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


                        <div class="cartControl">

                            ${createProductCartControl(product)}

                        </div>

                    </div>


                    <a
                        class="wa"
                        href="${createWhatsAppUrl(product)}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WHATSAPP
                    </a>

                </div>

            `;


            productGrid.appendChild(
                article
            );

        }
    );


    emptyMessage.classList.toggle(
        "hidden",
        filteredProducts.length !== 0
    );

}


/* =========================================================
   ADD / PLUS / MINUS FROM PRODUCT CARD
========================================================= */

productGrid.addEventListener(
    "click",
    function (event) {

        /* ADD TO CART */

        const addButton =
            event.target.closest(
                "[data-add-cart]"
            );


        if (addButton) {

            const product =
                getProduct(
                    addButton.dataset.addCart
                );


            if (product) {

                addToCart(
                    product,
                    1
                );

            }

            return;

        }


        /* CARD PLUS */

        const cardPlus =
            event.target.closest(
                "[data-card-plus]"
            );


        if (cardPlus) {

            const product =
                getProduct(
                    cardPlus.dataset.cardPlus
                );


            if (product) {

                addToCart(
                    product,
                    1
                );

            }

            return;

        }


        /* CARD MINUS */

        const cardMinus =
            event.target.closest(
                "[data-card-minus]"
            );


        if (cardMinus) {

            changeCartQuantity(
                cardMinus.dataset.cardMinus,
                -1
            );

            return;

        }


        /* PRODUCT DETAILS */

        const target =
            event.target.closest(
                "[data-product-id]"
            );


        if (!target) {
            return;
        }


        if (
            event.target.closest(".wa")
        ) {
            return;
        }


        const product =
            getProduct(
                target.dataset.productId
            );


        if (product) {

            openProductModal(
                product
            );

        }

    }
);


/* =========================================================
   OPEN PRODUCT MODAL
========================================================= */

function openProductModal(product) {

    selectedProduct =
        product;


    const cartQuantity =
        getCartQuantity(
            product.id
        );


    /* Start with quantity already in cart */

    quantity =
        Math.max(
            1,
            cartQuantity || 1
        );


    /* Never exceed stock */

    quantity =
        Math.min(
            quantity,
            product.stock
        );


    modalImage.src =
        product.image;

    modalImage.alt =
        product.name;


    modalCategory.textContent =
        product.category;


    modalName.textContent =
        product.name;


    modalPrice.textContent =
        formatPrice(
            product.price
        );


    modalDescription.textContent =
        product.description;


    quantityValue.textContent =
        quantity;


    updateModalQuantityButtons();

    updateModalWhatsApp();


    modal.classList.remove(
        "hidden"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   MODAL QUANTITY BUTTON STATE
========================================================= */

function updateModalQuantityButtons() {

    if (!selectedProduct) {
        return;
    }


    if (quantityMinus) {

        quantityMinus.disabled =
            quantity <= 1;

    }


    if (quantityPlus) {

        quantityPlus.disabled =
            quantity >= selectedProduct.stock;

    }

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
   ADD TO CART FROM MODAL
========================================================= */

const modalAddCart =
    document.getElementById(
        "modalAddCart"
    );


if (modalAddCart) {

    modalAddCart.addEventListener(
        "click",
        function () {

            if (!selectedProduct) {
                return;
            }


            const currentCartQuantity =
                getCartQuantity(
                    selectedProduct.id
                );


            /*
                Only add the quantity that the
                customer selected in the modal.
            */

            const requestedTotal =
                quantity;


            const additionalQuantity =
                requestedTotal -
                currentCartQuantity;


            if (
                additionalQuantity <= 0
            ) {

                alert(
                    "This quantity is already in your cart."
                );

                return;

            }


            addToCart(
                selectedProduct,
                additionalQuantity
            );

        }
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeProductModal() {

    modal.classList.add(
        "hidden"
    );


    document.body.style.overflow =
        "";


    selectedProduct = null;

}


modalClose.addEventListener(
    "click",
    closeProductModal
);


modal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === modal
        ) {

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
            !modal.classList.contains(
                "hidden"
            )
        ) {

            closeProductModal();

        }

    }
);


/* =========================================================
   MODAL QUANTITY - MINUS
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


        updateModalQuantityButtons();

        updateModalWhatsApp();

    }
);


/* =========================================================
   MODAL QUANTITY - PLUS
========================================================= */

quantityPlus.addEventListener(
    "click",
    function () {

        if (!selectedProduct) {
            return;
        }


        if (
            quantity >=
            selectedProduct.stock
        ) {

            return;

        }


        quantity++;


        quantityValue.textContent =
            quantity;


        updateModalQuantityButtons();

        updateModalWhatsApp();

    }
);


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
            .forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


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
   COLLECTION BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".collections button"
    )
    .forEach(
        button => {

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
                        .forEach(
                            filterButton => {

                                filterButton.classList.toggle(
                                    "active",
                                    filterButton.dataset.filter ===
                                    category
                                );

                            }
                        );


                    renderProducts();


                    document
                        .getElementById(
                            "products"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                }
            );

        }
    );


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        function () {

            mobileNavigation.classList.toggle(
                "open"
            );

        }
    );

}


if (mobileNavigation) {

    mobileNavigation
        .querySelectorAll("a")
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    function () {

                        mobileNavigation.classList.remove(
                            "open"
                        );

                    }
                );

            }
        );

}


/* =========================================================
   GENERIC WHATSAPP BUTTONS
========================================================= */

const genericWhatsApp =
    createGenericWhatsAppUrl();


if (floatingWhatsApp) {

    floatingWhatsApp.href =
        genericWhatsApp;

}


if (footerWhatsApp) {

    footerWhatsApp.href =
        genericWhatsApp;

}


/* =========================================================
   INSTAGRAM
========================================================= */

const instagramLinks =
    document.querySelectorAll(
        'a[href*="instagram.com"]'
    );


instagramLinks.forEach(
    link => {

        link.href =
            CONFIG.instagram;

    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   INITIAL LOAD
========================================================= */

updateCartCount();

renderCart();

renderProducts();
```
