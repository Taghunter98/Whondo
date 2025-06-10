import { Comp } from './comp.js';
import { Style } from './style.js';

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
    <h1>${this.title_}</h1>
    <comp-card id="testCard"></comp-card>
    <comp-card id="testCard2"></comp-card>
    <comp-button id="refreshBtn">Refresh Card</comp-button>
    `
  }

  createCSS() {
    const style = new Style();
    
    return `
    ${style.stylePage()}
    `;
  }

  testButton(button, card, card2) {
    button.addEventListener("click", () => {
        
      card.cardTitle = "New TITLE";
      card.cardText = "New Text";
      card2.cardTitle = "TEST";
      card2.cardText = "This is cool text";

      if (card.cardTitle === "New TITLE") {
          console.log("Card Title updated successsfully");
      } else {
          console.log("Update failed");
      } 
    });
  }

  compHook() {
    const card = this.shadowRoot.getElementById("testCard");
    const card2 = this.shadowRoot.getElementById("testCard2");
    const button = this.shadowRoot.getElementById("refreshBtn");
      
    card.cardTitle = "Super cool title";
    card.cardText = "Super cool card description";
    card.buttonText = "Click";
    card.cardImage = "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?_gl=1*q46dzz*_ga*MjEyOTMwNTE2Ni4xNzQyMTQxMzY3*_ga_8JE65Q40S6*czE3NDk0ODYyOTckbzQkZzAkdDE3NDk0ODYyOTckajYwJGwwJGgw";

    card2.cardImage = "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?_gl=1*rhtkzi*_ga*MjEyOTMwNTE2Ni4xNzQyMTQxMzY3*_ga_8JE65Q40S6*czE3NDk1MDAwMDEkbzYkZzEkdDE3NDk1MDAwMjUkajM2JGwwJGgw"

    this.testButton(button, card, card2);
  }
  
}

customElements.define("test-card-housing", LoginPageComp);