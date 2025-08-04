import { Comp } from "jay-comp";

export class Dialog extends Comp {
    title_; paragraph_; text_;

    set title(newTitle) {
        this.title_ = newTitle;
        this.update();
    }
    set paragraph(value) {
        this.paragraph_ = value;
        this.update();
    }
    set text(v) {
        this.text_ = v;
        this.update();
    }
    get paragraph() { return this.paragraph_; }
    get title() { return this.title_; }
    get text() { return this.text_ }

    beforeRender() {
        if (!this.title_) this.title_ = "Hello World";
        if (!this.paragraph_) this.paragraph_ = "This is a paragraph";
    }

    createHTML() {
        return /* html */ `
            <div class="background">
                <div class="container">
                    <comp-icon class="icon"></comp-icon>
                    <h3 class="head">${this.title_}</h3>
                    <p class="dialog">${this.paragraph_}</p>
                    <div class="button-wrapper">
                    <comp-button class="btn"></comp-button>
                    </div>
                </div>
            </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "background",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                alignItems: "centre",
                gap: 0,
                justifyContent: "centre",
                media: {
                    maxWidthBp: 600,
                    padding: 20,
                    width: "auto"
            }
            },
            {
                class: "container",
                display: "flex",
                flexDirection: "column",
                width: "auto",
                maxWidth: 500,
                padding: 20,
                borderVar: "border",
                borderRadius: 16,
                gap: 10,
                background: "white",
                marginTop: 0,
                media: {
                    maxWidthBp: 600,
                }
            },
            {
                class: "dialog",
                fontSize: 16,
                textAlign: "start",
                media: {
                    maxWidthBp: 600,
                    fontSize: 16
                }
            },
            {
                class: "icon",
                display: "flex",
                alignItems: "centre",
                justifyContent: "centre",
                colourVar: "black80",
            },
        ];
    }

     afterRender() {
        this.query("comp-button").text = this.text_;
        this.query("comp-button").fill = true;
        
    }

    static { Comp.register(this); }

}