import { Comp } from "jay-comp"; 

class Promptbar extends Comp {

    text_; result_ = [];

    set text(v){ this.text_ = v; this.update();}
    get text() { return this.text_; }

    beforeRender(){
        if (!this.text_) 
            this.text_ = window.innerWidth <= 600 ?
                "I want to rent a flat in London that's £2000 a month..." :
                "I want to rent a flat in London that's £2000 a month, has two bedrooms and one bathroom and near a tube station..."
    }

    createHTML() {
        return /*html*/`
        <div class="prompt-wrapper">
            <textarea name="" id="prompt" class="prompt" placeholder="${this.text_}"></textarea>
            <comp-prompt-icon></comp-prompt-icon>
        </div>`
    }

    createCSS() {
        return  [
            { class: "prompt-wrapper",
                display: "flex",
                gap: 20,
                widthPercent: 100,
                maxWidth: 900,
                minHeight: 74,
                padding: 15,
                backgroundVar: "black10",
                borderVar: "border",
                borderRadius: 15,
                boxSizing: "border-box"
            },
            { class: "prompt",
                flexGrow: 1,
                flexShrink: 1,
                widthPercent: 100,
                backgroundVar: "black10",
                border: "none",
                fontSize: 16,
                resize: "none",
                lineHeight: 1.5,
                outline: "none",
                fontFamily: "Geist",
                minHeight: 44,
                maxHeight: 100,
                whiteSpace: "pre-wrap",
                media: { maxWidthBp: 600, fontSize: 16 }
            },
            { class: "prompt",
                pseudoClass: ":placeholder",
                fontFamily: "Geist, sans-serif",
                fontSize: 16
            }
        ];
    }

    autoResize(el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }

    async sendQuery(prompt) {
        const res = await this.request(
            "https://whondo.com/search", "POST", { prompt }
        );

        this.result_ = res.data.results;
        this.update();

        this.dispatchEvent(new CustomEvent("query-results", {
            detail: this.result_,
            bubbles: true,
            composed: true
        }));

        return this.result_;
    }

    afterRender() {
        const textarea = this.query(".prompt");
        textarea.text = this.text_;
        this.autoResize(textarea);
        textarea.addEventListener("input", () => this.autoResize(textarea));

        this.query("comp-prompt-icon").addEventListener("click", () => {
        this.sendQuery(textarea.value);
        });
    }

    static { Comp.register(this); }
}