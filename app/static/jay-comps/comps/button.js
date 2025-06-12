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

        let primary = this.compStyle.styleButton(
            "button",
            "--white",
            "--black100",
            "--black80",
            "--black60",
            false
        );

        let secondary = this.compStyle.styleButton(
            "button",
            "--black100",
            "--black20",
            "--black40",
            "--black60",
            false
        );

        let tertiary = this.compStyle.styleButton(
            "button",
            "--black100",
            "--white",
            "--black10",
            "--black20",
            true
        );
        
        if (this.buttonVarient_ == 1)      return ` ${primary}`;
        else if (this.buttonVarient_ == 2) return `${secondary}`;
        else if (this.buttonVarient_ == 3) return `${tertiary}`;
    
    }

}

customElements.define("comp-button", ButtonComp);
