import { Comp } from "../comp-src/comp.js";

class InputComp extends Comp {

    constructor() {

        super();
        
        this.inputLabel_  = "Label";
        this.inputType_   = "text";
        this.inputPrompt_ = "Enter text";

        this.compName_ = "Input";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();

        this.renderComp();
    
    }

    set inputLabel(newInputLabel) {

        this.inputLabel_ = newInputLabel;
        this.updateComp(this.createHTML(), this.compCSS_);
    
    }

    set inputType(newInputType) {

        this.inputType_ = newInputType;
        this.updateComp(this.createHTML(), this.compCSS_);
    
    }

    set inputPrompt(newInputPrompt) {

        this.inputLabel_ = newInputPrompt;
        this.updateComp(this.createHTML(), this.compCSS_);
    
    }

    get inputLabel() {

        return this.inputLabel_;
    
    }

    get inputType() {

        return this.inputType_;
    
    }

    get inputPrompt() {

        return this.inputPrompt_;
    
    }

    createHTML() {

        return /* html */ `
        <div class="inputContainer">
            <label>${this.inputLabel_}</label>
            <input type="${this.inputType_}" placeholder="${this.inputPrompt_}">
        </div>
        `;
    
    }

    createCSS() {

        const inputContainer = this.compStyle.styleContainer(
            "column",
            "100%",
            "None",
            0,
            "start",
            12,
            false,
            10
        );

        return /* css */ `
        .inputContainer {
            ${inputContainer}
        }
        input {
            font-size: 16;
            width: 100%;
            padding: 8px 12px;
            border: ${this.compStyle.styleBorder(true)};
            border-radius: 12px;
        }
        `;
    
    }

}

customElements.define("comp-input", InputComp);