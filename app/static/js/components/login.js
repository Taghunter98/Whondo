import '../components/card.js';

class TestCardHousing extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    
    this.innerHTML = `
      <comp-card id="testCard"></comp-card>
      <button id="refreshBtn">Refresh Card</button>
    `;

    
    const card = document.getElementById("testCard");
    const btn = document.getElementById("refreshBtn");

      
    card.cardTitle = "Normal Title";
    card.cardText = "Card description";
    card.buttonText = "Click to change";

    btn.addEventListener("click", () => {
        
        card.cardTitle = "New TITLE";
        card.cardText = "New Text";
        if (card && typeof card.refreshComponent === "function") {
          card.refreshComponent();
          console.log("refreshComponent was called on comp-card.");
        } else {
          console.error("refreshComponent is not defined on comp-card", card);
        }
      });
  }
}

customElements.define("test-card-housing", TestCardHousing);
