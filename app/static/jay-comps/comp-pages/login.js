import { Comp } from '../comp-src/comp.js';

class LoginPageComp extends Comp {

    constructor() {

        super();
        
        this.title_       = "Login to Whondo";
        this.description_ = "This is placeholder text";

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
                <p>${this.description_}</p>

                <comp-input id="name" name="email"></comp-input>
                <comp-input id="password" name="password"></cop-input>
                    
                </div>

                <comp-button id="submit">Refresh Card</comp-button>
        </div>
        <p id="result"></p>
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
            0
        );

        const container = this.compStyle.styleContainer(
            "column",
            "50%",
            "500px",
            20,
            "start",
            16,
            true,
            15
        );
    
        return /* css */ `
        .background {
            ${background}
        }
        .container {
            ${container}
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

    async fetchData() {

        let data = await this.compAPI.request("https://catfact.ninja/fact", "GET");
        
        console.log(data['fact']);
    
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
        
        compButton.buttonText = "Login";

        compButton.addEventListener("click", () => {

            const email    = this.shadowRoot.getElementById("email").value;
            const pass     = this.shadowRoot.getElementById("password").value;
            const jsonData = {email : email, password : pass};

            this.login(result, jsonData);
        
        });
    
    }
  
}

customElements.define("test-card-housing", LoginPageComp);