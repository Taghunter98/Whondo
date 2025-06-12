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

    addAnimationName(aniName, duration, timing = "", fillMode = "", delay = "0s", iterate = "1", direction = "normal" ) {
        return `animation: ${aniName} ${duration}s ${timing} ${fillMode} ${delay}s ${iterate} ${direction}`;
    }

    typeAnimaKeyframes(){
        return /*style */`
            @keyframes typewriter{
             from {width: 0;}
             to {width: 100%}
            }
        `;
    }


    blinkingCursorKeyframe(){
        return /*style */ `
            @keyframes blinkingCursor{
                from {border-right-color: rgba(255,255,255,.75);}
                to {border-right: transparent;} 
            }
        `;
    }

}