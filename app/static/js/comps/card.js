import { Comp } from "../comp.js";
import { Style } from "../style.js";

class CardComp extends Comp {
    constructor() {
        super();

        this.cardTitle_ = "Card header";
        this.cardText_  = "Card text goes here.";
        this.buttonText_ = "Card Action";
        this.cardImage_ = "";
        
        this.compName_ = "Card";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();

        this.renderComp();
    }

    set cardTitle(value) {
        this.cardTitle_ = value;
        this.updateComp(this.createHTML(), this.compCSS_);
    }

    set cardText(value) {
        this.cardText_ = value;
        this.updateComp(this.createHTML(), this.compCSS_);
    }

    set buttonText(value) {
        this.buttonText_ = value;
        this.updateComp(this.createHTML(), this.compCSS_);
    }

    set buttonAction(value) {
        this.buttonAction_ = value;
        this.updateComp(this.compHTML_, this.compCSS_);
    }

    set cardImage(value) {
        this.cardImage_ = value;
        this.updateComp(this.createHTML(), this.compCSS_);
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
        
        let cardStyle = style.styleCard(
            "container", 
            "column", 
            500, 
            15,
            20,
            true
        );

        let textCardStyle = style.styleCard(
            "textContainer", 
            "column", 
            500, 
            0, 
            5, 
            false
        );

        return `
        ${cardStyle}
        ${textCardStyle}
        `
    }

    cardAction(cardButton) {
        const URL = "https://whondo.com/" + this.buttonAction_;
        cardButton.onclick = () => window.location.href = URL;
    }

    compHook() {
        const cardButton = this.shadowRoot.getElementById("test");
        cardButton.buttonVarient = 2;

        this.cardAction(cardButton);
    }
}

customElements.define("comp-card", CardComp);