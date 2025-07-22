import { Input } from "./input.js";

export class Keywords extends Input {
    tags_ = [];

    get value(){
        return this.tags_
    }

    beforeRender(){
        super.beforeRender();
    }

    createHTML() {
         return /* html */ `
        <div class="inputContainer">
            
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
            <input class="inputValue input-tags" type="${this.type}" placeholder="${this.prompt}">
            
            <div class="keywords">
                <label style="color: var(--black80); font-size: 14px">My Keywords</label>
                <div class="tags"></div>
            </div>
        </div>
        `;
    }

    createCSS() {
        const base = super.createCSS();

        return [ base, 
            { class: "keywords",
                 display: "flex",
                flexDirection: "column",
                maxWidth: 460,
                maxHeight: 168,
                padding: 0,
                alignItems: "start",
                gap: 10,
                marginTop: 10,
                background: "white"
                

            },
            { class: "tags",
                display: "flex",
                flexWrap: "wrap",
                widthPercent: 100,
                gap: 10
            },
            { class: "tag",
                display: "flex",
                alignItems: "center",
                background: "white",
                padding: [8, 12],
                fontSize: 14,
                borderVar: "border",
                borderRadius: 8,
                gap: 10,
                boxSizing: "border-box"
            },
            { class: "remove-btn",
                cursor: "pointer",
                fontSize: 16,
                colourVar: "black60",
                padding: 2,
            }
        ];
    }

    addTag(text){
        if (this.tags_.length >= 10 || this.tags_.includes(text)) return;

        this.tags_.push(text);

        const tagEl = document.createElement("div");
        tagEl.className = "tag";
        tagEl.innerHTML = `
            ${text}
            <span class="remove-btn" title="Remove">x</span>
        `;

        tagEl.querySelector(".remove-btn").addEventListener("click", () => {
            this.tags_ = this.tags_.filter(tag => tag !== text );
            this.tagsEl.removeChild(tagEl);
        });

        this.tagsEl.appendChild(tagEl);
    }
    
    afterRender(){

        this.inputEl = this.query(".inputValue");
        this.tagsEl = this.query(".tags");

        this.inputEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && this.inputEl.value.trim()){
                e.preventDefault();
                this.addTag(this.inputEl.value.trim());
                this.inputEl.value = "";
            }
        });
    }

   
    static { super.register(this); }
}
