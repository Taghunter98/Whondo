import { Comp } from 'jay-comp';

export class Navbar extends Comp {

    lastScrollY = window.scrollY;

    createHTML() {
        return /* html */`
            <nav id="navbar" class="container">
                <h3 style="font-weight: bold;">Whondo</h3>
                <comp-nav-links></comp-nav-links>
                <comp-menu-icon class="menu" id="menu"></comp-menu-icon>

                <comp-auth-profile class="desktop-profile"></comp-auth-profile>
                
            </nav>

            <div id="tray" class="tray">
                <div class="header">
                    <h3 style="font-weight: bold;">Whondo</h3>
                    <comp-close-icon class="close" id="close"></comp-close-icon>
                </div>

                <comp-mob-nav-links></comp-mob-nav-links>
                <comp-auth-profile></comp-auth-profile>
            </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "container",
                top: 0,
                left: 0,
                zIndex: 1000,
                position: "fixed",
                display: "flex",
                alignItems: "center",
                widthPercent: 100,
                background: "white",
                boxSizing: "border-box",
                padding: [10, 20],
                justifyContent: "space-between",
                transform: "translateY(0)",
                transition: "transform 0.4s ease"
            },
            {
                class: "menu",
                display: "none",
                media: { maxWidthBp: 600, display: "block" }
            },
            {
                class: "close",
                display: "none",
                media: { maxWidthBp: 600, display: "block" }
            },
            {
                class: "mob-links",
                display: "none",
                media: { maxWidthBp: 600, display: "block" }
            },
            {
                media: {
                    maxWidthBp: 600,
                    class: "desktop-profile",
                    display: "none"
                }
            },
            {
                class: "tray",
                display: "none"
            },
            {
                media: {
                    maxWidthBp: 600,
                    class: "tray",
                    display: "flex",
                    bottom: -500,
                    position: "fixed",
                    zIndex: 1000,
                    boxSizing: "border-box",
                    flexDirection: "column",
                    widthPercent: 100,
                    background: "white",
                    padding: 20,
                    borderRadius: 14,
                    boxShadow: [0, 4, 23, 0, "var(--black20)"],
                    transition: ["bottom", "0.6s", "ease"]
                }
            },
            {
                media: {
                    maxWidthBp: 600,
                    class: "trayButtons",
                    display: "flex",
                    gap: 10,
                    paddingTop: 40
                }
            },
            {
                media: {
                    maxWidthBp: 600,
                    class: "header",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }
            },
            {
                media: {
                    maxWidthBp: 600,
                    class: "mob-links",
                    display: "block"
                }
            }
        ];
    }

    navbarScroll() {
        const navbar = this.getById("navbar");
        const currentY = window.scrollY;
        const delta = currentY - this.lastScrollY;

        if (delta > 10 && currentY > 50) navbar.style.transform = "translateY(-100%)";
        else if (delta < -10) navbar.style.transform = "translateY(0)";

        this.lastScrollY = currentY;
    }

    menu(offset) {
        const tray = this.getById("tray");
        tray.style.bottom = offset;
    }

    afterRender() {
        const menu = this.getById("menu");
        const close = this.getById("close");

        this.lastScrollY = window.scrollY;
        window.addEventListener("scroll", () => this.navbarScroll());

        menu.addEventListener("click", () => this.menu("0"));
        close.addEventListener("click", () => this.menu("-500px"));
    }

    static { Comp.register(this); }
}