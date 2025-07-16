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

    text_;
    variant_;   

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

    beforeRender(){
        if (!this.text_) this.text_ = "this is button";
        if (!this.variant_) this.variant_ = 1;
    }
    
    createHTML() {

        
        return /* html */ `
            <button class="button">${this.text}</button>`;
    
    }

    createCSS() {

        let button, buttonHover, buttonActive;

        const primary = {
            class: "button",
            colour: "white",
            widthPercent: 100,
            backgroundVar: "black100",
            padding: [12, 28],
            borderVar: "black100",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
            transition: ["background", "0.1s", "ease-in-out"]
        };

        const primaryHover = {
            class: "button",
            pseudoClass: "hover",
            border: "black",
            backgroundVar: "black80",
        };

        const primaryActive = {
            class: "button",
            pseudoClass: "active",
            borderVar: "black60",
            backgroundVar: "black60"
        };

        const secondary = {
            class: "button",
            colourVar: "black100",
            backgroundVar: "black10",
            widthPercent: 100,
            borderVar: "border",
            padding: [12, 28],
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
            transition: ["background", "0.1s", "ease-in-out"]
        };

        const secondaryHover = ({
            class: "button",
            pseudoClass: "hover",
            backgroundVar: "black20"
        });

        const secondaryActive = ({
            class: "button",
            pseudoClass: "active",
            backgroundVar: "black40"
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

        return [button, buttonHover, buttonActive];

    }

    static { Comp.register(this); }

}

