import { Comp } from "jay-comp";

class Chip extends Comp {
    text_; matched_ = false;

    set text(v) {
        this.text_ = v;
        this.update();
    }
    set matched(v) {
        this.matched_ = v;
        this.update();
    }

    beforeRender() {
        if (!this.text_) this.text_ = "Chip";
    }

    createHTML() {
        return `<div class="chip"><p style="font-size: 12px">${this.text_}</p></div>`;
    }

    createCSS() {
        return [
            {
                width: "auto"
            },
            {
                class: "chip",
                colourVar: this.matched_ ? "green100" : "black80",
                padding: [0, 24],
                backgroundVar: this.matched_ ? "green20" : "white",
                borderVar: this.matched_ ? "borderGreen" : "border",
                borderRadius: 8
            }
        ];
    }

    static { Comp.register(this); }
}