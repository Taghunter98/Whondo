/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    style.js
 * Author:      Josh Bassett
 * Date:        09/06/2025
 * Version:     1.1
 * 
 * Description: Base style class for CSS injection for components.
 */

import { Animation } from "./animation.js";

export class Style {

    constructor() {

        this.animation = new Animation();
    
    }

    /**
     * @brief A method that provides standard CSS to remove all margin/padding. The host
     *        settings ensure that shadow DOM child elements are rendered as blocks.
     * 
     * @returns {literal} CSS default values with no margin/padding.
     */
    styleDefaultComp() {

        return  /* css */ `
        * {
            margin: 0;
            padding: 0;
        }
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }
        h1 {
            font-size:   57px;
            font-weight: 500;
            line-height: 64pt;
            
        }
        h2 {
            font-size:   45px;
            font-weight: 500;
            line-height: 52pt;
        }
        h3 {
            font-size:   36px;
            font-weight: 500;
            line-height: 44pt;
        }
        h4 {
            font-size:   32px;
            font-weight: 400;
            line-height: 40pt;
        }
        h5 {
            font-size:   28px;
            font-weight: 400;
            line-height: 36pt;
        }
        h6 {
            font-size:   24px;
            font-weight: 400;
            line-height: 32pt;
        }
        p {
            font-size:   16px;
            font-weight: 400;
            line-height: 24pt;
        }
        label {
            font-size:   12px;
            font-weight: 500;
            line-height: 16pt;
        }

        ${this.animation.pulse()}
        ${this.animation.scale()}
        ${this.animation.slideUp(20)}
        ${this.animation.slideDown(-20)}
        ${this.animation.fadeIn()}
        ${this.animation.fadeOut()}
        ${this.animation.fadeLeft(-20)}
        ${this.animation.fadeRight(20)}
        ${this.animation.fadeOutLeft(-20)}
        ${this.animation.fadeOutRight(20)}
        `;
    
    }

    /**
     * Converts a camelCase string to kebab-case.
     *
     * @param {string} variableName
     * 
     * @returns {string} CSS friendly variable name
     */
    parseVariableName(variableName) {

        return variableName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    }

    /**
     * @brief A method that converts British to American English for CSS compliance.
     * 
     * @param {string | number} value 
     * 
     * @returns {string | number} Compilable CSS value
     */
    americanise(value) {

        const britishToAmerican = {
            "colour": "color",
            "centre": "center",
            "grey": "gray",
            "behaviour": "behavior"
        };
        return britishToAmerican[value] || value;

    }

    /**
     * @brief A method that checks value type.
     * 
     * @param {string | number} value 
     * 
     * @returns {string | number} Compilable CSS value
     */
    styleCheck(value) {

        return typeof value === 'number' ? `${value}px` : value;
    
    }

    /**
     * @brief A method that checks font type.
     * 
     * @param {string | number} value 
     * 
     * @returns Compilable CSS value
     */
    styleCheckFont(value) {

        return typeof value === 'number' ? `${value}pt` : value;
    
    }

    /**
     * @brief A method to generate CSS for containers.
     * 
     *        To use, write the JavaScript object key and value exactly like typical
     *        CSS values, except with some additonal conditions:
     * 
     *        - A CSS style is defined by calling the Comp's compStyle variable
     *        - CSS value names are written in camel case
     *        - The CSS values are written in British English!
     *        - Global CSS variables can be defined in the globalCSS sheet var(--example).
     *          These can be used for most values, but all colours must be defined as CSS
     *          variables for simplicity.
     *  
     * @example
     *  const cssConfig = this.compStyle.styleCompCSS {
     *      valueID: "container",
     *      psuedoClass: "hover",
     *      display: "flex",
     *      flexDirection: "column",
     *      boxSizing: "border-box",
     *      width: "100%",
     *      maxWidth: 500,
     *      padding: 20,
     *      alignItems: "center",
     *      border: true,
     *      borderRadius: 10,
     *      background: "white",
     *      colour: "black100",
     *      fontSize: 16,
     *      fontWeight: 400,
     *      opacity: 1
     *  };
     *  const cssString = styleCompCSS(cssConfig);
     * 
     *  // Compiles CSS that looks similar to:
     *  `.container:hover {
     *      display: flex;
     *      flex-direction: column;
     *      box-sizing: border-box;
     *      width: 100%;
     *      max-width: 500px;
     *      padding: 20px;
     *      align-items: center;
     *      border: var(--border);
     *      border-radius: 10px;
     *      background: var(--white);
     *      color: var(--black100);
     *      // font-weight is skipped with internal handling if not needed
     *      font-size: 16px;
     *      opacity: 1
     *  }`
     * 
     * @param {Object} css 
     * @param {string} css.class
     * @param {string} css.psuedoClass       
     * @param {string} css.display       
     * @param {string} css.flexDirection 
     * @param {string} css.boxSizing     
     * @param {string | number} css.width 
     * @param {string | number} css.maxWidth 
     * @param {number} css.padding 
     * @param {string} css.alignItems 
     * @param {boolean} css.border 
     * @param {number} css.borderRadius 
     * @param {string} css.background 
     * @param {string} css.colour 
     * @param {number} css.fontSize 
     * @param {number | string} css.fontWeight
     * @param {number} css.opacity
     * 
     * @returns {string} A CSS string to be injected into the component.
     */
    styleCompCSS(css) {

        let cssSelector = (css.psuedoClass) ? `${css.class}:${css.psuedoClass}` : css.class;

        return  /* css */ `
        .${cssSelector} {
            ${this.compileCSS(css)}
        }
        `;
    
    }

    /**
     * @brief A method that compiles JavaScript object data to CSS values. It works by
     *        taking the object key and value, then running checks to evaluate for CSS
     *        compilable values.
     * 
     *        The checks catch:
     *          - Camel case keys
     *          - CSS var values
     *          - Appropriate number checks (px, pt)
     *          - British -> American CSS property names
     * 
     * @param {object} css
     * 
     * @returns {literal} Compiled CSS code to be injected
     */
    compileCSS(css) {

        let cssString = "";

        for (let value in css) {

            if (value === "valueID") continue;

            let cssValue = css[value];

            if (value === "fontSize") cssValue = this.styleCheckFont(cssValue);
            else if (value === "background" || value === "colour" || value === "border") cssValue = `var(--${cssValue})`;
            else if (value === "fontWeight") continue;
            else if (value === "opacity") cssValue = cssValue;
            else cssValue = this.styleCheck(cssValue);

            cssString += `${this.americanise(this.parseVariableName(value))}: ${this.americanise(cssValue)};\n`;
        
        }

        return cssString;

    }

}