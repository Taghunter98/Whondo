import { InputComp } from "./input.js";

class TextareaComp extends InputComp {

    constructor() {

        super();
        this.type_ = "textarea";
        this.rows_ = 6;

        this.name_ = "Textarea Input";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
        
        this.render();
    
    }

    set rows(newRows) {

        this.rows_ = newRows;
        this.update(this.createHTML(), this.css_);
    
    }

    get rows() {

        return this.rows_;
    
    }

    createHTML() {

        return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
            <textarea class="inputValue areaInput" placeholder="${this.prompt_}" rows="${this.rows_}"></textarea>
        </div>
        `;
    
    }

}

customElements.define("comp-textarea", TextareaComp);
