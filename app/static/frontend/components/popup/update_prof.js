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
                                <h4 class="title">Your Profile</h4> 
                                <comp-profile-setting></comp-profile-setting>
                            </div>
                            <div id="update-blog" >
                                <div class="inputRow">
                                    <comp-input id="name" name="name"></comp-input>
                                    <comp-input id="surname" name="surname"></comp-input>
                                </div>
                                <div class="inputRow">
                                    <comp-input id="age" name="age"></comp-input>
                                    <comp-input id="occupation" name="occupation"></comp-input>
                                </div>
                                <div class="input">
                                    <comp-textarea id="bio" name="bio"></comp-textarea>
                                </div>
                            </div>
                            <div class="file"  hidden>
                                <div class="input">
                                    <comp-file id="picture" name="picture"></comp-file>
                                </div>
                            </div>
                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button id="back" type="button"></comp-button>
                                    <comp-button id="submit" type="submit"></comp-button>
                                </div>
                            </div>
                            <p id="result" style="text-align: center; padding-top: 10px"></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;
    }

    // Fix shitty CSS pls :) on mob make into a cool sliding modal thing
    createCSS() {
        return [
            {
                class: "background",
                display: "flex",
                justifyContent: "centre",
                widthPercent: 100,
                heightVh: 100,
                overflowY: "auto",
                position: "fixed",
                background: "rgba(0, 0, 0, 0.6)",
                zIndex: 9999,
                media: {
                    maxWidthBp: 600,
                    position: "absolute"
                }
            },
            { class: "formObj", widthPercent: 100, height: "auto"},
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
                widthPercent: 100,
                maxWidth: 500,
                minWidth: 320,
                overflowY: "auto",
                background: "white",
                margin: "auto",
                position: "relative",
                padding: 20,
                borderRadius: 14,
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                    position: "relative",
                    boxSizing: "border-box",
                    height: "auto",
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
                paddingTop: 20,
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

    validate() {
        const inputs = [this.query("#name"), this.query("#surname"), this.query("#age")];
        let isValid = true;

        for (let input of inputs) {
            if (input.required && input.isEmpty()) {
                input.query(".inputValue").classList.add("error");
                isValid = false;
            }
        }
        return isValid;
    }

    clearError(inputs) {
        const field = inputs.query(".inputValue");
        field.classList.remove("error");
    };

    async fetchUserData(){
        const res = await this.request("https://whondo.com/verify/me","GET");
        if (!res.ok) {
            console.log(res.error);
            return;
        }
    
        const data = res.json();
        console.log("Fetched user data:", data);

        this.getById("name").value = data.name || ""
        this.getById("surname").value = data.surname || "";
        this.getById("bio").value = data.bio || "";
        this.getById("age").value = data.age || "";
        this.getById("occupation").value = data.occupation || "";

        if(data.profilePicture){
            const pic = this.getById("picture");
            const url = `https://whondo.com/uploads?path=${data.profilePicture}`;
            pic.setPreview(url);
            
        }

    }

    async update() {
        const fd = new FormData();

        fd.append("name", this.getById("name").value);
        fd.append("surname", this.getById("surname").value);
        fd.append("age", this.getById("age").value);
        fd.append("occupation", this.getById("occupation").value);

        const p = this.getById("picture");
        const b = this.getById("bio");

        if (b.value) fd.append("bio", b.value);
        if (p.value) fd.append("file", p.value);

        const res = await this.submitForm("https://whondo.com/account/update", fd);

        if (res.ok) {
            this.publish("updated");
            this.style.display = "none"
        }

        else this.query("#result").innerHTML = res.error
    }

    afterRender() {
        const name = this.query("#name");
        const surname = this.query("#surname");
        const age = this.query("#age");
        const occupation = this.query("#occupation");
        const bio = this.query("#bio");
        const pic = this.query("#picture");
        const back = this.query("#back");
        const submit = this.query("#submit");

        name.label = "Name";
        name.prompt = "Enter name"
        surname.label = "Surname";
        surname.prompt = "Enter surname";
        bio.label = "Bio";
        bio.prompt = "Tell us more about you..."
        pic.label = "Profile picture";
        pic.prompt = "Upload photo";
        age.label = "Age";
        age.prompt = "Enter age";
        age.type = "number";
        occupation.label = "Occupation";
        occupation.prompt = "Enter your occupation"
        back.text = "Cancel";
        back.variant = 2;
        back.fill = true;
        submit.text = "Save";
        submit.fill = true;

        name.required = true;
        surname.required = true;
        age.required = true;

        back.addEventListener("click", () => {
            this.publish("update-back");
            const input = [name, surname, age]
            input.forEach(i => this.clearError(i));
        });

        submit.addEventListener("click", () => {
            const valid = this.validate();
            if(!valid) return;
            else this.update(submit);
        });
        
        this.subscribe("edit", () => {
            this.query("#update-blog").setAttribute("hidden", "");
            this.query(".file").removeAttribute("hidden");
        });

        this.subscribe("edit-profile", () => {
             this.query("#update-blog").removeAttribute("hidden");
            this.query(".file").setAttribute("hidden", "");
        })

        const input = [name, surname, age]
        input.forEach(inputs => inputs.addEventListener("input", () => this.clearError(inputs)));


        this.fetchUserData();
    }

    static { Comp.register(this); }
}