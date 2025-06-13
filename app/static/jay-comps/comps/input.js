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

        this.inputPrompt_ = newInputPrompt;
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

    get inputValue() {

        return this.shadowRoot.getElementById("input").value;

    }


    createHTML() {

        return /* html */ `
        <div class="inputContainer">
            <label>${this.inputLabel_}</label>
            <input id="input" type="${this.inputType_}" placeholder="${this.inputPrompt_}">
        </div>
        `;
    
    }

    createCSS() {

        const inputContainer = this.compStyle.styleCompCSS({
            valueID: "inputContainer",
            direction: "column",
            width: "100%",
            maxWidth: "none",
            padding: 0,
            alignItems: "start",
            border: false,
            borderRadius: true,
            gap: 10,
            background: "--white"
        });

        return /* css */ `
        
        ${inputContainer}
        
        input {
            display: block;
            font-size: 16px;
            width: 100%;
            padding: 8px 12px;
            border: ${this.compStyle.styleBorder(true)};
            border-radius: 8px;
            box-sizing:     border-box;
        }
        input:hover {
            outline: solid 2px var(--black60);
        }
        input:focus {
            outline: solid 2px var(--black100);
        }
        `;
    
    }

}

customElements.define("comp-input", InputComp);