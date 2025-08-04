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

    cardTitle_; cardText_; buttonText_; buttonAction_; cardImage_; imageHTML_;
       
    set cardTitle(v) {
        this.cardTitle_ = v;
        this.update();
    }
    set cardText(v) {
        this.cardText_ = v;
        this.update();
    }
    set buttonText(v) {
        this.buttonText_ = v;
        this.update();
    }
    set buttonAction(v) {
        this.buttonAction_ = v;
        this.update();
    }
    set cardImage(v) {
        this.cardImage_ = v;
        this.update();
    }
    set imageHTML(v){
        this.imageHTML_ = v;
        this.update();
    }

    get cardTitle()    { return this.cardTitle_; }
    get cardText()     { return this.cardText_; }
    get buttonText()   { return this.buttonText_; }
    get buttonAction() { return this.buttonAction_; }
    get cardImage()    { return this.cardImage_; }
    get innerHTML() { return this.imageHTML_; }

    beforeRender(){
        if (!this.cardTitle_) this.cardTitle_ = "Card header";
        if (!this.cardText_) this.cardText_ = "Card text goes here.";
        if (!this.buttonText_) this.buttonText_ = "Card Action";
        if (!this.buttonAction_) this.buttonAction_ = this.debug;
        if (!this.cardImage_) this.cardImage_    = "";
    }
    
    createHTML() {
        imageHTML_;

        if (this.cardImage_) this.imageHTML_ = /* html */`<img src="${this.cardImage_}">`;

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