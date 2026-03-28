document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuLabel = document.querySelector(".menu-toggle__text");
    const siteNav = document.querySelector("#site-nav");
    const footerYear = document.querySelector("[data-year]");
    const mobileNav = window.matchMedia("(max-width: 860px)");

    const syncYear = () => {
        if (footerYear) {
            footerYear.textContent = new Date().getFullYear();
        }
    };

    const setMenuState = (isOpen) => {
        if (!menuToggle || !siteNav) {
            return;
        }

        const shouldLockBody = mobileNav.matches && isOpen;

        siteNav.dataset.visible = mobileNav.matches ? String(isOpen) : "true";
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        if (menuLabel) {
            menuLabel.textContent = isOpen ? "Close" : "Menu";
        }

        document.body.classList.toggle("menu-open", shouldLockBody);
    };

    const syncMenuToViewport = () => {
        if (!menuToggle || !siteNav) {
            return;
        }

        if (mobileNav.matches) {
            setMenuState(false);
        } else {
            siteNav.dataset.visible = "true";
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");

            if (menuLabel) {
                menuLabel.textContent = "Menu";
            }

            document.body.classList.remove("menu-open");
        }
    };

    syncYear();
    syncMenuToViewport();

    if (!menuToggle || !siteNav) {
        return;
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = siteNav.dataset.visible === "true";
        setMenuState(!isOpen);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            if (mobileNav.matches) {
                setMenuState(false);
            }
        });
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && siteNav.dataset.visible === "true" && mobileNav.matches) {
            setMenuState(false);
        }
    });

    if (typeof mobileNav.addEventListener === "function") {
        mobileNav.addEventListener("change", syncMenuToViewport);
    } else if (typeof mobileNav.addListener === "function") {
        mobileNav.addListener(syncMenuToViewport);
    }
});
