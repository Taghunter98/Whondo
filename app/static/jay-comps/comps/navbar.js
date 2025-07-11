import { Comp } from 'jay-comp';

export class Navbar extends Comp {

    lastScrollY = window.scrollY;
    name_ = "Navbar";
    
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

        const container = this.css({
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
            transition: "top 0.4s"
        });

        const logo = this.css({
            class: "logo",
            fontWeight: "bold",
            media: {
                breakpoint: 600,
                fontSize: 28
            }
        });

        const links = this.css({
            class: "links",
            display: "flex",
            flexDirection: "row",
            alignItems: "centre",
            gap: 20
        });

        // Navbar links
        const link = this.css({
            class: "link",
            colour: "black80",
            fontSize: 16,
            padding: 10,
            border: "borderDefault",
            borderRadius: 8,
            listStyleType: "None",
            cursor: "pointer",
            transition: "background 0.1s ease-in-out"
        });

        const linkHover = this.css({
            class: "link",
            colour: "black100",
            pseudoClass: "hover",
            border: "border",
            background: "black10"
        });

        const linkActive = this.css({
            class: "link",
            pseudoClass: "active",
            background: "black20"
        });

        const menu = this.css({
            class: "menu",
            display: "None",
            media: {
                breakpoint: 600,
                display: "block"
            }
        });

        const close = this.css({
            class: "close",
            display: "None",
            media: {
                breakpoint: 600,
                display: "block"
            }
        });

        const buttons = this.css({
            class: "buttons",
            display: "flex",
            width: "auto",
            gap: 20,
            media: {
                breakpoint: 600,
                display: "none"
            }
        });

        const hideTray = this.css({
            class: "tray",
            display: "None"
        });

        // Media quuery adjustments
        const header = this.css({
            media: {
                breakpoint: 600,
                class: "header",
                display: "flex",
                alignItems: "centre",
                justifyContent: "space-between"
            }
        });

        const linksMob = this.css({
            media: {
                breakpoint: 600,
                class: "links",
                display: "None"
            }
            
        });

        const tray = this.css({
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
            
        });

        const trayButtons = this.css({
            media: {
                breakpoint: 600,
                class: "trayButtons",
                display: "flex",
                gap: 10,
                paddingTop: 40
            }
           
        });

        return /* css */`
        ${container}

        ${logo}

        ${links}
        ${link}

        /* Hide Icons */
        ${menu}
        ${close}

        ${linkHover}
        ${linkActive}

        ${menu}
        ${buttons}
        ${hideTray}
        ${header}
        ${linksMob}
        ${tray}
        ${trayButtons}

        `;
    
    }

    /**
     * @brief Function hides/shows the navbar on scroll.
     * 
     * The function takes the current Y position of the navbar and checks if the current pixel difference is greater than 20px.
     * If so then the top is increased to hide the element then the last Y position is updated to reflect the change.
     */
    navbarScroll() {

        const navbar     = this.shadowRoot.getElementById("navbar");
        const currentPos = window.scrollY;
        
        if (currentPos > this.lastScrollY && currentPos > 20) navbar.style.top = "-80px";
        else navbar.style.top = "0";
        
        this.lastScrollY = currentPos;
    
    }

    openMenu(offset) {

        const tray        = this.shadowRoot.getElementById("tray");
        tray.style.bottom = offset;
    
    }

    hook() {
        
        const register    = this.shadowRoot.getElementById("register");
        const login       = this.shadowRoot.getElementById("login");
        const menu        = this.shadowRoot.getElementById("menu");
        const close       = this.shadowRoot.getElementById("close");
        const loginMob    = this.shadowRoot.getElementById("loginMob");
        const registerMob = this.shadowRoot.getElementById("registerMob");
        
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
    
    }

    static {

        Comp.register(this); 

    }

}

