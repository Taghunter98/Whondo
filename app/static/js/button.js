import {Comp} from './comp.js'

class TestComponent extends Comp {

    constructor() {
        super();

        this.buttonText_ = "This is a button";

        this.compName_ = "Button";
        this.compHTML_ = this.createHTML(this.buttonText_);
        this.compCSS_  = this.createCSS();

        this.renderComponent();
    }

    set buttonText(value) {
        this.buttonText_ = value;
        const newHTML = this.createHTML(this.buttonText_);
        this.updateComponent(newHTML, this.compCSS_);
    }

    get buttonText() {
        return this.buttonText_;
    }

    createHTML() {
        return `
        <button id="test" class="test">${this.buttonText_}</button>
        `
    }

    createCSS() {
        return `
        .test {
            background: black;
            color: white;
            font-size: 16px;
            padding: 8px 24px;
            border-radius: 8px;
        }
        `
    }

    connectedCallback() {
        this.renderComponent();
    }
}

customElements.define("comp-button", TestComponent);