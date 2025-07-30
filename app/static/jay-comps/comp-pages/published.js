import { Comp } from "jay-comp";

export class Published extends Comp {
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
            flexDirection: "column",
            widthPercent: 100,
            heightVh: 100,
            justifyContent: "centre",
            alignItems: "centre",
            background: "rgba(0, 0, 0, 0.6)",
            overflow: "hidden",
            position: "fixed",
            zIndex: 9999,
            media: {
                maxWidthBp: 600,
                padding: 20,
                width: "auto"
            }
        };

        const container = {
            class: "container",
            background: "white",
            borderRadius: 16,
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
        btn.style.maxWidth = "125px";
        btn.text = "continue";


        btn.addEventListener("click", () => {
            window.location.assign("/");
        })

        const icon = dialogBox.query("comp-icon");
        icon.style.display = "none";

        
    }

    static { Comp.register(this); }
}