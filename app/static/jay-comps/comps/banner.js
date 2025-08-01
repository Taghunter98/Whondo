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
                    textAlign: "centre",
                    gap: 16,
                    width: "auto"
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
                fontSize: 26,
                fontWeight: "bold",
                margin: 0
            },
            {
                class: "action",
                display: "flex",
                gap: 12,
                media: {
                    maxWidthBp: 600,
                    justifyContent: "centre",
                    flexWarp: "warp"
                }
            },
            {
                class: "btn1",
                fontSize: 14
            },
            {
                class: "btn2",
                fontSize: 14
            }
        ];
    }

    afterRender() {
        if (this.btnText1_) {
            const btn1 = this.query(".btn1");
            btn1.text = this.btnText1_;
            btn1.fill = true;
            btn1.addEventListener("click", () => {
                btn1.publish("btn1-click");
            });
        }

        if (this.btnText2_) {
            const btn2 = this.query(".btn2");
            btn2.text = this.btnText2_;
            btn2.fill = false;

            btn2.addEventListener("click", () => {
                btn2.publish("btn2-click");
            });
        }
    }

    static { Comp.register(this); }
}
