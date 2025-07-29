import { Comp } from "jay-comp";

export class Published extends Comp {
    createHTML() {
        return /* html */`
        <comp-navbar></comp-navbar>
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
            flexDirection: "column",
            widthPercent: 100,
            heightVh: 100,
            justifyContent: "centre",
            alignItems: "centre",
            backgroundVar: "black10",
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
        const dialogBox = this.getById("describe");
        dialogBox.title = "Advert Published!";
        dialogBox.paragraph = "Congratulations! You can now view your new advert or monitor it in your Landlord portal.";

        const btn = dialogBox.query("comp-button");
        btn.style.display = "block";
        btn.text = "continue";
    }

    static { Comp.register(this); }
}