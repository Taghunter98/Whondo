import { Comp } from "jay-comp";

class Image extends Comp {
    path_;

    set path(v) {
        this.path_ = v;
        this.update();
    }

    beforeRender() {
        if (!this.path_) this.path_ = "Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg";
    }

    createHTML() {
        return `<div class="img-block"></div>`;
    }

    createCSS() {
        return [
            {
                width: "auto"
            },
            {
                class: "img-block",
                boxSizing: "border-box",
                width: 100,
                height: 100,
                backgroundImageUrl: `https://whondo.com/uploads?path=${this.path_}`, backgroundSize: "cover",
                borderRadius: 8,
                cursor: "pointer"
            },
            {
                class: "img-block", pseudoClass: "hover",
                border: ["solid", 4, "var(--black100)"],
            }
        ];
    }

    afterRender() {
        const img = this.query(".img-block");
        img.addEventListener("click", () => {
            console.log("clicked")
            const viewer = document.createElement("comp-large-image");
            console.log(this.path_)
            viewer.path = this.path_;
            document.body.appendChild(viewer);
        });
    }

    static { Comp.register(this); }
}