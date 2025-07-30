import { Comp } from 'jay-comp';

export class Verified extends Comp {
    createHTML() {
        return /* html */`
        <div class="background">
            <div class="container">
                <comp-dialog id="describe"></comp-dialog>
            </div>
        </div>
        `;
    }

    createCSS() {
        const effect = this.effect.slideUp(20);
        const prop = this.effect.prop("slideUp", .5);

        const background = {
            class: "background",
            display: "flex",
            heightVh: 100,
            flexDirection: "column",
            widthPercent: 100,
            alignItems: "centre",
            backgroundVar: "black10",
            justifyContent: "centre",
            overflow: "hidden",
            media: {
                maxWidthBp: 600,
                padding: 20,
                width: "auto"
            }
        };

        const container = {
            class: "container",
            background: "white",
            animation: prop,
            width: "auto",
        };

        return [effect, background, container];
    }

    afterRender() {
        const describe = this.getById("describe");
        describe.title = "Verified";
        describe.paragraph = `Your account has now been verified.`;

        const btn = describe.query("comp-button");
        btn.text = "Continue";
        btn.fill = true;

        const icon = describe.query("comp-icon");
        icon.style.display = "none";

        btn.addEventListener("click", () => window.location.assign("/"));
    }

    static { Comp.register(this); }
}