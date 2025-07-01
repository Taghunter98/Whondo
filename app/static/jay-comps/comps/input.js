import { Comp } from "jay-comp";

class InputComp extends Comp {

    constructor() {

        super();
        
        this.label_  = "Label";
        this.type_   = "text";
        this.prompt_ = "Enter text";

        this.name_ = "Input";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    set label(newLabel) {

        this.label_ = newLabel;
        this.update(this.createHTML(), this.css_);
    
    }

    set type(newType) {

        this.type_ = newType;
        this.update(this.createHTML(), this.css_);
    
    }

    set prompt(newPrompt) {

        this.prompt_ = newPrompt;
        this.update(this.createHTML(), this.css_);
    
    }

    get label() {

        return this.label_;
    
    }

    get type() {

        return this.type_;
    
    }

    get prompt() {

        return this.prompt_;
    
    }

    get value() {

        return this.shadowRoot.querySelector("input").value;

    }


    createHTML() {

        return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
            <input class="inputValue" type="${this.type_}" placeholder="${this.prompt_}">
        </div>
        `;
    
    }

    createCSS() {

        const inputContainer = this.design.create({
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

        const input = this.design.create({
            class: "inputValue",
            display: "block",
            fontSize: 16,
            width: "100%",
            padding: "8px 12px",
            border: "border",
            borderRadius: 8,
            boxSizing: "border-box"
        });

        const inputHover = this.design.create({
            class: "inputValue",
            pseudoClass: "hover",
            outline: "solid 2px var(--black60)"
        });

        const inputActive = this.design.create({
            class: "inputValue",
            pseudoClass: "focus",
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