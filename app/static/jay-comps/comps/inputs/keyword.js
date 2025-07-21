import { Input } from "./input.js";

export class Keywords extends Input {
    
    createHTML(){

         return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
            <input class="inputValue" type="${this.type}" placeholder="${this.prompt}">
        </div>
        `;
    }
    
    createCSS(){
        const base = super.createCSS();

        return [base,]
    }

    afterRender(){

    }

    static { super.register(this); }
}