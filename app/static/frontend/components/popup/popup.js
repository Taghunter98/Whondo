import { Comp } from "jay-comp";

export class Popup extends Comp {
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
                    <h3 style="font-weight: bold">${this.title_}</h3>
                    <p class="dialog">${this.paragraph_}</p>
                    <div class="button-wrapper">
                    <comp-button class="btn"></comp-button>
                    </div>
                </div>
            </div>
        `;
    }
    createCSS() {
        const effect = this.effect.slideUp(20);
        const prop = this.effect.prop("slideUp", .5);

        const background = {
            class: "background",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            heightVh: 100,
            justifyContent: "centre",
            alignItems: "centre",
            background: "rgba(0, 0, 0, 0.6)",
            overflow: "hidden",
            position: "fixed",
            zIndex: 9999,
            media: {
                maxWidthBp: 600,
                padding: 20,
                width: "auto"
            }
        };

        const container = {
            class: "container",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            width: 500,
            padding: 20,
            borderVar: "border",
            borderRadius: 16,
            gap: 10,
            background: "white",
            animation: prop,
            marginTop: 0,
            media: {
                maxWidthBp: 600,
                width: "auto"
            }
        };

        const dialog = {
            class: "dialog",
            fontSize: 16,
            textAlign: "start",
            media: {
                maxWidthBp: 600,
                fontSize: 16
            }
        }

        const icon = {
            class: "icon",
            display: "flex",
            alignItems: "centre",
            justifyContent: "centre",
            colourVar: "black80",
        }

        return [background, container, dialog, icon, effect];
    }

    afterRender() {
        this.query("comp-button").text = this.text_;
        this.query("comp-button").fill = true;

        this.query("comp-button").addEventListener("click", () => {
            this.style.display = "none";
            this.publish("popup-button");
        });

    }

    static { Comp.register(this); }


}