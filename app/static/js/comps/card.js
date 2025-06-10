/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    card.js
 * Author:      Josh Bassett
 * Date:        10/06/2025
 * Version:     1.0
 * 
 * Description: Class that creates a reusable Card Comp.
 */

import { Comp } from "../comp.js";
import { Style } from "../style.js";

class CardComp extends Comp {

    constructor() {
        super();

        this.cardTitle_  = "Card header";
        this.cardText_   = "Card text goes here.";
        this.buttonText_ = "Card Action";
        this.cardImage_  = "";

        this.compName_   = "Card";
        this.compHTML_   = this.createHTML();
        this.compCSS_    = this.createCSS();

        this.renderComp();
    }

    /**
     * @brief A setter method that sets the Comp's title.
     * 
     * @param {string} newCardTitle
     */
    set cardTitle(newCardTitle) {

        this.cardTitle_ = newCardTitle;
        this.updateComp(this.createHTML(), this.compCSS_);
    }

    /**
     * @brief A setter method that sets the Comp's text.
     * 
     * @param {string} newCompText
     */
    set cardText(newCompText) {

        this.cardText_ = newCompText;
        this.updateComp(this.createHTML(), this.compCSS_);
    }

    /**
     * @brief A setter method that sets the Comp's button text.
     * 
     * @param {string} newButtonText
     */
    set buttonText(newButtonText) {

        this.buttonText_ = newButtonText;
        this.updateComp(this.createHTML(), this.compCSS_);
    }

    /**
     * @brief A setter method that sets the Comp's button link.
     * 
     * @param {string} newButtonAction
     */
    set buttonAction(newButtonAction) {

        this.buttonAction_ = newButtonAction;
        this.updateComp(this.compHTML_, this.compCSS_);
    }

    /**
     * @brief A setter method that sets the Comp's image link.
     * 
     * @param {string} newCardImage
     */
    set cardImage(newCardImage) {

        this.cardImage_ = newCardImage;
        this.updateComp(this.createHTML(), this.compCSS_);
    }

    /**
     * @brief A getter method that returns the Comp's title.
     * 
     * @returns {string} Comp's title. 
     */
    get cardTitle() {

        return this.cardTitle_;
    }

    /**
     * @brief A getter method that returns the Comp's text.
     * 
     * @returns {string} Comp's text. 
     */
    get cardText() {
        return this.cardText_;
    }

    /**
     * @brief A getter method that returns the Comp's button text.
     * 
     * @returns {string} Comp's button text. 
     */
    get buttonText() {
        return this.buttonText_;
    }

    /**
     * @brief A getter method that returns the Comp's button link.
     * 
     * @returns {string} Comp's button link. 
     */
    get buttonAction() {
        
        return this.buttonAction_;
    }

    /**
     * @brief A getter method that returns the Comp's card image.
     * 
     * @returns {string} Comp's card image. 
     */
    get cardImage() {

        return this.cardImage_;
    }
    
    /**
     * @brief A method that builds the card's HTML.
     * 
     * @returns {literal} HTML to be injected into Comp. 
     */
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

    /**
     * @brief A method that builds the card's CSS.
     * 
     * @returns {literal} CSS to be injected into Comp.
     */
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

    /**
     * @brief A method that opens a new page
     * 
     * @param {*} cardButton 
     */
    onButtonClick(event) {

        event.preventDefault();

        const url = "https://whondo.com/" + this.buttonAction_;
        window.location.assign(url);
    }

    compHook() {
        const cardButton = this.shadowRoot.getElementById("test");
        cardButton.buttonVarient = 2;

        
        cardButton.addEventListener("click", this.onButtonClick.bind(this));
    }
}

customElements.define("comp-card", CardComp);