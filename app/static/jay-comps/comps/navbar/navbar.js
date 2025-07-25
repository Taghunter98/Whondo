import { Comp } from 'jay-comp';

export class Navbar extends Comp {

    lastScrollY = window.scrollY;

    async fetchProfile() {
        return await this.request("/verify/me", "GET")
            .then(res => (res.ok ? res.data : Promise.reject(res.error)));
    }

    createHTML() {
        const { value: profile } = this.fetchOnce("profile", () => this.fetchProfile());

        const pictureURL = profile
            ? `/uploads?path=${profile.profilePicture}`
            : "";

        return /* html */`
            <nav id="navbar" class="container">
            <h3 class="logo">Whondo</h3>
            <ul id="links" class="links"></ul>
            <comp-icon class="menu" id="menu"></comp-icon>

            <div class="buttons">
                ${profile
                ? `<img class="profile" src="${pictureURL}">`
                : `<comp-button id="register">Register</comp-button>
                    <comp-button id="login">Login</comp-button>`}
            </div>
            </nav>

            <aside id="tray" class="tray">
            <header class="header">
                <h3 class="logo">Whondo</h3>
                <comp-icon class="close" id="close"></comp-icon>
            </header>

            <ul id="linksTray" class="linksTray"></ul>

            <div class="trayButtons">
                ${profile
                ? `<img class="profile" src="${pictureURL}">`
                : `<comp-button id="registerMob">Register</comp-button>
                    <comp-button id="loginMob">Login</comp-button>`}
            </div>
            </aside>
        `;
    }

    createCSS() {
        return [
            this.effect.fadeIn(),
            { class: "container",
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
                transition: "transform 0.4s ease",
                animation: this.effect.prop("fadeIn", 1, "ease-in-out")
            },
            { class: "links",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                media: { maxWidthBp: 600, display: "none" }
            },
            { class: "menu, close",
                display: "none",
                media: { maxWidthBp: 600, display: "block" }
            },
            { class: "buttons",
                display: "flex",
                width: "auto",
                gap: 20,
                media: { maxWidthBp: 600, display: "none" }
            },
            { class: "tray",
                display: "none"
            },
            {
            media: { maxWidthBp: 600,
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
                transition: ["bottom", "0.6s", "ease"]
            }
            },
            {
            media: { maxWidthBp: 600,
                class: "trayButtons",
                display: "flex",
                gap: 10,
                paddingTop: 40
            }
            },
            { class: "profile",
                width: 45,
                height: 45,
                borderVar: "border",
                borderRadiusPercent: 50
            },
            {
            media: { maxWidthBp: 600,
                class: "header",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        ];
    }

    navbarScroll() {
        const navbar = this.getById("navbar");
        const currentY = window.scrollY;
        const delta = currentY - this.lastScrollY;

        if (delta > 10 && currentY > 50)  navbar.style.transform = "translateY(-100%)";
        else if (delta < -10) navbar.style.transform = "translateY(0)";

        this.lastScrollY = currentY;
    }


    openMenu(offset) {
        const tray = this.getById("tray");
        tray.style.bottom = offset;
    }

    afterRender() {
        this.lastScrollY = window.scrollY;
        window.addEventListener("scroll", this.navbarScroll.bind(this));

        const register = this.getById("register");
        const login = this.getById("login");
        const menu = this.getById("menu");
        const close = this.getById("close");
        const loginMob = this.getById("loginMob");
        const registerMob = this.getById("registerMob");
        
        const desktopList = this.getById("links");
        const trayList = this.getById("linksTray");
        const labels = ["About", "Landlord Portal", "GitHub"];

        labels.forEach(label => {
            // Desktop links
            const dLink = document.createElement("comp-link");
            dLink.text = label;
            desktopList.appendChild(dLink);

            // Tray links
            const tLink = document.createElement("comp-link");
            tLink.text = label;
            trayList.appendChild(tLink);
        });
        
        if (register || login || registerMob || loginMob) {
            register.text = "Register";
            register.variant = 2;
            login.text = "login";
            loginMob.text = "Login";
            registerMob.text = "Register";
            registerMob.variant = 2;
        }
       
        menu.path = "menu.svg";
        close.path = "close.svg";

        menu.addEventListener("click", () => this.openMenu("0"));
        close.addEventListener("click", () => this.openMenu("-500px"));
    } 
    
    static { Comp.register(this); } 
}