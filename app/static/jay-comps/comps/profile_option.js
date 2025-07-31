import { Comp } from "jay-comp";

export class ProfileOption extends Comp {

    title_ ; subTitle_;

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
            <div class="text">
                <h4 class="title">${this.title_}</h4>
                <p class="subtitle">${this.subTitle_}</p>
            </div>
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
                height: 102,
                maxWidthPercent: 100,
                gap:10,
                padding: 20,
                borderRadius: 14,
                borderVar: "border",
                background: "white",
                boxSizing: "border-box",
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,

                }
            },
            {
                class: "text",
                display: "flex",
                flexDirection: "column",
                gap: 4
            },
            {
                class: "title",
                margin: 0,
                fontSize: 24,
                fontWeight: "bold"
            },
            {
                class: "subtitle",
                margin: 0,
                fontSize: 16,
                colorVar: "black60"
            },
            {
                class: "icon",
                flexShrink: 0
            }
        ];
    }

    static { Comp.register(this); }
}
