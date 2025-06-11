import { Comp } from '../comp-src/comp.js';
import { API  } from '../comp-src/api.js';

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
    <h4>${this.title_}</h4>
    <p>${this.description_}</p>
    <comp-card id="testCard"></comp-card>
    <comp-card id="testCard2"></comp-card>
    <comp-button id="refreshBtn">Refresh Card</comp-button>
    `;
    }

    createCSS() {
    
        return `
    `;
    }

    testButton(button, card, card2) {
        button.addEventListener("click", () => {
        
            card.cardTitle  = "New TITLE";
            card.cardText   = "New Text";
            card2.cardTitle = "TEST";
            card2.cardText  = "This is cool text";

            if (card.cardTitle === "New TITLE") {
                console.log("Card Title updated successsfully");
            } else {
                console.log("Update failed");
            } 

            const email = "bassettjosh397@gmail.com";
            const pass  = "Happ1ne55";
            let array   = {email : email, passsword : pass};

            const api  = new API("https://catfact.ninja/fact", array, "GET");
            const data = api.request();
            console.log(data.fact);
        });
    }

    compHook() {
        const card   = this.shadowRoot.getElementById("testCard");
        const card2  = this.shadowRoot.getElementById("testCard2");
        const button = this.shadowRoot.getElementById("refreshBtn");
      
        card.cardTitle    = "Super cool title";
        card.cardText     = "Super cool card description";
        card.buttonText   = "Click";
        card.buttonAction = "register";
        card.cardImage    = "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?_gl=1*q46dzz*_ga*MjEyOTMwNTE2Ni4xNzQyMTQxMzY3*_ga_8JE65Q40S6*czE3NDk0ODYyOTckbzQkZzAkdDE3NDk0ODYyOTckajYwJGwwJGgw";

        card2.buttonAction = "/";
        card2.cardImage    = "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?_gl=1*rhtkzi*_ga*MjEyOTMwNTE2Ni4xNzQyMTQxMzY3*_ga_8JE65Q40S6*czE3NDk1MDAwMDEkbzYkZzEkdDE3NDk1MDAwMjUkajM2JGwwJGgw";

        this.testButton(button, card, card2);
    }
  
}

customElements.define("test-card-housing", LoginPageComp);