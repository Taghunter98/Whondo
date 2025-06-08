import { Comp } from "./comp.js";

class Card extends Comp {
    constructor() {
        super();

        this.compName_ = "Card";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();
    }

    createHTML() {
        return `
        <div class="container">
            <h2>This is a Card</h2>
            <p>This is some cool text</p>
            <comp-button id="test" class="test"></comp-button>
        </div>
        `
    }

    createCSS() {
        return `
        .container {
            display: flex;
            flex-direction: column;
            padding: 20px;
        }
        `
    }

    connectedCallback() {
        this.renderComponent();

        const cardButton = this.shadowRoot.getElementById("test");
        cardButton.buttonText = "Card Button";

        cardButton.onclick = () => this.debugComponent();
    }
}

customElements.define("comp-card", Card);