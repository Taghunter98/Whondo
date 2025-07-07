import { Comp } from 'jay-comp';

class Navbar extends Comp {

    constructor() {

        super();

        this.lastScrollY = window.scrollY;

        this.name_ = "Navbar";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
        
        this.render();
    
    }

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

        const container = this.design.create({
            class: "container",
            top: "0",
            zIndex: "1000",
            position: "fixed",
            display: "flex",
            alignItems: "centre",
            width: "100%",
            background: "white",
            boxSizing: "border-box",
            padding: "10px 20px",
            justifyContent: "space-between",
            transition: "top 0.4s"
        });

        const logo = this.design.create({
            class: "logo",
            fontWeight: "bold"
        });

        const links = this.design.create({
            class: "links",
            display: "flex",
            flexDirection: "row",
            alignItems: "centre",
            gap: 20
        });

        // Navbar links
        const link = this.design.create({
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

        const linkHover = this.design.create({
            class: "link",
            colour: "black100",
            pseudoClass: "hover",
            border: "border",
            background: "black10"
        });

        const linkActive = this.design.create({
            class: "link",
            pseudoClass: "active",
            background: "black20"
        });

        const menu = this.design.create({
            class: "menu",
            display: "None",
        });

        const close = this.design.create({
            class: "close",
            display: "None",
        });

        const buttons = this.design.create({
            class: "buttons",
            display: "flex",
            width: "auto",
            gap: 20
        });

        const hideTray = this.design.create({
            class: "tray",
            display: "None"
        });

        // Media quuery adjustments
        const header = this.design.create({
            class: "header",
            display: "flex",
            alignItems: "centre",
            justifyContent: "space-between"
        });

        const logoMob = this.design.create({
            class: "logo",
            fontSize: 28
        });

        const linksMob = this.design.create({
            class: "links",
            display: "None"
        });

        const buttonsMob = this.design.create({
            class: "buttons",
            display: "None"
        });

        const menuMob = this.design.create({
            class: "menu",
            display: "block",
        });

        const closeMob = this.design.create({
            class: "close",
            display: "block",
        });

        const tray = this.design.create({
            class: "tray",
            display: "flex",
            bottom: "-500px",
            position: "fixed",
            zIndex: "1000",
            boxSizing: "border-box",
            flexDirection: "column",
            width: "100%",
            background: "white",
            padding: 20,
            borderRadius: 14,
            transition: "bottom 0.6s"
        });

        const trayButtons = this.design.create({
            class: "trayButtons",
            display: "flex",
            gap: 10,
            paddingTop: 40
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

        @media (max-width: 600px) {
            ${header}
            ${logoMob}
            ${linksMob}
            ${buttonsMob}
            ${menuMob}
            ${closeMob}
            ${tray}
            ${trayButtons}
        }
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

}

customElements.define("comp-navbar", Navbar);