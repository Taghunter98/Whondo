import { Comp } from "jay-comp";

export class NewPropCard extends Comp {

    createHTML(){
        return /* html */`
            <button class="add" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
            <div class="label">New Property</div>
            </button>
        `;
    }

    createCSS(){
        return [
            { class: "add",
                width: 309,
                height: 550,
                borderRadius: 14,
                border:[2,"dashed","rgba(0,0,0,.35)"],
                backgroundVar: "black10",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                justifyContent: "centre",
                gap:8, 
                cursor:"pointer", 
                scrollSnapAlign:"start", 
                transition:["transform", ".15s", "ease"],
            },
            { class: "add", pseudoClass: "hover",
                transform: "scale(.98)",
            },
             { class: "add", pseudoClass: "active",
                transform: "scale(0.95)",
                boxShadow: [0, 0, "8px", "rgba(0, 0, 0, 0.1)"],
            },
            { class: "label",
                opacity: .75,
            }

        ];
    }

    afterRender(){
        this.query(".add")?.addEventListener("click",() => {
            this.publish("create-request");
        });
    }


    static { Comp.register(this); }
}
