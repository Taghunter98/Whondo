import { Comp } from 'jay-comp';

export class Navbar extends Comp {

    lastScrollY = window.scrollY;

    createHTML() {

        return /* html */ `
        <div id="navbar" class="container">
            <a><h3 class="logo">Whondo</h3></a>
            <ul class="links">
                <li class="link">About</li>
                <li class="link">Landlord Portal</li>
                <li class="link">GitHub</li>
            </ul>
            <comp-icon class="menu" id="menu"></comp-icon>
            <div class="buttons">
                <comp-button id="register"></comp-button>
                <comp-button id="login"></comp-button>
            </div>
        </div>

        <div id="tray" class="tray">
            <div class="header">
                <a><h3 class="logo">Whondo</h3></a>
                <comp-icon class="close" id="close"></comp-icon>
            </div>

            <ul class="linksTray">
                <li class="link">About</li>
                <li class="link">Landlord Portal</li>
                <li class="link">GitHub</li>
            </ul>

            <div class="trayButtons">
                <comp-button id="registerMob"></comp-button>
                <comp-button id="loginMob"></comp-button>
            </div>
        </div>
        
        `;
    
    }

    createCSS() {
        
        return [
            {
                class: "container",
                top: "0",
                zIndex: "1000",
                position: "fixed",
                display: "flex",
                alignItems: "centre",
                widthPercent: 100,
                background: "white",
                boxSizing: "border-box",
                padding: [10, 20],
                justifyContent: "space-between",
                transition: ["top",  "0.4s"]
            },
            {
                class: "logo",
                fontWeight: "bold",
                media: {
                    breakpoint: 600,
                    fontSize: 28
                }
            },
            {
                class: "links",
                display: "flex",
                flexDirection: "row",
                alignItems: "centre",
                gap: 20
            },
            // Navbar links
            {
                class: "link",
                colour: "black80",
                fontSize: 16,
                padding: 10,
                border: "borderDefault",
                borderRadius: 8,
                listStyleType: "None",
                cursor: "pointer",
                transition: "background 0.1s ease-in-out"
            },
            {
                class: "link",
                colour: "black100",
                pseudoClass: "hover",
                border: "border",
                background: "black10"
            },
            {
                class: "link",
                pseudoClass: "active",
                background: "black20"
            },
            {
                class: "menu",
                display: "None",
                media: {
                    breakpoint: 600,
                    display: "block"
                }
            },
            {
                class: "close",
                display: "None",
                media: {
                    breakpoint: 600,
                    display: "block"
                }
            },
            {
                class: "buttons",
                display: "flex",
                width: "auto",
                gap: 20,
                media: {
                    breakpoint: 600,
                    display: "none"
                }
            },
            {
                class: "tray",
                display: "None"
            },
            // Media quuery adjustments
            {
                media: {
                    breakpoint: 600,
                    class: "header",
                    display: "flex",
                    alignItems: "centre",
                    justifyContent: "space-between"
                }
            },
            {
                media: {
                    breakpoint: 600,
                    class: "links",
                    display: "None"
                }
            
            },
            {
                media: {
                    breakpoint: 600,
                    class: "tray",
                    display: "flex",
                    bottom: "-500px",
                    position: "fixed",
                    zIndex: "1000",
                    boxSizing: "border-box",
                    flexDirection: "column",
                    widthPercent: 100,
                    background: "white",
                    padding: 20,
                    borderRadius: 14,
                    transition: "bottom 0.6s"
                }
            
            },
            {
                media: {
                    breakpoint: 600,
                    class: "trayButtons",
                    display: "flex",
                    gap: 10,
                    paddingTop: 40
                }
           
            }

        ];
    
    }

    /**
     * @brief Function hides/shows the navbar on scroll.
     * 
     * The function takes the current Y position of the navbar and checks if the current pixel difference is greater than 20px.
     * If so then the top is increased to hide the element then the last Y position is updated to reflect the change.
     */
    navbarScroll() {

        const navbar     = this.getById("navbar");
        const currentPos = window.scrollY;
        
        if (currentPos > this.lastScrollY && currentPos > 20) navbar.style.top = "-80px";
        else navbar.style.top = "0";
        
        this.lastScrollY = currentPos;
    
    }

    openMenu(offset) {

        const tray        = this.getById("tray");
        tray.style.bottom = offset;
    
    }

    afterRender() {
        
        const register    = this.getById("register");
        const login       = this.getById("login");
        const menu        = this.getById("menu");
        const close       = this.getById("close");
        const loginMob    = this.getById("loginMob");
        const registerMob = this.getById("registerMob");
        
        register.text       = "Register";
        register.variant    = 2;
        login.text          = "login";
        menu.path           = "menu.svg";
        close.path          = "close.svg";
        loginMob.text       = "Login";
        registerMob.text    = "Register";
        registerMob.variant = 2;

        window.addEventListener("scroll", this.navbarScroll.bind(this));

        menu.addEventListener("click", () => {

            this.openMenu("0");
        
        });

        close.addEventListener("click", () => {

            this.openMenu("-500px");
        
        });
    
    } static { Comp.register(this); } }

