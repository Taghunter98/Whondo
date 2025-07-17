import { Button } from "./button.js";

export class Ibutton extends Button {
    
    createCSS(){
        const base = super.createCSS();

        const css = {
            class: "button",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            minWidth: 44,
            minHeight: 44,
            width: 44,
            height: 44,
            borderRadius: 8,
            padding: [12, 2],
            transition: ["background", "0.1s", "ease-in-out"]
        } 

        return [base, css]
    }

    static { super.register(this); }

}