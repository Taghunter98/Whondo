import { Comp } from "jay-comp";

export class Popup extends Comp {
    title_; paragraph_; textLeft_; textRight_; hideFlag_;

    set title(newTitle) {
        this.title_ = newTitle;
        this.update();
    }
    set paragraph(value) {
        this.paragraph_ = value;
        this.update();
    }
    set textLeft(v) {
        this.textLeft_ = v;
        this.update();
    }

    set textRight(v) {
        this.textRight_ = v;
        this.update();
    }


    get paragraph() { return this.paragraph_; }
    get title() { return this.title_; }
    get textLeft() { return this.textLeft_; }
    get textRight() { return this.textRight_; }

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
                    <comp-button class="left-btn"></comp-button>
                    <comp-button class="right-btn"></comp-button>
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
                widthPercent: 100
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
        const wrapper = {
            class: "button-wrapper",
            display: "flex",
            flexDirection: "row",
            gap: 10,
        }

        return [background, container, dialog, icon, effect, wrapper,];
    }

    hideButton(f = false) {
        this.hideFlag_ = f;
    }

    afterRender() {
        this.query(".left-btn").text = this.textLeft_;
        this.query(".left-btn").fill = true;
        this.query(".left-btn").variant = 2;

        const right = this.query(".right-btn");
        right.text = this.textRight_;
        right.fill = true;

        if (this.hideFlag_ === true) {
            right.style.display = "none";
            this.query(".left-btn").variant = 1;
        }

        this.query(".left-btn").addEventListener("click", () => {
            this.style.display = "none";
            this.publish("popup-leftBtn");
        });

        this.query(".right-btn").addEventListener("click", () => {
            this.style.display = "none";
            this.publish("popup-rightBtn");
        });

    }

    static { Comp.register(this); }


}