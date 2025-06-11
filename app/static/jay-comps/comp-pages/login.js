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
        <h4>${this.title_}</h4>
        <p>${this.description_}</p>
        <comp-card id="testCard"></comp-card>
        <comp-card id="testCard2"></comp-card>
        <comp-card></comp-card>
        <comp-button id="refreshBtn">Refresh Card</comp-button>
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

        window.location.assign("https://whondo.com/register");
    
    }

    async login() {

        const email = "bassettjosh397@gmail.com";
        const pass  = "Happ1ne55";
        let array   = {email : email, password : pass};

        let data = await this.compAPI.request("/login", "POST", array);
        console.log(data['message']);
    
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

            this.fetchData();
        
        });
    
    }

    compHook() {

        const card   = this.shadowRoot.getElementById("testCard");
        const card2  = this.shadowRoot.getElementById("testCard2");
        const button = this.shadowRoot.getElementById("refreshBtn");
      
        card.cardTitle  = "Super cool title";
        card.cardText   = "Super cool card description";
        card.buttonText = "Click";
        card.cardImage  = "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?_gl=1*q46dzz*_ga*MjEyOTMwNTE2Ni4xNzQyMTQxMzY3*_ga_8JE65Q40S6*czE3NDk0ODYyOTckbzQkZzAkdDE3NDk0ODYyOTckajYwJGwwJGgw";

        card.buttonAction  = this.openWindow;
        card2.buttonAction = this.fetchData;

        this.testButton(button, card, card2);
    
    }
  
}

customElements.define("test-card-housing", LoginPageComp);