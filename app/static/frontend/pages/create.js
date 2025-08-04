import { Comp } from "jay-comp";

export class Create extends Comp {
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
        dialogBox.title = "Email Verification";
        dialogBox.paragraph = "We have sent you an email with a verification link.<br>If you do not receive an email, please check your spam.";
        const btn = dialogBox.query("comp-button");
        btn.style.display = "none";
        const icon = dialogBox.query("comp-icon")
        icon.style.display = "none";
       
    }

    static { Comp.register(this); }

}
