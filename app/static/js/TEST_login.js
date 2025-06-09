import './components/TEST_card.js';

class TestCardHousing extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    
    this.innerHTML = `
      <comp-card id="testCard"></comp-card>
      <comp-card id="testCard2"></comp-card>
      <comp-button id="refreshBtn">Refresh Card</comp-button>
    `;

    
    const card = document.getElementById("testCard");
    const card2 = document.getElementById("testCard2");
    const btn = document.getElementById("refreshBtn");

      
    card.cardTitle = "Super cool title";
    card.cardText = "Super cool card description";
    card.buttonText = "Click";
    card.cardImage = "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?_gl=1*q46dzz*_ga*MjEyOTMwNTE2Ni4xNzQyMTQxMzY3*_ga_8JE65Q40S6*czE3NDk0ODYyOTckbzQkZzAkdDE3NDk0ODYyOTckajYwJGwwJGgw";

    btn.addEventListener("click", () => {
        
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
}

customElements.define("test-card-housing", TestCardHousing);
