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

export class Style {

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
     * @param {string}  direction 
     * @param {int}     maxWidth 
     * @param {int}     padding 
     * @param {string}  alignItems 
     * @param {int}     borderRadius 
     * @param {boolean} border 
     * @param {int}     gap 
     * 
     * @returns CSS container values to be injected into component.
     */
    styleContainer(direction, maxWidth, padding, alignItems = "start", borderRadius = 0, border, gap) {

        return  /* style */ `
            display: flex;
            flex-direction: ${direction};
            padding:        ${padding}px;
            max-width:      ${maxWidth}px;
            align-items:    ${alignItems};
            border-radius:  ${borderRadius};
            border:         ${this.styleBorder(border)};
            gap:            ${gap}px;
        `;
    
    }

    /**
     * 
     * @returns 
     */
    styleBorder(border) {

        return (border) ? `solid 1px var(--black40)` : "None";
    
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

        return /* css */ `
        .${buttonID} {
            background: var(${colour});
            color: var(${text});
            width: auto;
            font-size: 16px;
            font-weight: 400;
            padding: 9px 16px;
            border-radius: 8px;
            border: ${this.styleBorder(border)};
            cursor: pointer;
            transition: background 0.1s ease-in-out;
        }
        .${buttonID}:hover {
            background: var(${hoverColour});
        }
        .${buttonID}:active {
            background: var(${activeColour});
        }
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

        return /* css */ `
        h2, p {
            margin: 0;
            padding: 0;
        }
        
        ${this.styleImage(true, 200)}
        
        .${cardID} {
            ${this.styleContainer(direction, maxWidth, padding, "start", 12, border, gap)}
        }
        .${cardID}:hover {
            background: var(--black10);
            transition: background 0.4s;
        }
        `;
    
    }

}