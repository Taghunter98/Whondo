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

        const background = this.compStyle.styleContainer(
            "column",
            "auto",
            "auto",
            100,
            "center",
            0,
            false,
            0,
            "--black10"
        );

        const container = this.compStyle.styleContainer(
            "column",
            "auto",
            500,
            20,
            "start",
            16,
            true,
            15,
            "--white"
        );

        const inputs = this.compStyle.styleContainer(
            "column",
            "100%",
            500,
            0,
            "start",
            0,
            false,
            20,
            "--white"
        );
    
        return /* css */ `
        .background {
            ${background}
        }
        .container {
            ${container}
        }
        .inputs {
            ${inputs}
        }
        @media (max-width: 600px) {
            .background {
                width: auto;
                padding: 20px;
            }
            .container {
                width: auto;
            }
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