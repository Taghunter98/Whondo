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

import { Comp } from "jay-comp";

export class Card extends Comp { 

    cardTitle_;
    cardText_;
    buttonText_;
    buttonAction_;
    cardImage_;
       
    /**
     * @brief A setter method that sets the Comp's title.
     * 
     * @param {string} newCardTitle
     */
    set cardTitle(newCardTitle) {
       
        this.cardTitle_ = newCardTitle;
        this.update();
    
    }

    /**
     * @brief A setter method that sets the Comp's text.
     * 
     * @param {string} newCompText
     */
    set cardText(newCompText) {

        this.cardText_ = newCompText;
        this.update();
    
    }

    /**
     * @brief A setter method that sets the Comp's button text.
     * 
     * @param {string} newButtonText
     */
    set buttonText(newButtonText) {

        this.buttonText_ = newButtonText;
        this.update();
    
    }

    /**
     * @brief A setter method that sets the Comp's button link.
     * 
     * @param {string} newButtonAction
     */
    set buttonAction(newButtonAction) {

        this.buttonAction_ = newButtonAction;
        this.update();
    
    }

    /**
     * @brief A setter method that sets the Comp's image link.
     * 
     * @param {string} newCardImage
     */
    set cardImage(newCardImage) {

        this.cardImage_ = newCardImage;
        this.update();
    
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

    beforeRender(){
        if (!this.cardTitle_) this.cardTitle_ = "Card header";
        if (!this.cardText_) this.cardText_ = "Card text goes here.";
        if (!this.buttonText_) this.buttonText_ = "Card Action";
        if (!this.buttonAction_) this.buttonAction_ = this.debug;
        if (!this.cardImage_) this.cardImage_    = "";
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
        <div class="cardContainer">
            ${imageHTML}
            <div class="textContainer">
                <h2>${this.cardTitle_}</h2>
                <p>${this.cardText_}</p>
            </div>
            <comp-button id="button"></comp-button>
        </div>
        `;
    
    }

    /**
     * @brief A method that builds the card's CSS.
     * 
     * @returns {literal} CSS to be injected into Comp.
     */
    createCSS() {
        return [
            {
                valueID: "cardContainer",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                widthPercent: 100, 
                maxWidth: 500, 
                padding: 20,
                alignItems: "start",
                border: true,
                borderRadius: 15,
                gap: 20,
                background: "white"
            },
            {
                valueID: "textContainer",
                direction: "column", 
                widthPercent: 100,
                maxWidth: 500, 
                padding: 0, 
                alignItems: "start", 
                border: false
            }
        ];
    }

    /**
     * @brief A method that opens a new page, with Safari support.
     * 
     * @param {any} event 
     */
    onButtonClick(event) {

        event.preventDefault();
 
        this.buttonAction_();
    
    }

    /**
     * @brief A method that runs a build hook when the Component is rendered it
     *        provides the inner JavaScript logic for the Comp. 
     */
    hook() {

        const cardButton   = this.getById("button");
        cardButton.variant = 2;

        cardButton.addEventListener("click", this.onButtonClick.bind(this));
    
    }

    static { Comp.register(this); }

}

