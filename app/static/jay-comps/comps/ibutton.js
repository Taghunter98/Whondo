import { Button } from "./button.js";

export class Ibutton extends Button {

    createCSS(){
        const base = super.createCSS();

        const css = {
            class: "button",
            padding: [12, 2],
            
        } 
        return [base, css]
    }

    static { super.register(this); }

}