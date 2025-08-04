import { Icon } from "./icon.js";

class MenuIcon extends Icon {
    beforeRender() {
        this.path_ = "menu.svg";
    }

    static { super.register(this); }
}

class CloseIcon extends Icon {
    beforeRender() {
        this.path_ = "close.svg";
    }

    static { super.register(this); }
}

class CardIcon extends Icon {
    createCSS() {
        return [
            super.createCSS(),
            {
                widthPercent: 100
            },
            {
                class: "icon",
                pseudoClass: "active",
                transform: "scale(0.95)",
            },
            {
                class: "icon",
                widthPercent: 100,
                height: 45,
                transition: "transform 0.1s ease",
            },
        ];
    }

    static { super.register(this); }
}