import { Comp } from "jay-comp";

export class ProfileOption extends Comp {

    title_; subTitle_;

    set title(v) {
        this.title_ = v;
        this.update();
    }

    set subTitle(v) {
        this.subTitle_ = v;
        this.update();
    }

    get title() { return this.Title_; }
    get subTitle() { return this.subTitle_; }

    createHTML() {
        return /* html */ `
        <div class="option-card">
            <h6 class="title">${this.title_}</h6>
            <div class="icon">
                <comp-prompt-icon></comp-prompt-icon>
            </div>
        </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "option-card",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "centre",
                width: 1140,
                maxWidthPercent: 100,
                gap: 10,
                padding: 20,
                borderRadius: 14,
                borderVar: "border",
                boxSizing: "border-box",
                media: {
                    maxWidthBp: 600,

                }
            },
            {
                class: "title",
                fontWeight: "bold"
            },
            {
                class: "icon",
                flexShrink: 0
            }
        ];
    }

    afterRender() {
        this.query("comp-prompt-icon").addEventListener("click", () => this.publish("option-clicked"));
    }

    static { Comp.register(this); }
}