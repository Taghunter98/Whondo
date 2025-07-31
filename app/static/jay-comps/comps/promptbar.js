import { Comp } from "jay-comp";

export class Promptbar extends Comp {
    text_; result_ = []; loading_ = false;

    set text(v) { this.text_ = v; this.update(); }
    get text() { return this.text_; }

    set loading(v) { this.loading_ = v; this.update(); }
    get loading() { return this.loading_; }

    beforeRender() {
        if (!this.text_)
            this.text_ =
                window.innerWidth <= 600
                    ? "I want to rent a flat in London that's £2000 a month..."
                    : "I want to rent a flat in London that's £2000 a month, has two bedrooms and one bathroom and near a tube station...";
    }

    createHTML() {
        return /* html */`
        <div class="prompt-wrapper">
            <textarea
            class="prompt"
            placeholder="${this.text_}"
            ></textarea>
            <button class="icon-btn" type="button">
            ${this.loading
                ? `<comp-spinner></comp-spinner>`
                : `<comp-prompt-icon></comp-prompt-icon>`}
            </button>
        </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "prompt-wrapper",
                position: "relative",
                display: "flex",
                gap: 20,
                widthPercent: 100,
                maxWidth: 900,
                padding: 15,
                backgroundVar: "black10",
                borderVar: "border",
                borderRadius: 15,
                boxSizing: "border-box",
                transition: "transform 0.1s ease-in-out"
            },
            {
                class: "prompt-wrapper", pseudoClass: "active",
                transform: "scale(0.95)",
            },
            {
                class: "prompt",
                flexGrow: 1,
                backgroundVar: "black10",
                border: "none",
                fontSize: 16,
                lineHeight: 1.5,
                outline: "none",
                fontFamily: "Geist",
                minHeight: 44,
                maxHeight: 100,
                resize: "none",
                whiteSpace: "pre-wrap",
                media: { maxWidthBp: 600, fontSize: 16 }
            },
            {
                class: "prompt",
                pseudoClass: ":placeholder",
                fontFamily: "Geist, sans-serif",
                fontSize: 16
            },
            {
                class: "icon-btn",
                background: "transparent",
                border: "none",
                padding: 0,
                margin: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }
        ];
    }

    autoResize(el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    }

    async sendQuery(prompt) {
        const res = await this.request(
            "https://whondo.com/search", "POST", { prompt }
        );
        this.result_ = res.data.results;
        return this.result_;
    }

    afterRender() {
        const textarea = this.query(".prompt");
        this.autoResize(textarea);
        textarea.addEventListener("input", () => this.autoResize(textarea));

        this.query("button.icon-btn").addEventListener("click", async () => {
            const prompt = textarea.value.trim();
            if (this.loading || !prompt) return;

            this.loading = true;

            const results = await this.sendQuery(prompt);
            this.loading = false;

            this.publish("query-results", results);
        });
    }

    static { Comp.register(this); }
}
