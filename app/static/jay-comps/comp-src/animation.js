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
   * @brief A method that provides a transition effect for a CSS property.
   * 
   * @param {string} prop - The CSS property to animate (e.g. "background")
   * @param {string} duration - Duration with units (e.g. "0.3s" or "500ms")
   * @param {string} timing - Timing function (default "linear")
   * @param {string} delay - Delay before animation starts (default "0s")
   * @return {string} - A CSS string with the transition declaration
   */
    createTransition(prop, duration, timing = "linear", delay = 0) {
        return  `transition: ${prop} ${duration}s ${timing} ${delay}s;`;
    }

    /**
     * @brief A method that provides a animation shorthand property.
     * 
     * @param {string} aniName - Name of the animation.
     * @param {int} duration - duration how long it took animation to complete.
     * @param {string} timing - speed of animation like "ease" slow start then fast  the slowly end.
     * @param {int} delay - the delay before the animation start.
     * @param {int} iterate - how many time the animation repeats.
     * @param {string} direction - in simple should it play forward or backward etc.
     * @param {string} fillMode - how should animation effect the elements
     * @returns 
     */
    addAnimationProp(aniName, duration, timing = "ease", delay = "0", iterate = "1", direction = "normal", fillMode = "none" ) {
        return `animation: ${aniName} ${duration}s ${timing} ${delay}s ${iterate} ${direction} ${fillMode};`;
    }

   
    fadeInKeyframes(){
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

    fadeOutKeyframes(){
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

    fadeLeftKeyframes(){
        return /*css */ `
            @keyframes fadeLeftAnimation {
                0% {
                    opacity: 0;
                    transform: translateX(100px);
                }

                100% {
                    opacity: 1;
                    transform: translateX(0);

                }

            }
        `;
    }

    fadeRightKeyframes() {
        return /*css*/ `
            @keyframes fadeRightAnimation {
                0% {
                    opacity: 0;
                    transform: translateX(0);

                }

                100% {
                    opacity: 1;
                    transform: translateX(10px);

                }
            }
        `;
    } 

    slideUpKeyframes(){
        return /* css */ `
            @keyframes slideUpAnimation {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;

    }

    slideDownKeyframes() {
        return /*css */ `
            @keyframes slideDownAnimation {
                0% {
                    opacity: 0;
                    transform: translateY(-20px);
                }

                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
    }

    scaleInKeyframes(){
        return /*css */ `
            @keyframes scaleInAnimation {
                0% {
                    opacity: 0;
                    transform: scale(0.9);
                }

                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
    }
        
    pulsKeyframes() {
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

    fadeOutRightKeyframes(){
        return /*css */ `
            @keyframes fadeOutRightAnima {
                0% {
                    opacity: 1;
                    transform: translateX(0)

                }

                100% {
                    opacity: 0;
                    transform: translateX(20px)

                }
            }
        `;
    }

    fadeOutLeftKeyframes() {
        return /* css */ `
            @keyframes fadeOutLeftAnima {
                0% {
                    opacity: 1;
                    transform: translateX(0)
                }

                100% {
                    opacity: 0;
                    transform: translateX(-20px)
                }
            }
        `;
    }

    
}