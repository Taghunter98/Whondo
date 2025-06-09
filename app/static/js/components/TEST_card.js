import { Comp } from "../comp.js";
import { Style } from "../style.js";

class Card extends Comp {
    constructor() {
        super();

        this.cardTitle_ = "Card header";
        this.cardText_  = "Card text goes here.";
        this.buttonText_ = "Card Action";
        this.cardImage_ = "";
        
        this.compName_ = "Card";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();
    }

    set cardTitle(value) {
        this.cardTitle_ = value;
        const newHTML = this.createHTML();
        this.updateComponent(newHTML, this.compCSS_);
    }

    set cardText(value) {
        this.cardText_ = value;
        const newHTML = this.createHTML();
        this.updateComponent(newHTML, this.compCSS_);
    }

    set buttonText(value) {
        this.buttonText_ = value;
        const newHTML = this.createHTML();
        this.updateComponent(newHTML, this.compCSS_);
    }

    set cardImage(value) {
        this.cardImage_ = value;
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
        let imageHTML = '';

        if (this.cardImage_) imageHTML = /* html */`<img src="${this.cardImage_}">`;

        return /* html */ `
        <div class="container">
            ${imageHTML}
            <div class="textContainer">
                <h2>${this.cardTitle_}</h2>
                <p>${this.cardText_}</p>
            </div>
            <comp-button id="test" class="test"></comp-button>
        </div>
        `
    }

    createCSS() {
        const style = new Style();
        
        let cardStyle = style.styleCard("container", "column", 500, 20, 15, true);
        let textCardStyle = style.styleCard("textContainer", "column", 500, 0, 5);

        return /* css */ `
        ${cardStyle}
        ${textCardStyle}
        `
    }

    cardAction(cardButton) {
        cardButton.onclick = () => console.log("Button clicked");
    }

    onRender() {
        const cardButton = this.shadowRoot.getElementById("test");
        cardButton.buttonVarient = 2;

        this.cardAction(cardButton);
    }

    connectedCallback() {
        this.renderComponent();
    }
}

customElements.define("comp-card", Card);