import { Comp } from "jay-comp";

class Modal extends Comp {
    title_; description_; button_; image_;

    set title(v) {
        this.title_ = v;
        this.update();
    }
    set description(v) {
        this.description_ = v;
        this.update();
    }
    set button(v) {
        this.button_ = v;
        this.update();
    }
    set image(v) {
        this.image_ = v;
        this.update();
    }

    beforeRender() {
        if (!this.title_) this.title_ = "Title";
        if (!this.description_) this.description_ = "Lorem ipsum dolor sit amet";
        if (!this.image_) this.image_ = "london.jpg";
    }

    createHTML() {
        return /*html*/`
        <div class="background">
            <div class="modal">
                <div class="textContainer">
                    <h3 class="title" style="font-weight: bold">${this.title_}</h3>
                    <p class="text">${this.description_}</p>
                </div>
                <comp-button></comp-button>
            </div>
        </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "background",
                display: "flex",
                alignItems: "centre",
                justifyContent: "centre",
                padding: 100,
                backgroundImageUrl: `https://whondo.com/static/icons/assets/${this.image_}`,
                backgroundSize: "cover"
            },
            {
                class: "modal",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                width: 500,
                background: "white",
                padding: 20,
                borderRadius: 14,
                media: {
                    maxWidthBp: 600,
                    boxsizing: "border-box",
                    width: "auto",
                }
            },
            {
                class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 5,
                paddingBottom: 40
            }
        ];
    }

    afterRender() {
        const btn = this.query("comp-button");
        btn.text = this.button_;
        btn.addEventListener("click", () => this.publish("modal-clicked"));
    }

    static { Comp.register(this); }
}
