/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    comp.js
 * Author:      Josh Bassett
 * Date:        08/06/2025
 * Version:     1.0
 * 
 * Description: Base comp class that handles all comp inner logic.
 */

export class Comp extends HTMLElement {
    
    constructor() {
        super();
        
        this.compName_ = "Component Name";
        this.compHTML_ = "";
        this.compCSS_  = "";

        this.attachShadow({ mode: "open"});
    }

    /**
     * @brief A setter method that sets the comp's name.
     * 
     * @param {string} newCompName  
     */
    set compName(newCompName) {

        this.name_ = newCompName;
    }

    /**
     * @brief A setter method that sets the comp's HTML value.
     * 
     * @param {string} newCompHTML  
     */
    set compHTML(newCompHTML) {

        this.compHTML_ = newCompHTML;
    }

    /**
     * @brief A setter method that sets the comp's CSS value.
     * 
     * @param {string} newCompCSS  
     */
    set compCSS(newCompCSS) {

        this.compCSS_ = newCompCSS;
    }

    /**
     * @brief A getter method that returns the comp's name.
     * 
     * @returns {string} comp's name value
     */
    get compName() {

        return this.compName_;
    }

    /**
     * @brief A getter method that returns the comp's HTML value.
     * 
     * @returns {string} comp's HTML value
     */
    get compHTML() {

        return this.compHTML_;
    }

    /**
     * @brief A getter method that returns the comp's CSS value.
     * 
     * @returns {string} comp's CSS value
     */
    get compCSS() {

        return this.compCSS_;
    }
    
    /**
     * @brief A method that creates an HTML template to be rendered.
     * .
     * @param   {string} html 
     * @param   {string} css 
     * @returns {string literal} HTML template string literal 
     */
    createTemplate(html, css) {

        return /* html */ `
        ${html}
        <style>${css}</style>
        `
    }

    /**
     * @brief A method for debugging a comp, logs the comp's base values.
     */
    debugComp() {

        console.log("DEBUG COMP: " + this.compName + "\n")
        console.log(this.compName);
        console.log(this.compHTML);
        console.log(this.compCSS);
        console.log("\n");
    }

    /**
     * @brief A method for rendering the comp. Method starts by setting the shadow root HTML
     *        to the template built by createTemplate(). Then it checks for an internal onRender()
     *        function which in turn calls  
     */
    renderComp() {

        this.shadowRoot.innerHTML = this.createTemplate(this.compHTML_, this.compCSS_);

        if (typeof this.compHook === "function") {
            this.compHook();
        }
    }

    /**
     * @brief A method for updating the comp, simply calls render comp with the updated
     *        HTML and CSS values.
     * 
     * @param {string} newHTML 
     * @param {string} newCSS 
     */
    updateComp(newHTML, newCSS) {

        this.compHTML_ = newHTML;
        this.compCSS_  = newCSS;

        this.renderComp();
    }

}