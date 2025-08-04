/**
 * Copyright (c) 2025 Josh Bassett, whondo.com
 * 
 * Filename:    button.js
 * Author:      Josh Bassett
 * Date:        10/06/2025
 * Version:     1.0
 * 
 * Description: Class that creates a reusable Button Comp.
 */

import { Comp } from "jay-comp";

export class Button extends Comp {
    text_; variant_; loading_ = false; auto_ = false;

    set text(v) {
        this.text_ = v;
        this.update();
    }
    set variant(v) {
        this.variant_ = v;
        this.update();
    }
    set loading(v) {
        this.loading_ = v;
        this.update();
    }
    set auto(v) {
        this.auto_ = v;
        this.update();
    }

    get text() { return this.text_; }
    get variant() { return this.variant_; }

    beforeRender() {
        if (!this.text_) this.text_ = "Button";
        if (!this.variant_) this.variant_ = 1;
    }

    createHTML() {
        return `
    <div class="buttonWrapper">
        ${this.loading_
                ? `<div class="loading"><comp-spinner></comp-spinner></div>`
                : `<button class="button">${this.text}</button>`
            }
    </div>`;
    }

    createCSS() {
        const variant = this.variant_ || 1;
        const autoWidth = this.auto_ ? "auto" : "100%";

        return [
            {
                class: "button",
                colour: variant === 1 ? "white" : "black100",
                backgroundVar: variant === 1 ? "black100" : "black10",
                width: autoWidth,
                borderVar: variant === 1 ? "borderBlack" : "border",
                padding: [12, 28],
                borderRadius: 8,
                fontSize: 16,
                cursor: "pointer",
                transition: ["background", "0.1s", "ease-in-out"]
            },
            {
                class: "button",
                pseudoClass: "hover",
                border: variant === 1 ? "borderBlack" : "border",
                backgroundVar: variant === 1 ? "black80" : "black20"
            },
            {
                class: "button",
                pseudoClass: "active",
                borderVar: variant === 1 ? "borderBlack" : "border",
                backgroundVar: variant === 1 ? "black60" : "black40",
                transform: "scale(0.95)"
            },
            {
                class: "loading",
                display: "flex",
                boxSizing: "border-box",
                justifyContent: "centre",
                width: autoWidth,
                backgroundVar: "black100",
                padding: [8, 28],
                borderVar: "black100",
                borderRadius: 8
            },
            {
                class: "buttonWrapper",
                display: "block",
                width: "100%"
            }
        ];
    }


    static { Comp.register(this); }
}