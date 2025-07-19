import { Comp } from "jay-comp";

export class Icon extends Comp {
        
    path_;

    constructor() {
        super();
        this.host({width: "auto"});
    }
       
    set path(newPath) {
        this.path_ = newPath;
        this.update();
    }
    
    get path() { return this.path_;}

    createHTML() {
       return /* html */`<img class="icon" src="/static/icons/${this.path_}">`;
    }

    createCSS() {

        return [
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