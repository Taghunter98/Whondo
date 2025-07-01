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

        this.buttonText_    = "This is a button";
        this.buttonVarient_ = 1;    
        
        this.name_ = "Button";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    /**
     * @brief A setter method that sets the Comp's button text.
     * 
     * @param {string} newButtonText
     */
    set buttonText(newButtonText) {

        this.buttonText_ = newButtonText;
        this.update(this.createHTML(), this.css_);
    
    }

    /**
     * @brief A setter method that sets the Comp's button varient (1, 2, 3).
     * 
     * @param {string} newButtonVarient
     */
    set buttonVarient(newButtonVarient) {

        this.buttonVarient_ = newButtonVarient;
        this.update(this.html_, this.createCSS());
    
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
    
    createHTML() {

        return /* html */ `<button id="button" class="button" part="button">${this.buttonText_}</button>`;
    
    }

    createCSS() {

        let button, buttonHover, buttonActive;

        const primary = this.design.create({
            class: "button",
            colour: "white",
            background: "black100",
            padding: "12px 28px",
            border: "black100",
            borderRadius: 8,
            cursor: "pointer",
            width: "100%",
            fontSize: 16,
            transition: "background 0.1s ease-in-out",
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

        const longButton = this.design.create({
            class: "button",
            width: "100%",
            padding: "14px 24px",
            textAlign: "centre",
            colour: "white",
            background: "black100",
            border: "border",
            borderRadius: 8,
            cursor: "pointer",
            transition: "background 0.1s ease-in-out",
        });

        let tertiary;
        
        if (this.buttonVarient_ == 1) {

            button       = primary;
            buttonHover  = primaryHover;
            buttonActive = primaryActive;
        
        }
        else if (this.buttonVarient_ == 2) {

            button       = secondary;
            buttonHover  = secondaryHover;
            buttonActive = secondaryActive;
        
        }

        else if (this.buttonVarient_ == 3) {

            button = tertiary;
        
        }

        else if (this.buttonVarient_ == 4) {

            button       = longButton;
            buttonHover  = primaryHover;
            buttonActive = primaryActive;
        
        }

        return `
        ${button}
        ${buttonHover}
        ${buttonActive}
        `;
    
    }

}

customElements.define("comp-button", ButtonComp);