import { Comp } from 'jay-comp';

class Navbar extends Comp {

    constructor() {

        super();

        this.name_ = "Navbar";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
        
        this.render();
    
    }

    createHTML() {

        return /* html */ `
        <div class="container">
            <a><h3 class="logo">Whondo</h3></a>
            <ul class="links">
                <li class="link">About</li>
                <li class="link">Landlord Portal</li>
                <li class="link">GitHub</li>
            </ul>
            <img class="menu" src="/app/static/icons/menu.png">
            <div class="buttons">
                <comp-button id="register"></comp-button>
                <comp-button id="login"></comp-button>
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
            justifyContent: "space-between"
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

        const buttons = this.design.create({
            class: "buttons",
            display: "flex",
            width: "auto",
            gap: 20
        });

        // Media quuery adjustments
        const logoMob = this.design.create({
            class: "logo",
            fontSize: 28
        });

        const linksMob = this.design.create({
            class: "links",
            display: "None"
        });

        const menuMob = this.design.create({
            class: "menu",
            display: "block"
        });

        const buttonsMob = this.design.create({
            class: "buttons",
            display: "None"
        });

        return /* css */`
        ${container}

        ${logo}

        ${links}
        ${link}
        ${linkHover}
        ${linkActive}

        ${menu}
        ${buttons}

        @media (max-width: 600px) {
            ${logoMob}
            ${linksMob}
            ${menuMob}
            ${buttonsMob}
        }
        `;
    
    }

    hook() {

        const register = this.shadowRoot.getElementById("register");
        const login    = this.shadowRoot.getElementById("login");
        
        register.text    = "Register";
        register.varient = 2;
        login.text       = "login";
    
    }

}

customElements.define("comp-navbar", Navbar);