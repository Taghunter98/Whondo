import { Comp } from "../comp-src/comp.js";

class InputComp extends Comp {

    constructor() {

        super();
        
        this.inputLabel_  = "Label";
        this.inputType_   = "text";
        this.inputPrompt_ = "Enter text";

        this.name_ = "Input";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    set inputLabel(newInputLabel) {

        this.inputLabel_ = newInputLabel;
        this.update(this.createHTML(), this.css_);
    
    }

    set inputType(newInputType) {

        this.inputType_ = newInputType;
        this.update(this.createHTML(), this.css_);
    
    }

    set inputPrompt(newInputPrompt) {

        this.inputPrompt_ = newInputPrompt;
        this.update(this.createHTML(), this.css_);
    
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
            <input class="inputValue" type="${this.inputType_}" placeholder="${this.inputPrompt_}">
        </div>
        `;
    
    }

    createCSS() {

        const inputContainer = this.design.CSS({
            class: "inputContainer",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "none",
            padding: 0,
            alignItems: "start",
            gap: 10,
            background: "--white"
        });

        const input = this.design.CSS({
            class: "inputValue",
            display: "block",
            fontSize: 12,
            width: "100%",
            padding: "8px 12px",
            border: "border",
            borderRadius: 8,
            boxSizing: "border-box"
        });

        const inputHover = this.design.CSS({
            class: "inputValue",
            psuedoClass: "hover",
            outline: "solid 2px var(--black60)"
        });

        const inputActive = this.design.CSS({
            class: "inputValue",
            psuedoClass: "focus",
            outline: "solid 2px var(--black100)"
        });

        return /* css */ `
        
        ${inputContainer}
        
        ${input}
        ${inputHover}
        ${inputActive}
        `;
    
    }

}

customElements.define("comp-input", InputComp);