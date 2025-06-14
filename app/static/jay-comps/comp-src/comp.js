/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    comp.js
 * Author:      Josh Bassett
 * Date:        08/06/2025
 * Version:     1.2
 * 
 * Description: Base Comp class that handles all Comp inner logic.
 */

import { Style } from "./style.js";
import  { API } from "./api.js";
import { Animation } from "./animation.js";

export class Comp extends HTMLElement {

    constructor() {

        super();

        this.name_   = "Component Name";
        this.html_   = "";
        this.css_    = "";
        this.design  = new Style();
        this.api     = new API();
        this.animate = new Animation();

        this.attachShadow({ mode: "open" });
    
    }

    /**
     * @brief Getter and Setter methods for Comp values.
     */

    set name(newCompName) {

        this.name_ = newCompName;
    
    }
    set html(newCompHTML) {

        this.html_ = newCompHTML;
    
    }
    set css(newCompCSS) {

        this.css_ = newCompCSS;
    
    }
    get name() {

        return this.name_;
    
    }
    get html() {

        return this.html_;
    
    }
    get css() {

        return this.css_;
    
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
            ${this.design.defaultComp()}
            ${css}
        </style>
        `;
    
    }

    /**
     * @brief A method for debugging a Comp, logs the Comp's base values.
     */
    debug() {

        console.log("DEBUG COMP: " + this.compName + "\n");
        console.log(this.compName);
        console.log(this.compHTML);
        console.log(this.compCSS);
    
    }

    /**
     * @abstract
     * A method for rendering the Comp. 
     *          
     * Method starts by setting the `shadowRoot` HTML to the template built by `createTemplate()`.
     * Then it checks for an internal `compHook()` function which defines the Comp's inner 
     * JavaScript logic.
     */
    render() {

        this.shadowRoot.innerHTML = this.createTemplate(this.html_, this.css_);

        if (typeof this.hook === "function") {

            this.hook();
        
        }
    
    }

    /**
     * @abstract
     * A method for updating the Comp's HTML/CSS.
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
    update(newHTML, newCSS) {

        this.html_ = newHTML;
        this.css_  = newCSS;

        this.render();
    
    }

    /**
     * @abstract
     * A method to create an HTML template for the Comp.
     *
     * This method should be overridden in your Comp to return the Comp’s HTML markup.
     * By enforcing an override, we ensure that every Comp provides its own structure.
     * 
     * - Ensure all Comp HTML objects are prefaced with `comp-`
     *
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
     * @abstract
     * A method to create the CSS style for the Comp.
     *
     * This method should be overridden in your derived component to return the CSS rules
     * that will be injected into the component's `shadow DOM`. Use `Style` to generate CSS with
     * `styleCompCSS()`.
     *
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

    /**
     * @abstract
     * A build hook for the Comp's inner JavaScript to be injected when rendered.
     *
     * This method should be overridden in your derived component to create the internal JavaScript
     * logic, such as setting Comp values, calling methods or adding event listeners.
     *
     * @example
     * hook() {
     * 
     *    // Grab Comp instances from Shadow DOM
     *    const button     = this.shadowRoot.getElementById("submit");
     *    const result     = this.shadowRoot.getElementById("result");
     *    const email      = this.shadowRoot.getElementById("email");
     *    const pass       = this.shadowRoot.getElementById("password");
     *    
     *    // Internal Comps are styled here
     *    button.buttonText     = "Login";
     *    email.inputLabel      = "Email";
     *    email.inputPrompt     = "Enter email";
     *    pass.inputLabel       = "Password";
     *    pass.inputType        = "password";
     *    pass.inputPrompt      = "Enter password";
     * 
     *    // Create event listener to run internal method
     *    button.addEventListener("click", () => {
     *    
     *        const jsonData = {email : email.inputValue, password : pass.inputValue};
     * 
     *        this.login(result, jsonData);
     *    
     *    });
     * }
     */
    hook() {

        throw new Error("Method 'compHook()' must be overridden in the derived component.");
    
    }

}