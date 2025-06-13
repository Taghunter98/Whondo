/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    animation.js
 * Author:      Sarit Samkumpim
 * Date:        11/06/2025
 * Version:     1.1
 * 
 * Description: Base animation class for CSS injection for components.
 */

export class Animation {

    /**
   * @brief A method that provides a basic transition animation.
   * 
   * @param {string} prop 
   * @param {string} duration 
   * @param {string} timing 
   * @param {string} delay 
   * 
   * @return {literal} A CSS string literal with the transition declaration
   */
    createTransition(prop, duration, timing = "linear", delay = 0) {

        return  `transition: ${prop} ${duration}s ${timing} ${delay}s;`;
    
    }

    /**
     * @brief A method that provides a animation shorthand property.
     * 
     * @param {string} aniName 
     * @param {int}    duration 
     * @param {string} timing 
     * @param {int}    delay 
     * @param {int}    iterate 
     * @param {string} direction
     * 
     * @param {string} fillMode 
     * 
     * @returns {literal} A CSS string literal with animation properties
     */
    addAnimationProp(aniName, duration, timing = "ease", delay = "0", iterate = "1", direction = "normal", fillMode = "none" ) {

        return `${aniName} ${duration}s ${timing} ${delay}s ${iterate} ${direction} ${fillMode};`;
    
    }

    /**
    * @brief A method that provides an animation for fading in an element.
    * 
    * @returns {literal} A CSS string literal with animation properties
    */
    fadeIn(){

        return /* css */ `
        @keyframes fadeInAnimation {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
      `;
    
    }

    /**
     * @brief A method that provides an animation for fading out an element.
     *
     * @returns {literal} A CSS string literal with animation properties
     */
    fadeOut(){

        return /* css */ `
        @keyframes fadeOutAnimation {
            100% {
                opacity: 0;
            }

            0% {
                opacity: 1;
            }
        }
      `;
    
    }

    /**
     * @brief A method that provides an animation for fading in an element from the left.
     * 
     * @param {number} x
     * 
     * @returns {literal} A CSS string literal with animation properties
     */
    fadeLeft(x){

        return /*css */ `
            @keyframes fadeLeftAnimation {
                0% {
                    opacity: 0;
                    transform: translateX(${x}px);
                }

                100% {
                    opacity: 1;
                    transform: translateX(0);

                }

            }
        `;
    
    }

    /**
     * @brief A method that provides an animation for fading in an element from the right.
     * 
     * @param {number} x
     * 
     * @returns {literal} A CSS string literal with animation properties
     */
    fadeRight(x) {

        return /*css*/ `
            @keyframes fadeRightAnimation {
                0% {
                    opacity: 0;
                    transform: translateX(0);

                }

                100% {
                    opacity: 1;
                    transform: translateX(${x}px);

                }
            }
        `;
    
    } 

    /**
     * @brief A method that provides an animation for sliding an element from the bottom.
     * 
     * @param {number} y
     * 
     * @returns {literal} A CSS string literal with animation properties
     */
    slideUp(y){

        return /* css */ `
            @keyframes slideUpAnimation {
                0% {
                    opacity: 0;
                    transform: translateY(${y}px);
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

    }

    /**
     * 
     * @brief A method that provides an animation for sliding an element from the top.
     * 
     * @param {number} y
     *
     * @returns {literal} A CSS string literal with animation properties
     */
    slideDown(y) {

        return /*css */ `
            @keyframes slideDownAnimation {
                0% {
                    opacity: 0;
                    transform: translateY(${y}px);
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
    
    }

    /**
     * @brief A method that provides an animation for scaling an element.
     * 
     * @param {number} to
     * @param {number} from
     * 
     * @returns {literal} A CSS string literal with animation properties
     */
    scale(to, from){

        return /*css */ `
            @keyframes scaleInAnimation {
                0% {
                    opacity: 0;
                    transform: scale(${to});
                }

                100% {
                    opacity: 1;
                    transform: scale(${from});
                }
            }
        `;
    
    }
    
    /**
     * @brief A method that provides an animation for pulsing an element, scales then shrinks.
     * 
     * @returns {literal} A CSS string literal with animation properties
     */
    pulse() {

        return /*css */ `
            @keyframes pulsingAnimation {
                0% {
                    transform: scale(1);
                }

                50% {
                    transform: scale(1.05);
                }

                100% {
                    transform: scale(1);
                }
            }
        `;
    
    }

    /**
     * @brief A method that provides an animation for fading out an element to the right.
     * 
     * @param {number} x
     * 
     * @returns {literal} A CSS string literal with animation properties
     */
    fadeOutRight(x){

        return /*css */ `
            @keyframes fadeOutRightAnima {
                0% {
                    opacity: 1;
                    transform: translateX(0)

                }

                100% {
                    opacity: 0;
                    transform: translateX(${x}px)

                }
            }
        `;
    
    }


    /**
     * @brief A method that provides an animation for fading out an element to the left.
     * 
     * @param {number} x
     * 
     * @returns {literal} A CSS string literal with animation properties
     */
    fadeOutLeft(x) {

        return /* css */ `
            @keyframes fadeOutLeftAnima {
                0% {
                    opacity: 1;
                    transform: translateX(0)
                }

                100% {
                    opacity: 0;
                    transform: translateX(${x}px)
                }
            }
        `;
    
    }

    
}