import { Comp } from "jay-comp";

export class NavLinks extends Comp {
    links_;

    beforeRender() {
        this.links_ = {
            About: "/about",
            "Advertise My Home": "/advert/advertise",
            "My Properties": "/profile/properties",
        };
    }

    createHTML() {
        return `<ul class="links"></ul>`;
    }

    createCSS() {
        return [
            {
                width: "auto",
            },
            {
                class: "links",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                media: { maxWidthBp: 600, display: "none" },
            },
        ];
    }

    afterRender() {
        for (const link in this.links_) {
            const li = document.createElement("comp-link");
            li.text = link;
            li.link = this.links_[link];
            this.query("ul").appendChild(li);
        }
    }

    static {
        Comp.register(this);
    }
}
