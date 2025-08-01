import { Input } from "./input.js";

export class Keywords extends Input {
    tags_ = [];
    validOptions_ = [];
    list_ = [];
   
    set list(v){
        this.list_ = (v || []).map(opt => typeof opt === "string" ? { label: opt, value: opt } : opt );
        this.validOptions_ = this.list_.map(opt => opt.value);
    }

    get value() { return this.tags_; }
    get list() { return this.list_; }

    beforeRender() {
        super.beforeRender();
    }

    createHTML() {
        return /* html */ `
        <div class="inputContainer">
            
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
           
            <div class="input-dropdown-wrapper">
                <input class="inputValue input-tags" type="${this.type}" placeholder="${this.prompt}">
                <comp-dropdown></comp-dropdown>
            </div> 
            
            <div class="keywords">
                <label style="color: var(--black80); font-size: 14px">My Keywords</label>
                <div class="tags"></div>
            </div>
        </div>
        `;
    }

    createCSS() {
        const base = super.createCSS();

        return [base,
            {
                class: "keywords",
                display: "flex",
                flexDirection: "column",
                maxWidth: 460,
                padding: 0,
                alignItems: "start",
                gap: 10,
                marginTop: 10,
                background: "white"
            },
            {
                class: "tags",
                display: "flex",
                flexWrap: "wrap",
                widthPercent: 100,
                gap: 10
            },
            {
                class: "tag",
                display: "flex",
                alignItems: "center",
                background: "white",
                padding: [8, 12],
                fontSize: 14,
                borderVar: "border",
                borderRadius: 8,
                gap: 10,
                boxSizing: "border-box",
                heighPercent: 100,
            },
            {
                class: "remove-btn",
                cursor: "pointer",
                fontSize: 16,
                colourVar: "black60",
                padding: 2,
            },
            {
                class: "input-dropdown-wrapper",
                widthPercent: 100,
            }
        ];
    }

    addTag(label) {
        const match = this.list_.find(opt => opt.label === label);
        if (!match) return;

        const value = match.value;

        if (this.tags_.length >= 10 || this.tags_.includes(value) || !this.validOptions_.includes(value)) return;

        this.tags_.push(value);

        this.inputEl?.classList.remove("error");

        const tagEl = document.createElement("div");
        tagEl.className = "tag";
        tagEl.textContent = match.label;

        const removeBtn = document.createElement("span");
        removeBtn.className = "remove-btn";
        removeBtn.title = "remove"

        const iconEl = document.createElement("comp-icon");
        iconEl.path = "close.svg"

        removeBtn.appendChild(iconEl);
        tagEl.appendChild(removeBtn);

        removeBtn.addEventListener("click", () => {
            this.removeTag(value)
        });

        this.tagsEl.appendChild(tagEl);
    }

    removeTag(value){
        const tagIndex = this.tags_.findIndex(tag => tag === value);
        if(tagIndex === -1) return;

        this.tags_ = this.tags_.filter(tag => tag !== value);

        const label = this.list_.find(opt => opt.value === value)?.label;
        if (!label) return;

        const tagEls = Array.from(this.tagsEl.querySelectorAll(".tag"));
        for (let tagEl of tagEls){
            if(tagEl.textContent.includes(label)){
                this.tagsEl.removeChild(tagEl);
                break;
            }
        }
    }

    afterRender() {
        const dropdown = this.query("comp-dropdown");
        this.inputEl = this.query(".inputValue");
        this.tagsEl = this.query(".tags");

        dropdown.setOptions(this.list_);
        dropdown.attachToInput(this.inputEl);

        this.inputEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && this.inputEl.value.trim()) {
                e.preventDefault();
                this.addTag(this.inputEl.value.trim());
                this.inputEl.value = "";
            }
        });

        dropdown.subscribe("option-selected", (e) => {
            if (e.detail.label) {
                this.addTag(e.detail.label);
                this.inputEl.value = "";
            }
        });

    }

    static { super.register(this); }
}