/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    comp.js
 * Author:      Josh Bassett
 * Date:        08/06/2025
 * Version:     1.0
 * 
 * Description: Base Comp class that handles all Comp inner logic.
 */

import { Style } from "./style.js";
import  { API } from "./api.js";

export class Comp extends HTMLElement {

    constructor() {

        super();

        this.compName_ = "Component Name";
        this.compHTML_ = "";
        this.compCSS_  = "";
        this.compStyle = new Style();
        this.compAPI   = new API();

        this.attachShadow({ mode: "open" });
    
    }

    /**
     * @brief A setter method that sets the Comp's name.
     * 
     * @param {string} newCompName  
     */
    set compName(newCompName) {

        this.name_ = newCompName;
    
    }

    /**
     * @brief A setter method that sets the Comp's HTML value.
     * 
     * @param {string} newCompHTML  
     */
    set compHTML(newCompHTML) {

        this.compHTML_ = newCompHTML;
    
    }

    /**
     * @brief A setter method that sets the Comp's CSS value.
     * 
     * @param {string} newCompCSS  
     */
    set compCSS(newCompCSS) {

        this.compCSS_ = newCompCSS;
    
    }

    /**
     * @brief A getter method that returns the Comp's name.
     * 
     * @returns {string} Comp's name value
     */
    get compName() {

        return this.compName_;
    
    }

    /**
     * @brief A getter method that returns the Comp's HTML value.
     * 
     * @returns {string} Comp's HTML value
     */
    get compHTML() {

        return this.compHTML_;
    
    }

    /**
     * @brief A getter method that returns the Comp's CSS value.
     * 
     * @returns {string} Comp's CSS value
     */
    get compCSS() {

        return this.compCSS_;
    
    }

    /**
     * @brief A method that creates an HTML template to be rendered.
     * 
     * @param   {string} html 
     * @param   {string} css 
     * 
     * @returns {literal} HTML template string literal 
     */
    createTemplate(html, css) {

        return /* html */ `
        ${html}
        <style>
            ${this.compStyle.styleDefaultComp()}
            ${css}
        </style>
        `;
    
    }

    /**
     * @brief A method for debugging a Comp, logs the Comp's base values.
     */
    debugComp() {

        console.log("DEBUG COMP: " + this.compName + "\n");
        console.log(this.compName);
        console.log(this.compHTML);
        console.log(this.compCSS);
        console.log("\n");
    
    }

    /**
     * @brief A method for rendering the Comp. 
     *          
     * Method starts by setting the `shadowRoot` HTML to the template built by `createTemplate()`.
     * Then it checks for an internal `compHook()` function which defines the Comp's inner 
     * JavaScript logic. 
     */
    renderComp() {

        this.shadowRoot.innerHTML = this.createTemplate(this.compHTML_, this.compCSS_);

        if (typeof this.compHook === "function") {

            this.compHook();
        
        }
    
    }

    /**
     * @brief A method for updating the Comp's HTML/CSS.
     * 
     * This Method simply updates Comp with the new values. Then renders the Comp.
     * 
     * @example
     * // To update -> HTML
     * const newHTML = this.createHTML();
     * this.updateComp(newHTML, this.compCSS_);
     *        
     * // To update -> CSS
     * const newCSS = this.createCSS();
     * this.updateComp(this.compHTML_, newCSS);
     * 
     * @param {literal} newHTML 
     * @param {literal} newCSS 
     */
    updateComp(newHTML, newCSS) {

        this.compHTML_ = newHTML;
        this.compCSS_  = newCSS;

        this.renderComp();
    
    }

    /**
   * @brief A method to create an HTML template for the Comp.
   *
   * This method should be overridden in your Comp to return the Comp’s HTML markup.
   * By enforcing an override, we ensure that every Comp provides its own structure.
   * 
   * - Ensure all Comp HTML objects are prefaced with `comp-`
   *
   * @abstract
   * @returns {string}
   *
   * @example
   * createHTML() {
   *     return `
   *         <div class="comp-object">
   *             <h1>Hello, World!</h1>
   *         </div>
   *     `;
   * }
   */
    createHTML() {

        throw new Error("Method 'createHTML()' must be overridden in the derived component.");
    
    }

    /**
   * @brief A method to create the CSS style for the component.
   *
   * This method should be overridden in your derived component to return the CSS rules
   * that will be injected into the component's `shadow DOM`. Use `Style` to generate CSS with
   * `styleCompCSS()`.
   *
   * @abstract
   * @returns {string} 
   *
   * @example
   * createCSS() {
   *         
   *     const cssConfig = this.compStyle.styleCompCSS {
   *         valueID: "container",
   *         psuedoClass: "hover",
   *         display: "flex",
   *         // Omitted values...
   *     });
   * 
   *     return `${cssConfig}`; // Return the string literal
   * }
   */
    createCSS() {

        throw new Error("Method 'createCSS()' must be overridden in the derived component.");
    
    }

}