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
        <h3>${this.title_}</h3>
        <p>${this.description_}</p>
        <!-- <comp-card id="testCard"></comp-card> -->
        <input type="text" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <comp-button id="submit">Refresh Card</comp-button>
        <p id="result"></p>
        `;
    
    }

    createCSS() {
    
        return `
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

            const email = this.shadowRoot.getElementById("email").value;
            const pass  = this.shadowRoot.getElementById("password").value;
            let json    = {email : email, password : pass};

            this.login(result, json);
        
        });
    
    }
  
}

customElements.define("test-card-housing", LoginPageComp);