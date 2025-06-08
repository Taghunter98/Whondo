import {Comp} from './comp.js'

class TestComponent extends Comp {

    constructor() {
        super();

        this.compName_ = "Button";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();

        this.buttonText_ = '';
    }

    set buttonText(value) {
        this.buttonText_ = value;
        this.renderComponent();
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

    testFunction() {
        alert("This is a test");
    }

    debug() {
        this.debugComponent();
    }

    connectedCallback() {
        this.renderComponent();
    }

    renderComponent() {
        const COMP_CODE = this.render();

        this.shadowRoot.innerHTML = `
        ${COMP_CODE}
        `

        const button = this.shadowRoot.getElementById("test");
        button.buttonText = "THIS IS A COOL BUTTON";
        button.onclick = () => this.testFunction();
    }
}

customElements.define("comp-button", TestComponent);