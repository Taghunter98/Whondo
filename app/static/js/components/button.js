import { Comp }  from '../comp.js';
import { Style } from '../style.js'

class Button extends Comp {
    constructor() {
        super();                                                    

        this.buttonText_ = "This is a button";
        this.buttonVarient_ = 1;                
        
        this.compName_ = "Button";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();
    }

    set buttonText(value) {
        this.buttonText_ = value;
        const newHTML = this.createHTML();
        this.updateComponent(newHTML, this.compCSS_);
    }

    set buttonVarient(value) {
        this.buttonVarient_ = value;
        const newCSS = this.createCSS()
        this.updateComponent(this.compHTML_, newCSS);
    }

    get buttonText() {
        return this.buttonText_;
    }

    get buttonVarient() {
        return this.buttonVarient_;
    }

    createHTML() {
        return /* html */ `
        <button id="button" class="button">${this.buttonText_}</button>
        `;
    }

    createCSS() {
        const style = new Style();

        let primary  = style.styleButton("button", "--white", "--black100", "--black80", "--black60");
        let secondry = style.styleButton("button", "--black100", "--black20", "--black40", "--black60");
        
        if (this.buttonVarient_ == 1) {
            return /* css */ `
            ${primary}
            `;
        } else if (this.buttonVarient_ == 2) {
            return /* css */ `
            ${secondry}
            `;
        }
    }

    connectedCallback() {
        this.renderComponent();
    }
}

customElements.define("comp-button", Button);
