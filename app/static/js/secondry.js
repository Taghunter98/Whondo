import {Comp} from './comp.js'

class ButtonSecondry extends Comp {

    constructor() {
        super();

        this.compName_ = "Button 2";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();
    }

    createHTML() {
        return `
        <button id="test" class="test">Cool button</button>
        `
    }

    createCSS() {
        return `
        .test {
            background: green;
            color: white;
            font-size: 16px;
            padding: 8px 24px;
            border-radius: 8px;
        }
        `
    }

    testFunction() {
        alert("This is a test");
    }

    debug() {
        this.debugComponent();
    }
    connectedCallback() {
        this.renderComponent();
    }
}

customElements.define("comp-button-sec", ButtonSecondry);