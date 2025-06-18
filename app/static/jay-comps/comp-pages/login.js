import { Comp } from "jay-comp";

class LoginPageComp extends Comp {

    constructor() {

        super();
        
        this.title_ = "Login to Whondo";

        this.name_ = "Login Page";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
    
        this.render();
    
    }

    createHTML() {
    
        return /* html */ `
        <div class="background">
            <div class="container">
                <h3>${this.title_}</h3>

                <comp-input id="email" name="email"></comp-input>
                <comp-input id="password" name="password"></comp-input>

                <comp-button id="submit">Refresh Card</comp-button>
                <p id="result"></p>
            </div>
            
        </div>
        `;
    
    }

    createCSS() {

        const animation = this.effect.prop("slideUp", .5);

        const background = this.design.create({
            class: "background",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "50px 0px",
            alignItems: "centre",
            border: false,
            gap: 0,
            background: "black10",
        });

        const backgroundMobile = this.design.create({
            class: "background",
            padding: 20,
            width: "auto"
        });

        const container = this.design.create({
            class: "container",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            maxWidth: 500,
            padding: 20,
            alignItems: "start",
            border: "border",
            borderRadius: 16,
            gap: 15,
            background: "white",
            animation: animation
        });
    
        return /* css */ `
        
        ${background}
        
        ${container}
        
        @media (max-width: 600px) {
            ${backgroundMobile}
        }
        `;
    
    }

    openWindow() {

        window.location.assign("/register");
    
    }

    async login(result, json) {

        let data = await this.api.request("/login", "POST", json);
        console.log(data);
        console.log(data.status);
        if (data.error) result.innerHTML = data.error;
    
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

customElements.define("test-card-housing", LoginPageComp);