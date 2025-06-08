import { Comp } from "../comp.js";

class Card extends Comp {
    constructor() {
        super();

        this.cardTitle_ = "This is a card";
        this.cardText_  = "Lorem ipsum dolor sit amet";
        this.buttonText_ = "Register";

        this.compName_ = "Card";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();

    }

    set cardTitle(value) {
        this.cardTitle_ = value;
        console.log("Setting cardTitle...")
        const newHTML = this.createHTML();
        this.updateComponent(newHTML, this.compCSS_);
    }

    set cardText(value) {
        this.cardText_ = value;
        console.log("Setting cardText...")
        const newHTML = this.createHTML();
        this.updateComponent(newHTML, this.compCSS_);
    }

    set buttonText(value) {
        console.log("Setting buttonText...")
        this.buttonText_ = value;
        const newHTML = this.createHTML();
        this.updateComponent(newHTML, this.compCSS_);
    }

    get cardTitle() {
        return this.cardTitle_;
    }

    get cardText() {
        return this.cardText_;
    }

    get buttonText() {
        return this.buttonText_;
    }

    createHTML() {
        return /* html */ `
        <div class="container">
            <h2>${this.cardTitle_}</h2>
            <p>${this.cardText_}</p>
            <comp-button id="test" class="test"></comp-button>
        </div>
        `
    }

    createCSS() {
        return /* css */ `
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

    onRender() {
        const cardButton = this.shadowRoot.getElementById("test");
        cardButton.buttonText = this.buttonText_;
        cardButton.onclick = () => console.log("Button clicked");

        // cardButton.addEventListener("click", () => {
        //     console.log("Click time");
        // })
    }

    connectedCallback() {
        this.renderComponent();
    }
}

customElements.define("comp-card", Card);