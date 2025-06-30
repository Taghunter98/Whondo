import { Comp } from "jay-comp";

class Icon extends Comp {

    constructor() {

        super();
        this.path_ = "";
        
        this.name_ = "Icon";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
        
        this.render();
    
    }

    set path(newPath) {

        this.path_ = newPath;
        this.update(this.createHTML(), this.css_);
    
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
        :host {
            width: auto
        }
        ${icon}
        ${iconHover}
        ${iconActive}
        `;
    
    }

}

customElements.define("comp-icon", Icon);