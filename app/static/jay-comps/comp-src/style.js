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

        return  `
        * {
            margin: 0;
            padding: 0;
        }
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;

        ${this.styleFont()}
        `;
    
    }

    styleFont() {

        return /* css */ `
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

    americaniseColour(value) {

        return "color";
    
    }

    /**
     * @brief A method that checks value type.
     * 
     * @param {string | number} value 
     * 
     * @returns 
     */
    styleCheck(value) {

        return typeof value === 'number' ? `${value}px` : value;
    
    }

    styleCheckFont(value) {

        return typeof value === 'number' ? `${value}pt` : value;
    
    }

    /**
     * A method to generate CSS for containers.
     *
     * @param {Object} css 
     * @param {string} css.valueID
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
     * 
     * @returns {string} A CSS string to be injected into the component.
     */
    styleCompCSS(css) {

        let cssSelector = (css.psuedoClass) ? `${css.valueID}:${css.psuedoClass}` : css.valueID;

        return  /* css */ `
        .${cssSelector} {
            ${this.parseCSS(css)}
        }
        `;
    
    }

    parseCSS(css) {

        let cssString = "";

        for (let value in css) {

            if (value === "valueID") continue;  

            let cssValue = css[value];

            if (value === "border") cssValue = this.styleBorder(cssValue);
            else if (value === "fontSize") cssValue = this.styleCheckFont(cssValue);
            else if (value === "background" || value === "colour") cssValue = `var(--${cssValue})`;
            else if (value === "fontWeight") continue;
            else cssValue = this.styleCheck(cssValue);

            if (value === "colour") value = this.americaniseColour(value);

            cssString += `${this.parseVariableName(value)}: ${cssValue};\n`; 
        
        }

        return cssString; 

    }


    /**
     * 
     * @returns 
     */
    styleBorder(border) {

        return (border) ? `solid 1px var(--black40)` : "none";
    
    }

    /**
     * @brief a method that styles default images.
     * 
     * @param {boolean} borderRadius
     * 
     * @returns {literal} CSS image values to be injected numbero component.
     */
    styleImage(borderRadius, maxHeight) {

        let radius;

        if (borderRadius) radius = 8;

        return /* css */ `
        img {
            width: 100%;
            height: 100%;
            max-height: ${maxHeight}px;
            object-fit: cover;
            border-radius: ${radius}px;
        }
        `;
    
    }

    // /**
    //  * @brief a method that styles a modular card.
    //  * 
    //  * @param {string}  containerID 
    //  * @param {string}  direction 
    //  * @param {number}     maxWidth 
    //  * @param {number}     padding
    //  * @param {number}     gap
    //  * @param {boolean} border
    //  * 
    //  * @returns {literal} CSS card values to be injected numbero component.
    //  */
    // styleCard(cardID, direction, width, maxWidth, padding, gap, border) {

    //     return /* css */ `
    //     h2, p {
    //         margin: 0;
    //         padding: 0;
    //     }
        
    //     ${this.styleImage(true, 200)}
        
    //     .${cardID} {
    //         ${this.styleContainer(direction, width, maxWidth, padding, "start", 12, border, gap)}
    //     }
    //     .${cardID}:hover {
    //         background: var(--black10);
    //         transition: background 0.4s;
    //     }
    //     `;
    
    // }

}