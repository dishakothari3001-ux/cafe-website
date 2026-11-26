// =================================
// MIST & MOCHA CAFÉ
// JAVASCRIPT (shared by all pages)
// =================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (navLinks.classList.contains("show")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }

    });

    // Close mobile menu after clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            const icon = menuToggle.querySelector("i");
            icon.classList.replace("fa-xmark", "fa-bars");

        });

    });

}


// 2. NAVBAR SCROLL EFFECT

const navbar = document.querySelector(".navbar");

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

window.addEventListener("scroll", updateNavbar);
updateNavbar();


// 3. ACTIVE NAVIGATION LINK (home page only)
// Highlights Home / Experience while scrolling. Other pages set
// their active link directly in the HTML.

const navItems = document.querySelectorAll(".nav-links a");

if (document.getElementById("home")) {

    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const activeLink = document.querySelector(
                '.nav-links a[href="#' + entry.target.id + '"]'
            );

            // Only change the highlight when a nav link matches this section
            if (activeLink) {
                navItems.forEach(link => link.classList.remove("active"));
                activeLink.classList.add("active");
            }

        });

    }, {
        threshold: 0.3
    });

    sections.forEach(section => {
        observer.observe(section);
    });

}


// 4. MENU PAGE FILTER TABS

const menuTabs = document.querySelectorAll(".menu-tab");
const menuGroups = document.querySelectorAll(".menu-group");

function filterMenu(filter) {

    menuTabs.forEach(tab => {
        tab.classList.toggle("active", tab.dataset.filter === filter);
    });

    menuGroups.forEach(group => {
        const show = filter === "all" || group.id === filter;
        group.classList.toggle("hidden", !show);
    });

}

if (menuTabs.length) {

    menuTabs.forEach(tab => {
        tab.addEventListener("click", function () {
            filterMenu(tab.dataset.filter);
        });
    });

    // Support links like menu.html#desserts from the home page
    const hash = window.location.hash.replace("#", "");

    if (hash && document.querySelector('.menu-tab[data-filter="' + hash + '"]')) {
        filterMenu(hash);
        const target = document.getElementById(hash);
        if (target) {
            target.scrollIntoView();
        }
    }

}


// 5. CONTACT FORM -> WHATSAPP
// There is no server, so the form opens WhatsApp with the message filled in.
// Change the number below to your real WhatsApp number (country code, no + or spaces).

const WHATSAPP_NUMBER = "919999999999";

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const data = new FormData(contactForm);

        const lines = [
            "Hi Mist & Mocha!",
            "",
            "Name: " + data.get("name"),
            data.get("phone") ? "Phone: " + data.get("phone") : "",
            "Regarding: " + data.get("subject"),
            "",
            data.get("message")
        ].filter((line, i) => line !== "" || i === 1 || i === 5);

        const url = "https://wa.me/" + WHATSAPP_NUMBER +
                    "?text=" + encodeURIComponent(lines.join("\n"));

        window.open(url, "_blank", "noopener");

    });

}


// 6. CONSOLE MESSAGE

console.log("Welcome to Mist & Mocha Café!");
console.log("A Little Escape in Every Sip.");
