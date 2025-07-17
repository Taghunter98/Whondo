import { Icon } from "./icon.js";

export class Ibutton extends Icon {

    createHTML() {
        return /* html */`
            <div class="icon-wrapper">
                <img class="icon-img" src="/static/icons/${this.path_}">
            </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "icon-wrapper",
                display: "flex",
                alignItems: "centre",
                justifyContent: "centre",
                width: 44,
                height: 44,
                backgroundVar: "black100",
                borderRadius: 8,
                cursor: "pointer",
                transition: ["background", "0.2s", "ease-in-out"]
            },
            {
                class: "icon-wrapper",
                pseudoClass: "hover",
                backgroundVar: "black80"  
            },
        ];
    }

    static { super.register(this); }
}
