import {Comp} from './comp.js'

class TestComponent extends Comp {

    constructor() {
        super();

        this.compName_ = "Button";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();
    }

    createHTML() {
        return `
        <button id="test" class="test">CLICK ME</button>
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

customElements.define("comp-button", TestComponent);