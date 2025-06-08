import { Comp } from '../comp.js';

class TestComponent extends Comp {
    constructor() {
        super();

        this.buttonText_ = "This is a button";

        this.compName_ = "Button";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();

    }

    set buttonText(value) {
        this.buttonText_ = value;
        const newHTML = this.createHTML();
        this.updateComponent(newHTML, this.compCSS_);
    }

    get buttonText() {
        return this.buttonText_;
    }

    createHTML() {
        return /* html */ `
        <button id="button" class="button">${this.buttonText_}</button>
        `;
    }

    createCSS() {
        return /* css */ `
        .button {
            background: var(--black100);
            color: var(--white);
            font-size: 16px;
            font-weight: 400;
            padding: 9px 16px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background 0.1s ease-in-out;
        }
        .button:hover {
            background: var(--black80);
        }
        .button:active {
            background: var(--)
        }
        `;
    }

    connectedCallback() {
        this.renderComponent();
    }
}

customElements.define("comp-button", TestComponent);
