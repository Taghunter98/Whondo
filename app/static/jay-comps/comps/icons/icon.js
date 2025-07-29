import { Comp } from "jay-comp";

export class Icon extends Comp {

    path_;

    set path(newPath) {
        this.path_ = newPath;
        this.update();
    }

    get path() { return this.path_; }

    beforeRender() {
        if (!this.path_) this.path_ = "attow.svg";
    }

    createHTML() {
        return /* html */`<img class="icon" src="https://whondo.com/static/icons/${this.path_}">`;
    }

    createCSS() {
        return [
            { width: "auto" },
            {
                class: "icon",
                display: "flex",
                borderVar: "borderDefault",
                borderRadius: 8,
                width: "auto",
                padding: 5,
                cursor: "pointer",
                transition: ["background", "0.1s", "ease-in-out"]
            },
            {
                class: "icon",
                pseudoClass: "hover",
                backgroundVar: "black10",
                borderVar: "border"
            },
            {
                class: "icon",
                pseudoClass: "active",
                backgroundVar: "black20"
            },
        ];
    }

    static { Comp.register(this); }

}