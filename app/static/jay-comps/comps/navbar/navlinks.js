import { Comp } from "jay-comp";

export class NavLinks extends Comp {
    links_;

    beforeRender() {
        this.links_ = ["About", "Mission", "Contribute"];
    }

    createHTML() {
        return `<ul class="links"></ul>`
    }

    createCSS() {
        return [
            { width: "auto" },
            {
                class: "links",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
                media: { maxWidthBp: 600, display: "none" }
            }];
    }

    afterRender() {
        this.links_.forEach(link => {
            const li = document.createElement("comp-link");
            li.text = link;
            this.query("ul").appendChild(li);
        });
    }

    static { Comp.register(this); }
}