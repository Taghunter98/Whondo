/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    style.js
 * Author:      Josh Bassett
 * Date:        09/06/2025
 * Version:     1.0
 * 
 * Description: Base style class for CSS injection for components.
 */

import { Animation } from "./animation.js";

export class Style {

    constructor(){
        this.animation = new Animation();
    }

    /**
     * @brief A method that provides standard CSS to remove all margin/padding.
     * 
     * @returns {literal} CSS default values with no margin/padding.
     */
    styleDefaultComp() {

        return /* css */ `
        * {
            margin: 0;
            padding: 0;
        }
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
     * @brief A method that provides styling for containers.
     * 
     * @param {string} direction 
     * @param {int}    maxWidth 
     * @param {int}    padding 
     * 
     * @returns {literal} CSS container values to be injected into component.
     */
    styleContainer(direction, maxWidth, padding) {

        return  /* style */ `
            display: flex;
            flex-direction: ${direction};
            padding: ${padding}px;
            max-width: ${maxWidth}px;   
        `;
    }

    /**
     * 
     * @returns 
     */
    styleBorder() {

        return `solid 1px var(--black40)`;
    }

    /**
     * @brief a method that styles default images.
     * 
     * @param {boolean} borderRadius
     * 
     * @returns {literal} CSS image values to be injected into component.
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

    /**
     * @brief a method that returns styling for button components.
     * 
     * @param {string}  valueID 
     * @param {string}  colour 
     * @param {string}  background 
     * @param {string}  hoverBackground 
     * @param {string}  activeBackground
     * @param {boolean} border
     * 
     * @returns {literal} CSS values to be injected into component.
     */
    styleButton(buttonID, text, colour, hoverColour, activeColour, border) {

        let buttonBorder = 'None';
        if (border) buttonBorder = this.styleBorder();

        return /* css */ `
        .${buttonID} {
            background: var(${colour});
            color: var(${text});
            width: auto;
            font-size: 16px;
            font-weight: 400;
            padding: 9px 16px;
            border-radius: 8px;
            border: ${buttonBorder};
            cursor: pointer;
            ${this.animation.addAnimationProp("scaleInAnimation", 2, "ease", 0, 1, "normal", "both")}
            ${this.animation.createTransition("background", .2, "ease-in-out")}
            
        }
        .${buttonID}:hover {
            background: var(${hoverColour});
        }

        .${buttonID}:hover{
            ${this.animation.addAnimationProp("pulsingAnimation", 1.5, "ease-in-out", 0, 1, "normal", "both")}
        }

        .${buttonID}:active {
            background: var(${activeColour});
        }

        ${this.animation.scaleInKeyframes()}
        ${this.animation.pulsKeyframes()}

        `;
    }

    /**
     * @brief a method that styles a modular card.
     * 
     * @param {string}  containerID 
     * @param {string}  direction 
     * @param {int}     maxWidth 
     * @param {int}     padding
     * @param {int}     gap
     * @param {boolean} border
     * 
     * @returns {literal} CSS card values to be injected into component.
     */
    styleCard(cardID, direction, maxWidth, padding, gap, border) {

        let cardBorder = 'None';
        if (border) cardBorder = this.styleBorder();

        return /* css */ `
        h2, p {
            margin: 0;
            padding: 0;
        }
        
        ${this.styleImage(true, 200)}
        
        .${cardID} {
            ${this.styleContainer(direction, maxWidth, padding)}
            border-radius: 12px;
            border: ${cardBorder};
            gap: ${gap}px;
            
          ${this.animation.addAnimationProp("slideDownAnimation", 3, "ease", 0, 1, "normal", "both")}
           ${this.animation.createTransition("background", .2, "ease-in-out")}
        }
        .${cardID}:hover {
            background: var(--black10);
        }

        ${this.animation.slideDownKeyframes()}
        `;
    }    
    
}
