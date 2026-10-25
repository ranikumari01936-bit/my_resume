const sitePreview = document.getElementById("site-preview");
const previewButtons = document.querySelectorAll("[data-preview-size]");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const navigationLinks = document.querySelectorAll(".sidebar a[href^=\"#\"]");
const contactForm = document.getElementById("contact-form");

previewButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const isMobile = button.dataset.previewSize === "mobile";

        sitePreview.classList.toggle("is-mobile", isMobile);
        sidebar.classList.remove("active");
        sidebarToggle.setAttribute("aria-expanded", "false");
        sidebarToggle.setAttribute("aria-label", "Open navigation");

        previewButtons.forEach((previewButton) => {
            previewButton.setAttribute("aria-pressed", String(previewButton === button));
        });
    });
});

sidebarToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("active");

    sidebarToggle.setAttribute("aria-expanded", String(isOpen));
    sidebarToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));

        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });

        if (!sidebar.contains(anchor)) {
            return;
        }

        if (anchor.matches("ul a")) {
            navigationLinks.forEach((link) => link.removeAttribute("aria-current"));
            anchor.setAttribute("aria-current", "page");
        }

        sidebar.classList.remove("active");
        sidebarToggle.setAttribute("aria-expanded", "false");
        sidebarToggle.setAttribute("aria-label", "Open navigation");
    });
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    window.alert("Thanks for reaching out!");
});
