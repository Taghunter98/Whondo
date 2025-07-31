import { Comp } from "jay-comp";

export class ChangePass extends Comp {

    title_;
    
    set title(v){
        this.title_ = v;
        this.update();
    }

    get title() { return this.title_; }

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
                                <h4 class="title">${this.title_}</h4> 
                            </div>
                            <div class="input">
                                <comp-password id="current" name="current"></comp-password>
                                <comp-password id="new" name="new"></comp-password>
                                <comp-password id="confirm" name="confirm"></comp-password>
                            </div>
                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button class="back" id="back" type="button"></comp-button>
                                    <comp-button class="submit" id="submit" type="submit"></comp-button>
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
            { class: "background",
                display: "flex",
                justifyContent: "centre",
                widthPercent: 100,
                heightVh: 100,
                overflow: "hidden",
                position: "fixed",
                background: "rgba(0, 0, 0, 0.6)",
                zIndex: 9999,
                media: { maxWidthBp: 600, height: 1000 }
            },
            { class: "formObj", widthPercent: 100,},
            { class: "container",
                display: "flex",
                alignItems: "centre",
                justifyContent: "centre",
                media: { maxWidthBp: 600, flexDirection: "column", alignItems: "centre",}
            },
            { class: "modal",
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
                    boxSizing: "border-box"
                }
            },
            { class: "input",
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
            { class: "inputRow",
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
            { class: "btnRow",
                display: "flex",
                flexDirection: "row",
                gap: 15,
                widthPercent: 100,
                justifyContent: "space-between"
            },
            { class: "title",
                fontWeight: "bold"
            },
            { class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 5,
            },
            { class: "footer",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                gap: 10,
            },
        ];
    }

     async passwordChange() {
        const fd = new FormData();

        fd.append("name", this.getById("name").value);
        fd.append("surname", this.getById("surname").value);

        const p = this.getById("picture");
        const b = this.getById("bio");

        if (o.value) fd.append("occupation", o.value);
        if (b.value) fd.append("bio", b.value);
        if (p.value) fd.append("file", p.value);

        const result = await this.submitForm("/register", fd);

        if (result.ok) this.update("<comp-create></comp-create>")
        else alert(result.error);
    }

    checkPassword(input1, input2) {
        return (input1.value.trim() == input2.value.trim()) ? true : false;
    }

    validateElements(inputs) {
        let isValid = true;

        for (let i in inputs) {
            if (inputs[i].required && inputs[i].isEmpty()) {
                const inputField = inputs[i].query(".inputValue");
                inputField.classList.add("error");
                isValid = false;
            }
        }

        return (!this.checkPassword(inputs[1], inputs[2])) ? false : isValid;
    }

    validatePasswords(password, confirmPass) {
        if (confirmPass.value == '' || password.value == '') return;
        else if (confirmPass.value === password.value) confirmPass.query(".inputValue").classList.add("success");
        else confirmPass.query(".inputValue").classList.remove("success");
    }

     clearError(inputs) {
        const field = inputs.query(".inputValue");
        field.classList.remove("error");
    };

    afterRender(){
        const current = this.getById("current");
        const newPass = this.getById("new");
        const confirm = this.getById("confirm");
        const submit = this.query("#submit");

        newPass.addEventListener("input", () => this.validatePasswords(newPass, confirm))
        confirm.addEventListener("input", () => this.validatePasswords(newPass, confirm))

        const inputs = [current,confirm];
        inputs.forEach(input => {
            input.addEventListener("input", () => this.clearError(input));
        });

        submit.addEventListener("click", (e) => {
            e.preventDefault;
            const inputs = [current, newPass, confirm];
            const valid = this.validateElements(inputs);

        if (!valid) return;
        if (!this.checkPassword(newPass,confirm)){
            confirm.query(".inputValue").classList.add("error");
            return;
        }

            this.submitPasswordChange();

        });

        this.query("comp-button.back").addEventListener("click", () =>{
            this.dispatchEvent(new CustomEvent("popup-back",{
                    bubbles: true,
                    composed: true
            }));
        });

    }

    static { Comp.register(this); }
}