/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    comp.js
 * Author:      Josh Bassett
 * Date:        08/06/2025
 * Version:     1.0
 * 
 * Description: Base component class that handles all inner component logic.
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
     * @brief A setter method that sets the component's name.
     * 
     * @param {string} newComponentName  
     */
    set compName(newComponentName) {

        this.name_ = newComponentName;
    }

    /**
     * @brief A setter method that sets the component's HTML value.
     * 
     * @param {string} newComponentHTML  
     */
    set compHTML(newComponentHTML) {

        this.compHTML_ = newComponentHTML;
    }

    /**
     * @brief A setter method that sets the component's CSS value.
     * 
     * @param {string} newComponentCSS  
     */
    set compCSS(newComponentCSS) {

        this.compCSS_ = newComponentCSS;
    }

    /**
     * @brief A getter method that returns the component's name.
     * 
     * @returns {string} Component's name value
     */
    get compName() {

        return this.compName_;
    }

    /**
     * @brief A getter method that returns the component's HTML value.
     * 
     * @returns {string} Component's HTML value
     */
    get compHTML() {

        return this.compHTML_;
    }

    /**
     * @brief A getter method that returns the component's CSS value.
     * 
     * @returns {string} Component's CSS value
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
     * @brief A method for debugging a component, logs the component's base values.
     */
    debugComponent() {

        console.log("DEBUG COMPONENT: " + this.compName + "\n")
        console.log(this.compName);
        console.log(this.compHTML);
        console.log(this.compCSS);
        console.log("\n");
    }

    /**
     * @brief A method for rendering the component. Method starts by setting the shadow root HTML
     *        to the template built by createTemplate(). Then it checks for an internal onRender()
     *        function which in turn calls  
     */
    renderComponent() {

        this.shadowRoot.innerHTML = this.createTemplate(this.compHTML_, this.compCSS_);

        if (typeof this.onRender === "function") {
            this.onRender();
        }
    }

    /**
     * @brief A method for updating the component, simply calls render component with the updated
     *        HTML and CSS values.
     * 
     * @param {string} newHTML 
     * @param {string} newCSS 
     */
    updateComponent(newHTML, newCSS) {

        this.compHTML_ = newHTML;
        this.compCSS_  = newCSS;

        this.renderComponent();
    }

}