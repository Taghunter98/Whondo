import { Comp } from "jay-comp";

export class UpdateProfile extends Comp {
    createHTML() {
        return /* html */ `
        <comp-navbar></comp-navbar>
        <div class="background">
            <div class="container">
                <div class="modal">
                    <form class="formObj">
                        <!-- User personalisation  -->
                        <div>
                            <div class="textContainer">
                                <h4 class="title">Account</h4> 
                            </div>
                             <div class="inputRow">
                                <comp-input id="name" name="name"></comp-input>
                                <comp-input id="surname" name="surname"></comp-input>
                            </div>
                            <div class="input">
                                <comp-textarea id="bio" name="bio"></comp-textarea>
                                <comp-file id="picture" name="picture"></comp-file>
                            </div>
                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button id="back" type="button"></comp-button>
                                    <comp-button id="submit" type="submit"></comp-button>
                                </div>
                            </div>
                        </div>
                    </form>
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
                justifyContent: "centre",
                widthPercent: 100,
                heightVh: 100,
                overflow: "hidden",
                position: "fixed",
                background: "rgba(0, 0, 0, 0.6)",
                zIndex: 9999,
                media: {
                    maxWidthBp: 600,
                    overflow: "auto",
                }
            },
            { class: "formObj", widthPercent: 100, },
            {
                class: "container",
                display: "flex",
                alignItems: "centre",
                justifyContent: "centre",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column",
                    alignItems: "centre",
                }
            },
            {
                class: "modal",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                justifyContent: "centre",
                widthPercent: 100,
                maxWidth: 500,
                minWidth: 320,
                background: "white",
                position: "absolute",
                padding: 20,
                borderRadius: 14,
                marginTop: 110,
                marginBottom: 50,
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                    maxWidth: 350,
                    minWidth: 250,
                    margin: 0,
                    boxSizing: "border-box",
                }
            },
            {
                class: "input",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 20,
                padding: [20, 0, 40, 0],
                media: {
                    maxWidthBp: 600,
                    padding: [10, 0, 20, 0],
                    gap: 15,
                }
            },
            {
                class: "inputRow",
                display: "flex",
                flexDirection: "row",
                gap: 15,
                widthPercent: 100,
                justifyContent: "space-between",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column"
                }
            },
            {
                class: "btnRow",
                display: "flex",
                flexDirection: "row",
                gap: 15,
                widthPercent: 100,
                justifyContent: "space-between"
            },
            {
                class: "title",
                fontWeight: "bold"
            },
            {
                class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 5,
            },
            {
                class: "footer",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                gap: 10,
            },
        ];
    }

    async register() {
        const fd = new FormData();

        fd.append("name", this.getById("name").value);
        fd.append("surname", this.getById("surname").value);

        const p = this.getById("picture");
        const b = this.getById("bio");

        if (b.value) fd.append("bio", b.value);
        if (p.value) fd.append("file", p.value);

        const result = await this.submitForm("/", fd);

        if (result.ok) {
            this.publish("updated");
            this.style.display = "none"
        }
        else alert(result.error);
    }

    afterRender() {
        const name = this.query("#name");
        const surname = this.query("#surname");
        const bio = this.query("#bio");
        const pic = this.query("#picture");
        const back = this.query("#back");
        const submit = this.query("#submit");

        name.label = "Name";
        name.prompt = "Enter name"
        surname.label = "surname";
        surname.prompt = "Enter surname"
        bio.label = "Bio";
        bio.prompt = "Tell us more about you..."
        pic.label = "Profile picture";
        pic.prompt = "Upload photo";
        back.text = "Back";
        back.variant = 2;
        back.fill = true;
        submit.text = "Save";
        submit.fill = true;

        back.addEventListener("click", () => {
            const vals = [name, surname, bio]
            vals.forEach(v => v.query(".inputValue").value = "");
            this.publish("update-back")
        });
        submit.addEventListener("click", () => this.publish("popup-submit"));
    }

    static { Comp.register(this); }
}