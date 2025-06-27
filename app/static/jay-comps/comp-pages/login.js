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

                    <comp-input id="email" name="email"></comp-input>
                    <comp-input id="password" name="password"></comp-input>

                    <comp-button id="submit">Refresh Card</comp-button>
                
                    <p class="link"><a>Forgot password?</a></p>
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
            height: "100vh",
            paddingLeft: 300
        });

        const image = this.design.create({
            class: "image",
            width: "100%",
            height: "100%",
            objectFit: "cover"
        });

        const modal = this.design.create({
            class: "modal",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            width: 500,
            background: "white",
            position: "absolute",
            padding: 20,
            gap: 20,
            borderRadius: 14,
            marginLeft: 250,
            marginTop: 250
        });

        const link = this.design.create({
            class: "link",
            textDecoration: "underline"
        });

        const textContainer = this.design.create({
            class: "textContainer",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 10
        });

        const title = this.design.create({
            class: "title",
            fontWeight: "bold"
        });

        const text = this.design.create({
            class: "text",
            colour: "black60"
        });
        
    
        return /* css */ `
        ${background}

        ${itemContainer}

        ${imageBackground}
        ${image}

        ${modal}
        ${link}

        ${textContainer}
        ${title}
        ${text}
        
        @media (max-width: 600px) {
           
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
        
        compButton.buttonText = "Login";
        email.inputLabel      = "Email";
        email.inputPrompt     = "Enter email";
        pass.inputLabel       = "Password";
        pass.inputType        = "password";
        pass.inputPrompt      = "Enter password";

        compButton.addEventListener("click", () => {

            const jsonData = {email : email.inputValue, password : pass.inputValue};

            this.login(result, jsonData);
        
        });
    
    }
  
}

customElements.define("comp-login", LoginPageComp);