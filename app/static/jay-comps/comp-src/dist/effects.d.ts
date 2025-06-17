/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 *
 * Filename:    effect.ts
 * Authors:     Sarit Samkumpim, Josh Bassett
 * Date:        11/06/2025
 * Version:     1.1
 *
 * Licence:     Apache 2.0
 */
/**
 * # Effects
 *
 * Class provides a CSS animation library.
 *
 * ### Overview:
 * The class provides a set of common reusable effects to help you build interactive
 * Comps quickly.
 *
 * The `prop()` API is used to define an animation property, then add the effect name
 * as the argument to access it within the CSS.
 *
 * ### Methods:
 * - **prop()**: API for defining a property.
 * - **fadeIn()**: Fade in effect.
 * - **fadeOut()**: Fade out effect.
 * - **fadeLeft()**: Fade left effect.
 * - **fadeRight()**: Fade right effect.
 * - **slideUp()**: Slide up from the bottom effect.
 * - **slideDown()**: Slide down from the top effect.
 * - **scale()**: Scale effect.
 * - **pulse()**: Pulse effect.
 * - **fadeOutLeft()**: Fade out left effect.
 * - **fadeOutRight()**: Fade out right effect.
 *
 * ### Example:
 * ```js
 * createCSS() {
 *     const effect = this.effect.slideUp(25); // Translates Y 25px
 *     const prop   = this.effect.prop("slideUp", .5); // Runs for half a second
 *     const css = this.design.create({
 *         // css omitted
 *         animation: prop
 *     });
 *     return `
 *     ${effect}
 *     `;
 * }
 * ```
 */
export declare class Effects {
    /**
     * ## Prop
     *
     * Creates a CSS animation property.
     *
     * ### Behaviour:
     * Method creates a CSS animation property from the input. Note: the name of the effect needs
     * to be present to target the correct animation.
     *
     * ### Parameters:
     * - **name** (`string`): Name of effect.
     * - **duration** (`string`): Duration of effect.
     * - **timing** (`string`): Timing of effect.
     * - **delay** (`string`): Delay of effect.
     * - **iterate** (`string`): Repetitions of effect.
     * - **direction** (`string`): Direction of effect.
     * - **fillMode** (`string`): Style for effect when it's not playing.
     *
     * ### Returns:
     * `string` - Valid CSS animation property.
     *
     * ### Example:
     * ```js
     * effects.prop("slideUp", .5, "ease-in-out", .2);
     * effects.prop("scale", 1);
     * effects.prop("fadeIn", .5);
     * ```
     */
    prop(name: string, duration: string, timing?: string, delay?: string, iterate?: string, direction?: string, fillMode?: string): string;
    /**
     * ## Fade In
     *
     * Provides an effect for fading in an element.
     *
     * ### Behaviour:
     * Generates CSS keyframes that gradually increase the opacity from 0 to 1.
     *
     * ### Returns:
     * `string` - A CSS string literal containing the keyframes for a fade-in effect.
     *
     * ### Example:
     * ```js
     * const fadeInCSS = effects.fadeIn();
     * ```
     */
    fadeIn(): string;
    /**
     * ## Fade Out
     *
     * Provides an effect for fading out an element.
     *
     * ### Behaviour:
     * Generates CSS keyframes that transition the element's opacity from 1 to 0.
     *
     * ### Returns:
     * `string` - A CSS string literal containing the keyframes for a fade-out effect.
     *
     * ### Example:
     * ```js
     * const fadeOutCSS = effects.fadeOut();
     * ```
     */
    fadeOut(): string;
    /**
     * ## Fade Left
     *
     * Provides an effect for fading in an element from the left.
     *
     * ### Behaviour:
     * Generates CSS keyframes that start with the element translated on the X-axis by a given value
     * and with opacity 0, then transitions to full opacity and no translation.
     *
     * ### Parameters:
     * - **translateX** (`number`): The number of pixels to translate the element from the left.
     *
     * ### Returns:
     * `string` - A CSS string literal with the keyframes for a fade-in from left effect.
     *
     * ### Example:
     * ```js
     * const fadeLeftCSS = effects.fadeLeft(20);
     * ```
     */
    fadeLeft(translateX: number): string;
    /**
     * ## Fade Right
     *
     * Provides an effect for fading in an element from the right.
     *
     * ### Behaviour:
     * Generates CSS keyframes that start with the element translated on the X-axis by a given value
     * and with opacity 0, then transitions to full opacity and no translation.
     *
     * ### Parameters:
     * - **translateX** (`number`): The number of pixels by which the element is translated to the right.
     *
     * ### Returns:
     * `string` - A CSS string literal with the keyframes for a fade-in from right effect.
     *
     * ### Example:
     * ```js
     * const fadeRightCSS = effects.fadeRight(20);
     * ```
     */
    fadeRight(translateX: number): string;
    /**
     * ## Slide Up
     *
     * Provides an effect for sliding an element up into view.
     *
     * ### Behaviour:
     * Generates CSS keyframes that begin with the element translated downward along the Y-axis by a given number of pixels and invisible,
     * and then transitions to no translation and full opacity.
     *
     * ### Parameters:
     * - **translateY** (`number`): The vertical distance (in pixels) the element is offset downward.
     *
     * ### Returns:
     * `string` - A CSS string literal with the keyframes for a slide-up effect.
     *
     * ### Example:
     * ```js
     * const slideUpCSS = effects.slideUp(20);
     * ```
     */
    slideUp(translateY: number): string;
    /**
     * ## Slide Down
     *
     * Provides an effect for sliding an element down into view.
     *
     * ### Behaviour:
     * Generates CSS keyframes that begin with the element translated upward along the Y-axis by a given number of pixels and invisible,
     * and then transitions to no translation and full opacity.
     *
     * ### Parameters:
     * - **translateY** (`number`): The vertical distance (in pixels) the element is offset.
     *
     * ### Returns:
     * `string` - A CSS string literal with the keyframes for a slide-down effect.
     *
     * ### Example:
     * ```js
     * const slideDownCSS = effects.slideDown(20);
     * ```
     */
    slideDown(translateY: number): string;
    /**
     * ## Scale
     *
     * Provides an effect for scaling an element.
     *
     * ### Behaviour:
     * Generates CSS keyframes that transition the element's scale from an initial value to a target value,
     * while also transitioning from transparent to fully opaque.
     *
     * ### Parameters:
     * - **scaleFrom** (`number`): The initial scale factor.
     * - **scaleTo** (`number`): The target scale factor.
     *
     * ### Returns:
     * `string` - A CSS string literal with the keyframes for a scaling effect.
     *
     * ### Example:
     * ```js
     * const scaleCSS = effects.scale(0.8, 1);
     * ```
     */
    scale(scaleFrom: number, scaleTo: number): string;
    /**
     * ## Pulse
     *
     * Provides a pulsing effect for an element.
     *
     * ### Behaviour:
     * Generates CSS keyframes that scale an element up slightly and then return it to its original size,
     * creating a subtle pulsating appearance.
     *
     * ### Returns:
     * `string` - A CSS string literal with the keyframes for a pulsing effect.
     *
     * ### Example:
     * ```js
     * const pulseCSS = effects.pulse();
     * ```
     */
    pulse(): string;
    /**
     * ## Fade Out Right
     *
     * Provides an effect for fading out an element to the right.
     *
     * ### Behaviour:
     * Generates CSS keyframes that begin with the element fully opaque and untransformed,
     * then transition to full transparency while translating the element to the right.
     *
     * ### Parameters:
     * - **translateX** (`number`): The horizontal distance (in pixels) the element is moved to the right.
     *
     * ### Returns:
     * `string` - A CSS string literal with the keyframes for a fade-out to right effect.
     *
     * ### Example:
     * ```js
     * const fadeOutRightCSS = effects.fadeOutRight(20);
     * ```
     */
    fadeOutRight(translateX: number): string;
    /**
     * ## Fade Out Left
     *
     * Provides an effect for fading out an element to the left.
     *
     * ### Behaviour:
     * Generates CSS keyframes that begin with the element fully opaque and untransformed,
     * then transition to full transparency while translating the element to the left.
     *
     * ### Parameters:
     * - **translateX** (`number`): The horizontal distance (in pixels) the element is moved to the left.
     *
     * ### Returns:
     * `string` - A CSS string literal with the keyframes for a fade-out to left effect.
     *
     * ### Example:
     * ```js
     * const fadeOutLeftCSS = effects.fadeOutLeft(20);
     * ```
     */
    fadeOutLeft(translateX: number): string;
}
