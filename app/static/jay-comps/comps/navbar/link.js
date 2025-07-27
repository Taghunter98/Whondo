import { Comp } from "jay-comp";

class Link extends Comp {
    text_;

    constructor() {
        super();
        this.host({width: "auto"});
    }

    set text(v) {
        this.text_ = v;
        this.update();
    }

    get text() { return this.text_; }

    beforeRender() {
        if (!this.text_) this.text_ = "Link";
    }

    createHTML(){
        return `<li class="link">${this.text_}</li>`;
    }

    createCSS() {
        return [
            { class: "link",
                colourVar: "black80",
                fontSize: 16,
                padding: 10,
                borderVar: "borderDefault",
                borderRadius: 8,
                listStyleType: "None",
                cursor: "pointer",
                transition: ["background", "0.1s", "ease-in-out"]
            },
            { class: "link", pseudoClass: "hover",
                colourVar: "black100",
                borderVar: "border",
                backgroundVar: "black10"
            },
            { class: "link", pseudoClass: "active",
                backgroundVar: "black20"
            },
        ]
    }

    static { Comp.register(this); }
}