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
     * @brief The function provides styling for button components.
     * 
     * @param {string} valueID 
     * @param {string} colour 
     * @param {string} background 
     * @param {string} hoverBackground 
     * @param {string} activeBackground
     * 
     * @returns CSS values to be injected into component.
     */
    styleButton(buttonID, text, colour, hoverColour, activeColour) {

        return /* css */ `
        .${buttonID} {
            background: var(${colour});
            color: var(${text});
            width: auto;
            font-size: 16px;
            font-weight: 400;
            padding: 9px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background 0.1s ease-in-out;
        }
        .${buttonID}:hover {
            background: var(${hoverColour});
        }
        .${buttonID}:active {
            background: var(${activeColour});
        }
        `
    }

    /**
     * @brief The function provides styling for containers.
     * 
     * @param {string} direction 
     * @param {int}    maxWidth 
     * @param {int}    padding 
     * 
     * @returns CSS container values to be injected into component.
     */
    styleContainer(direction, maxWidth, padding) {

        return  `
            display: flex;
            flex-direction: ${direction};
            padding: ${padding}px;
            max-width: ${maxWidth}px;
        `
    }

    /**
     * @brief The function styles default images.
     * 
     * @param {boolean} borderRadius
     * 
     * @returns CSS image values to be injected into component.
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
        `
    }

    /**
     * @brief The function styles a modular card.
     * 
     * @param {string}  containerID 
     * @param {string}  direction 
     * @param {int}     maxWidth 
     * @param {int}     padding
     * @param {int}     gap
     * @param {boolean} border
     * 
     * @returns CSS card values to be injected into component.
     */
    styleCard(cardID, direction, maxWidth, padding, gap, border) {
        
        let cardBorder = '';
        if (border) cardBorder = "solid 1px var(--black40)"

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
        }
        .${cardID}:hover {
            background: var(--black10);
            transition: background 0.4s;
        }
        `
    }
}