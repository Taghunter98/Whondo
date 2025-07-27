import { NavLinks } from "./navlinks.js";

class MobNavLinks extends NavLinks {
    createCSS() {
        return  { class: "links",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: 5,
            padding: [10, 0, 40, 0]
        };
    }

    static { super.register(this); }
}