import { Comp } from "jay-comp";
import { Input } from "./input.js";

export class Textarea extends Input {
   
    type_ = "textarea";
    rows_ = 6;
    name_ = "Textarea Input";

    set rows(newRows) {

        this.rows_ = newRows;
        this.update();
    
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

    createCSS() {

        const areaInput = this.design.create({
            class: "areaInput",
            resize: "none",
            height: "80px",
            widthPercent: 100,
            border: "border",
            borderRadius: 8,
            boxSizing: "border-box",
            padding: [8, 12],
            fontFamily: "Geist ",
        });

        return /* css */ `
        ${areaInput}
        `; 
    
    }

    static{

        Comp.register(this);

    }

}


