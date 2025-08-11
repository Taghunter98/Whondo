import { Comp } from "jay-comp";

export class EditProp extends Comp {

    createHTML(){
        return /* html */`
            <comp-navbar></comp-navbar>
            <div class="background">
            <div class="container">
                <comp-pic-banner id="banner"></comp-pic-banner>
                <div class="options">
                    <comp-prop-gal></comp-prop-gal>
                </div>
            </div>
        </div>
        `;
    }

    createCSS() {

        return [
            {
                class: "background",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                background: "white",
                widthPercent: 100,
                boxSizing: "border-box",
                media: {
                    maxWidthBp: 600,
                    alignItems: "start"
                }
            },
            {
                class: "container",
                maxWidthPercent: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                marginTop: 100,
            },
            {
                class: "options",
                display: "flex",
                boxSizing: "border-box",
                maxWidthPercent: 100,
                flexDirection: "column",
                gap: 20,
                padding: [0, 20],
            }
        ]
    }

    afterRender(){
        const btn = this.getById("banner");

        btn.btnText = "Account";

        const gallery = this.query("comp-prop-gal");

        // handle events coming from children
        gallery.subscribe("create-request", () => {
            window.location.assign("/advert/new");
        });

        gallery.subscribe("property-edit", (e) => {
            //Todo edit
            console.log("edit property", e.detail?.id);
        });

        gallery.subscribe("property-delete", (e) => {
            //todo delete api
            console.log("delete property", e.detail?.id);
        });
    }

    static { Comp.register(this); }
}