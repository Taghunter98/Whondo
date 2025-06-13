/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    button.js
 * Author:      Josh Bassett
 * Date:        10/06/2025
 * Version:     1.0
 * 
 * Description: Class that creates a reusable Button Comp.
 */

import { Comp }  from '../comp-src/comp.js';

class ButtonComp extends Comp {

    constructor() {

        super();                                                    

        this.buttonText_    = "This is a button";
        this.buttonVarient_ = 1;    
        
        this.compName_ = "Button";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();

        this.renderComp();
    
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
     * @brief A setter method that sets the Comp's button varient (1, 2, 3).
     * 
     * @param {string} newButtonVarient
     */
    set buttonVarient(newButtonVarient) {

        this.buttonVarient_ = newButtonVarient;
        this.updateComp(this.compHTML_, this.createCSS());
    
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
     * @brief A getter method that returns the Comp's button varient.
     * 
     * @returns {number} Comp's button varient. 
     */
    get buttonVarient() {

        return this.buttonVarient_;
    
    }

    /**
     * @brief A method that builds the button's HTML.
     * 
     * @returns {literal} HTML to be injected into Comp. 
     */
    createHTML() {

        return /* html */ `<button id="button" class="button">${this.buttonText_}</button>`;
    
    }

    /**
     * @brief A method that builds the button's CSS.
     * 
     * @returns {literal} CSS to be injected into Comp.
     */
    createCSS() {

        let button, buttonHover, buttonActive;

        const primary = this.compStyle.styleCompCSS({
            valueID: "button",
            colour: "white",
            background: "black100",
            padding: "9px 16px",
            border: false,
            borderRadius: 8,
            cursor: "pointer",
            transition: "background 0.1s ease-in-out"
        });

        const primaryHover = this.compStyle.styleCompCSS({
            valueID: "button:hover",
            background: "black80"
        });

        const secondary = this.compStyle.styleCompCSS({
            valueID: "button",
            colour: "black100",
            background: "black20",
            padding: "9px 16px",
            border: false,
            borderRadius: 8,
            cursor: "pointer",
            transition: "background 0.1s ease-in-out"
        });

        const secondaryHover = this.compStyle.styleCompCSS({
            valueID: "button:hover",
            background: "black40"
        });

        let tertiary;
        
        if (this.buttonVarient_ == 1)      button = primary, buttonHover = primaryHover;
        else if (this.buttonVarient_ == 2) button = secondary, buttonHover = secondaryHover;
        else if (this.buttonVarient_ == 3) button = tertiary;

        return `
        ${button}
        ${buttonHover}
        `;
    
    }

}

customElements.define("comp-button", ButtonComp);
