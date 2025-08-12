import { Comp } from "jay-comp";

export class EditProp extends Comp {

    createHTML(){
        return /* html */`
            <comp-popup id="deleted" style="display: none"></comp-popup>
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

    showPopup(id, title, paragraph, leftBtn = "OK", hideButton = true, rightBtn) {
        const popup = this.getById(id);
        popup.hideButton(hideButton)
        popup.title = title;
        popup.paragraph = paragraph;
        popup.textLeft = leftBtn;
        popup.textRight = rightBtn;
        popup.style.display = "flex";
        const icon = popup.query(".icon");
        icon.style.display = "none";
    }

     deleteProperty(id) {
        const popup = this.getById("deleted");
        this.showPopup("deleted", "Delete Property", "Are you sure you want to delete your property?.", "Back", false, "Delete");
        popup.subscribe("popup-rightBtn", async () => {
            const res = await this.request("/advert/delete", "POST", {pkaID: id});
            console.log("Sent delete request: " + res.error)
            if (res.ok) this.query("comp-prop-gal")?.deleteItem(id);
            else this.showPopup("deleted", "Deletion Failed", res.error || "Something went wrong.");
        }, { once: true });
    }

    afterRender(){
        const btn = this.getById("banner");

        btn.btnText = "Account";

        const gallery = this.query("comp-prop-gal");

        gallery.subscribe("create-request", () => {
            window.location.assign("/advert/new");
        });

        gallery.subscribe("property-edit", (e) => {
            window.location.assign("/advert/update")
        });

        gallery.subscribe("property-delete", (e) => {
            const id = e?.detail?.id;
            if(id) this.deleteProperty(id);
            
        });
    }

    static { Comp.register(this); }
}