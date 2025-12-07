//  Mobile Menu 
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => { 
        const isOpen = mobileMenu.style.display === "flex"; 
        mobileMenu.style.display = isOpen ? "none" : "flex";
    });
}

//  Collections Page Logic 
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const colorFilter = document.getElementById("colorFilter");
const priceFilter = document.getElementById("priceFilter");
const productCards = document.querySelectorAll(".product-card.product");
const noResultsMessage = document.getElementById("noResultsMessage");

// Helper: check price range
function isPriceInRange(price, filterValue) {
    price = Number(price);
    if (filterValue === "low") {
        return price < 1000;
    } else if (filterValue === "mid") {
        return price >= 1000 && price <= 2000;
    } else if (filterValue === "high") {
        return price > 2000;
    }
    return true; // "all"
}

// Main filter function
function applyFilters() {
    if (!productCards.length) return;

    const searchText = searchInput ? searchInput.value.toLowerCase() : "";
    const categoryValue = categoryFilter ? categoryFilter.value : "all";
    const colorValue = colorFilter ? colorFilter.value : "all";
    const priceValue = priceFilter ? priceFilter.value : "all";

    let visibleCount = 0;

    productCards.forEach(card => {
        const name = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const meta = card.querySelector(".product-meta")?.textContent.toLowerCase() || "";

        const category = card.dataset.category;
        const color = card.dataset.color;
        const price = card.dataset.price;

        // Search check (name + meta)
        const matchesSearch =
            name.includes(searchText) || meta.includes(searchText);

        // Category check
        const matchesCategory =
            categoryValue === "all" || category === categoryValue;

        // Color check
        const matchesColor =
            colorValue === "all" || color === colorValue;

        // Price check
        const matchesPrice = isPriceInRange(price, priceValue);

        if (matchesSearch && matchesCategory && matchesColor && matchesPrice) {
            card.style.display = "flex";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    if (noResultsMessage) {
        noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
    }
}

// Attach listeners only if elements exist (collections page)
if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
}
if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
}
if (colorFilter) {
    colorFilter.addEventListener("change", applyFilters);
}
if (priceFilter) {
    priceFilter.addEventListener("change", applyFilters);
}

// On page load (for collections)
window.addEventListener("DOMContentLoaded", () => {
    if (productCards.length) {
        applyFilters();
    }
});
