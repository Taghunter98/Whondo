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

import { Comp } from "jay-comp";

class ButtonComp extends Comp {

    constructor() {

        super();                                                    

        this.text_    = "This is a button";
        this.varient_ = 1;    
        
        this.name_ = "Button";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    /**
     * @brief A setter method that sets the Comp's button text.
     * 
     * @param {string} newText
     */
    set text(newText) {

        this.text_ = newText;
        this.update(this.createHTML(), this.css_);
    
    }

    /**
     * @brief A setter method that sets the Comp's button varient (1, 2, 3).
     * 
     * @param {string} newVarient
     */
    set varient(newVarient) {

        this.varient_ = newVarient;
        this.update(this.html_, this.createCSS());
    
    }
    
    /**
     * @brief A getter method that returns the Comp's button text.
     * 
     * @returns {string} Comp's button text. 
     */
    get text() {

        return this.text_;
    
    }

    /**
     * @brief A getter method that returns the Comp's button varient.
     * 
     * @returns {number} Comp's button varient. 
     */
    get varient() {

        return this.varient_;
    
    }
    
    createHTML() {

        return /* html */ `<button id="button" class="button">${this.text_}</button>`;
    
    }

    createCSS() {

        let button, buttonHover, buttonActive;

        const primary = this.design.create({
            class: "button",
            colour: "white",
            width: "100%",
            background: "black100",
            padding: "12px 28px",
            border: "black100",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.1s ease-in-out"
        });

        const primaryHover = this.design.create({
            class: "button",
            pseudoClass: "hover",
            border: "black",
            background: "black80",
        });

        const primaryActive = this.design.create({
            class: "button",
            pseudoClass: "active",
            border: "black60",
            background: "black60"
        });

        const secondary = this.design.create({
            class: "button",
            colour: "black100",
            background: "black10",
            width: "100%",
            border: "border",
            padding: "12px 28px",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.1s ease-in-out"
        });

        const secondaryHover = this.design.create({
            class: "button",
            pseudoClass: "hover",
            background: "black20"
        });

        const secondaryActive = this.design.create({
            class: "button",
            pseudoClass: "active",
            background: "black40"
        });
        
        if (this.varient_ == 1) {

            button       = primary;
            buttonHover  = primaryHover;
            buttonActive = primaryActive;
        
        }
        else if (this.varient_ == 2) {

            button       = secondary;
            buttonHover  = secondaryHover;
            buttonActive = secondaryActive;
        
        }

        return `
        ${button}
        ${buttonHover}
        ${buttonActive}
        `;
    
    }

}

customElements.define("comp-button", ButtonComp);