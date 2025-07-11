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

export class Button extends Comp {

    text_ = "This is a button";
    variant_ = "1";   

    /**
     * @brief A setter method that sets the Comp's button text.
     * 
     * @param {string} newText
     */
    set text(newText) {

        this.text_ = newText;
        this.update();
    
    }

    /**
     * @brief A setter method that sets the Comp's button variant (1, 2, 3).
     * 
     * @param {string} newVariant
     */
    set variant(newVariant) {

        this.variant_ = newVariant;
        this.update();
    
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
     * @brief A getter method that returns the Comp's button variant.
     * 
     * @returns {number} Comp's button variant. 
     */
    get variant() {

        return this.variant_;
    
    }
    
    createHTML() {

        
        return /* html */ `
            <button class="button">${this.text_}</button>`;
    
    }

    createCSS() {

        let button, buttonHover, buttonActive;

        const primary = this.css({
            class: "button",
            colour: "white",
            widthPercent: 100,
            background: "black100",
            padding: [12, 28],
            border: "black100",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.1s ease-in-out"
        });

        const primaryHover = this.css({
            class: "button",
            pseudoClass: "hover",
            border: "black",
            background: "black80",
        });

        const primaryActive = this.css({
            class: "button",
            pseudoClass: "active",
            border: "black60",
            background: "black60"
        });

        const secondary = this.css({
            class: "button",
            colour: "black100",
            background: "black10",
            widthPercent: 100,
            border: "border",
            padding: [12, 28],
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.1s ease-in-out"
        });

        const secondaryHover = this.css({
            class: "button",
            pseudoClass: "hover",
            background: "black20"
        });

        const secondaryActive = this.css({
            class: "button",
            pseudoClass: "active",
            background: "black40"
        });
        
        if (this.variant_ == 1) {

            button       = primary;
            buttonHover  = primaryHover;
            buttonActive = primaryActive;
        
        }
        
        else if (this.variant_ == 2) {

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

    static {

        Comp.register(this); 

    }

}

