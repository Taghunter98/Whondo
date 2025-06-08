import {Comp} from './comp.js'

class TestComponent extends Comp {

    constructor() {
        super();
        this.compName = "Element";
        this.compHTML = this.createHTML();
        this.compCSS = this.createCSS();
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

    renderTestComponent() {

        const code = this.render();
        console.log(code);

        this.shadowRoot.innerHTML = `
        ${code}
        `

        const button = this.shadowRoot.getElementById("test");
        button.onclick =  () => this.testFunction();
    }

    connectedCallback() {
        this.renderTestComponent();
    }
}

customElements.define("comp-button", TestComponent);