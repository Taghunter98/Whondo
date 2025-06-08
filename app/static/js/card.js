import { Comp } from "./comp.js";

class Card extends Comp {
    constructor() {
        super();

        this.cardTitle_ = "This is a card";
        this.cardText_  = "Lorem ipsum dolor sit amet";
        this.buttonText_ = "Register";

        this.compName_ = "Card";
        this.compHTML_ = this.createHTML(this.cardTitle_, this.cardText_);
        this.compCSS_  = this.createCSS();

        this.renderComponent();
    }

    set cardTitle(value) {
        this.cardTitle = value;
        const newHTML = this.createHTML(this.cardTitle_);
        this.updateComponent(newHTML, this.compCSS_);
    }

    createHTML() {
        return `
        <div class="container">
            <h2>${this.cardTitle_}</h2>
            <p>${this.cardText_}</p>
            <comp-button id="test" class="test"></comp-button>
        </div>
        `
    }

    createCSS() {
        return `
        h2, p {
            margin: 0;
            padding: 0;
        }
        .container {
            display: flex;
            flex-direction: column;
            padding: 20px;
            max-width: 500px;
            border-radius: 8px;
            border: solid 2px black;
            gap: 20px;
        }
        `
    }

    connectedCallback() {
        this.renderComponent();

        const cardButton = this.shadowRoot.getElementById("test");
        cardButton.buttonText = this.buttonText_;

        // cardButton.onclick = () => this.debugComponent();

        cardButton.addEventListener("click", () => {
            console.log("Click time");
        })

        cardButton.onmouseover = () => {
            alert("Hover time");
        }
    }
}

customElements.define("comp-card", Card);