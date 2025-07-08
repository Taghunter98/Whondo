import { InputComp } from "./input.js";

/** @extends {InputComp} */
class TextareaComp extends InputComp {

    constructor() {

        super();
        this.type_ = "textarea";

        this.name_ = "Textarea Input";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
        
        this.render();
    
    }

    createHTML() {

        return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
            <textarea class="inputValue areaInput" placeholder="${this.prompt_}" rows="6"></textarea>
        </div>
        `;
    
    }

    createCSS(){

        const areaInput = this.design.create({
            class: "areaInput",
            resize: "none",
            height: "80px",
            width: "100%",
        });

        return /* css */`
            ${areaInput}
        `;
    
    }

    

}

customElements.define("comp-textarea", TextareaComp);
