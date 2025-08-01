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
            display: "flex",
            background: "white",
            animation: prop,
            width: "auto",
        };

        return [effect, background, container];
    }

    afterRender() {
        const describe = this.getById("describe");

        describe.svgIcon = `xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="currentColor"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/`;

        describe.title = "Verified";
        describe.paragraph = `Your account has now been verified.`;

        const btn = describe.query("comp-button");
        btn.text = "Continue";
        btn.fill = true;

        btn.addEventListener("click", () => window.location.assign("/"));
    }

    static { Comp.register(this); }
}