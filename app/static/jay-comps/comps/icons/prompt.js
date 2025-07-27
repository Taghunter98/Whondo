import { Icon } from "./icon.js";

export class PromptIcon extends Icon {
    beforeRender() {
        this.path_ = "arrow.svg";
    }

    createHTML() {
        return /* html */`
            <div class="container">
                <!-- CHANGE SRC BACK IN PROD -->
                <img class="icon" src="/app/static/icons/${this.path_}">
            </div>
        `;
    }

    createCSS() {
        return [
            { class: "container",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                backgroundVar: "black100",
                borderRadius: 8,
                cursor: "pointer",
                transition: "background 0.2s ease-in-out"
            },
            { class: "container", pseudoClass: "hover", 
                backgroundVar: "black80"
            },
            { class: "container", pseudoClass: "active", 
                backgroundVar: "black20"
            },
            { class: "icon", 
                transform: "translateX(0)",
            },
            { class: "container",
                pseudoClass: "hover",
                childClass: "icon",
                transform: "translateX(5px)",
                transition: "transform 0.3s ease-in-out"
            }
        ];
    }

    static { super.register(this); }
}