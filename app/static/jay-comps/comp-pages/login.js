import { Comp } from "jay-comp";

class LoginPageComp extends Comp {

    constructor() {

        super();

        this.name_ = "Login Page";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
    
        this.render();
    
    }

    createHTML() {
    
        return /* html */ `
        
        <div class="background">

            <div class="itemContainer">

                <div class="modal">

                    <div class="textContainer">
                        <h3 class="title">Login</h3>
                        <p class="text">Welcome back! Let's find you a new home.</p>
                    </div>

                    <div class="inputs">
                        <comp-input id="email" name="email"></comp-input>
                        <comp-input id="password" name="password"></comp-input>
                    </div>

                    <div class="footer">
                        <comp-button id="submit">Refresh Card</comp-button>
                        <p class="link"><a>Forgot password?</a></p>
                    </div>
                    <p id="result"></p>
                </div>

            <div class="backgroundImage">
                <img class="image" src="https://images.pexels.com/photos/4781426/pexels-photo-4781426.jpeg">
            </div>
            </div>
            
        </div>
        `;
    
    }

    createCSS() {   

        // Background and image styling
        const background = this.design.create({
            class: "background",
            width: "100%",
            background: "black100",
            height: "100vh",
        });

        const itemContainer = this.design.create({
            class: "itemContainer",
            display: "flex",
        });

        const imageBackground = this.design.create({
            class: "backgroundImage",
            width: "100%",
            height: 3000,
            paddingLeft: 400
        });

        const image = this.design.create({
            class: "image",
            width: "100%",
            height: "100%",
            objectFit: "cover"
        });
        
        // Login modal styling
        const modal = this.design.create({
            class: "modal",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            width: 500,
            background: "white",
            position: "absolute",
            padding: 20,
            borderRadius: 14,
            marginLeft: 100,
            marginTop: 100
        });

        const inputs = this.design.create({
            class: "inputs",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 10,
            paddingTop: 20,
            paddingBottom: 40
        });

        // Link

        const link = this.design.create({
            class: "link",
            colour: "black80",
            textDecoration: "underline",
            cursor: "pointer"
        });

        const linkHover = this.design.create({
            class: "link",
            pseudoClass: "hover",
            colour: "black100"
        });

        const textContainer = this.design.create({
            class: "textContainer",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 5
        });

        const title = this.design.create({
            class: "title",
            fontWeight: "bold"
        });

        const text = this.design.create({
            class: "text",
            colour: "black60"
        });
        
        const footer = this.design.create({
            class: "footer",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            width: "100%",
            gap: 10
        });

        // Media query adjustments
        const itemContainerMob = this.design.create({
            class: "itemContainer",
            flexDirection: "column",
            alignItems: "centre"
        });

        const imageBackgroundMob = this.design.create({
            class: "backgroundImage",
            height: "40vh",
            margin: 0,
            padding: 0
        });

        const modalMob = this.design.create({
            class: "modal",
            width: "auto",
            margin: 0,
            marginTop: 200
        });
    
        return /* css */ `
        ${background}

        ${itemContainer}

        ${imageBackground}
        ${image}

        ${modal}
        ${inputs}
        ${link}
        ${linkHover}

        ${textContainer}
        ${title}
        ${text}

        ${footer}
        
        @media (max-width: 600px) {
           ${itemContainerMob}
           ${imageBackgroundMob}
           ${modalMob}
        }
        `;
    
    }

    openWindow() {

        window.location.assign("/register");
    
    }

    async login(result, json) {

        let data = await this.api.request("/login", "POST", json);
        
        (data.status) ? result.innerHTML = data.message : result.innerHTML = data.error;
    
    }

    hook() {

        const compButton = this.shadowRoot.getElementById("submit");
        const result     = this.shadowRoot.getElementById("result");
        const email      = this.shadowRoot.getElementById("email");
        const pass       = this.shadowRoot.getElementById("password");
        
        compButton.text = "Login";
        email.label     = "Email";
        email.prompt    = "Enter email";
        pass.label      = "Password";
        pass.type       = "password";
        pass.prompt     = "Enter password";

        compButton.addEventListener("click", () => {

            const jsonData = {email : email.inputValue, password : pass.inputValue};

            this.login(result, jsonData);
        
        });
    
    }
  
}

customElements.define("comp-login", LoginPageComp);