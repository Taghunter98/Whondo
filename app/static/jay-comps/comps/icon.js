import { Comp } from "jay-comp";

export class Icon extends Comp {
        
    path_ = "";
    name_ = "Icon";

    constructor() {

        super();
        this.host({width: "auto"});
    
    }
       
    set path(newPath) {

        this.path_ = newPath;
        this.update();
    
    }
    
    get path() {

        return this.path_;
    
    }

    createHTML() {

        return /* html */ `
        <img class="icon" src="/static/icons/${this.path_}">
        `;
    
    }

    createCSS() {

        const icon = this.design.create({
            class: "icon",
            display: "flex",
            border: "borderDefault",
            borderRadius: 8,
            width: "auto",
            padding: 5,
            cursor: "pointer",
            transition: "background 0.1s ease-in-out"
        });

        const iconHover = this.design.create({
            class: "icon",
            pseudoClass: "hover",
            background: "black10",
            border: "border"
        });

        const iconActive = this.design.create({
            class: "icon",
            pseudoClass: "active",
            background: "black20"
        });
        
        return /* css */ `
        ${icon}
        ${iconHover}
        ${iconActive}
        `;
    
    }

    static {

        Comp.register(this);

    }

}

