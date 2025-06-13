import { Comp } from '../comp-src/comp.js';

class LoginPageComp extends Comp {

    constructor() {

        super();
        
        this.title_ = "Login to Whondo";

        this.compName_ = "Login Page";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();
    
        this.renderComp();
    
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

        const fadeIn          = this.compStyle.animation.fadeIn();
        const fadeInAnimation = this.compStyle.animation.addAnimationProp("fadeInAnimation", 2);

        const background = this.compStyle.styleCompCSS({
            valueID: "background",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "50px 0px",
            alignItems: "center",
            border: false,
            gap: 0,
            background: "black10",
        });

        const backgroundMobile = this.compStyle.styleCompCSS({
            valueID: "background",
            padding: 20,
            width: "auto"
        });

        const container = this.compStyle.styleCompCSS({
            valueID: "container",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            maxWidth: 500,
            padding: 20,
            alignItems: "start",
            border: true,
            borderRadius: 16,
            gap: 15,
            background: "white",
            animation: fadeInAnimation
        });
    
        return /* css */ `
        ${fadeIn}
        
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

        let data = await this.compAPI.request("/login", "POST", json);
        
        (data.status) ? result.innerHTML = data.message : result.innerHTML = data.error;
    
    }

    compHook() {

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