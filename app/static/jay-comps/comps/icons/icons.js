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