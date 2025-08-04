import { Input } from "./input.js";

export class Textarea extends Input {

    rows_;

    set rows(newRows) {

        this.rows_ = newRows;
        this.update();

    }

    get rows() { return this.rows_; }

    beforeRender() { if (!this.rows_) this.rows_ = 6; }

    createHTML() {

        return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
            <textarea class="inputValue areaInput" placeholder="${this.prompt_}" rows="${this.rows_}"></textarea>
        </div>
        `;

    }

    createCSS() {
        return [
            super.createCSS(),
            { class: "areaInput",
                resize: "none",
                height: 80,
                widthPercent: 100,
                borderVar: "border",
                borderRadius: 8,
                boxSizing: "border-box",
                padding: [8, 12],
                fontFamily: "Geist",
            },
            { class: "error",
                border: ["solid", 2, "var(--red100)"]
            }
        ];
    }

    static { super.register(this); }

}