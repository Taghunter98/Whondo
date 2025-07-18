import { Dialog } from "./dialog.js";

export class DialogBtn extends Dialog {
    text_;

    set text(v) {
        this.text_ = v;
        this.update(); 
    }

    get text() {
        return this.text_;
    }

    beforeRender() {
        if (!this.text_) this.text_ = "continue";
        super.beforeRender?.(); 
    }

    createHTML() {
        return /* html */ `
            <div class="background">
                <div class="container">
                    <svg class="icon" ${this.svgIcon_}></svg>
                    <h3 class="head">${this.title_}</h3>
                    <p class="dialog">${this.paragraph_}</p>
                    <comp-button class="btn"></comp-button>
                </div>
            </div>
        `;
    }

    static { super.register(this); }
}
