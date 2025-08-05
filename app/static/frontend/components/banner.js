import { Comp } from "jay-comp";

export class Banner extends Comp {
    title_;
    btnText1_;
    btnText2_;

    set title(v) {
        this.title_ = v;
        this.update();
    }

    set btnText1(v) {
        this.btnText1_ = v;
        this.update();
    }

    set btnText2(v) {
        this.btnText2_ = v;
        this.update();
    }

    get title() { return this.title_; }
    get btnText1() { return this.btnText1_; }
    get btnText2() { return this.btnText2_; }

    createHTML() {
        return /* html */ `
            <div class="banner">
                <div class="content">
                    <h4 class="title">${this.title_}</h4>
                </div>
                <div class="action">
                    <comp-button class="btn1"></comp-button>
                    <comp-button class="btn2"></comp-button>
                </div>
            </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "banner",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "centre",
                flexDirection: "row",
                maxWidthPercent: 100,
                background: "white",
                borderRadius: 12,
                padding: 20,
                gap: 12,
                boxSizing: "border-box",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column",
                    gap: 16,
                    alignItems: "start"
                }
            },
            {
                class: "content",
                flex: 1,
                display: "flex",
                alignItems: "centre",
                justifyContent: "flex-start",
                media: {
                    maxWidthBp: 600,
                    justifyContent: "centre",
                }
            },
            {
                class: "title",
                fontWeight: "bold"
            },
            {
                class: "action",
                display: "flex",
                gap: 12,
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100
                }
            }
        ];
    }

    afterRender() {
        const btn1 = this.query(".btn1");
        const btn2 = this.query(".btn2");

        btn1.text = this.btnText1_;
        btn2.text = this.btnText2_;
        btn1.variant = 2;

        btn1.addEventListener("click", () => btn1.publish("btn1-click"));
        btn2.addEventListener("click", () => btn2.publish("btn2-click"));
    }

    static { Comp.register(this); }
}