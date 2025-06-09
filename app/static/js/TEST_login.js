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
