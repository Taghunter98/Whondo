import { Comp } from "jay-comp";

class LargeImage extends Comp {
    path_;

    set path(v) {
        this.path_ = v;
        this.update();
    }

    createHTML() {
        return /*html*/`
        <div class="overlay">
            <div class="backdrop"></div>
            <img class="viewer" src="https://whondo.com/uploads?path=${this.path_}" />
        </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "overlay",
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999
            },
            {
                class: "backdrop",
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(0,0,0,0.6)",
                cursor: "pointer"
            },
            {
                class: "viewer",
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: 12,
                zIndex: 1,
                boxShadow: "0 0 20px rgba(0,0,0,0.3)"
            }
        ];
    }

    afterRender() {
        this.query(".backdrop").addEventListener("click", () => {
            this.remove();
        });
    }

    static { Comp.register(this); }
}
