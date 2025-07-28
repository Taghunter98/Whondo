import { Comp } from "jay-comp";

export class Register extends Comp {
    createHTML() {
        return /* html */ `
        <comp-navbar></comp-navbar>
        <div class="background">
            <div class="container">
                <div class="modal">
                    <form class="formObj">

                        <!-- Personal information -->
                        <div id="step1">
                            <div class="textContainer">
                                <p class="text">Step 1/2</p>
                                <h4 class="title">Personal Details</h4> 
                            </div>
                            <div class="input">
                                <div class="inputRow">
                                    <comp-input id="name" name="name"></comp-input>
                                    <comp-input id="surname" name="surname"></comp-input>
                                </div>
                                <comp-input id="email" name="email"></comp-input>
                                <comp-password id="password" name="password"></comp-password>
                                <comp-password id="confirm" name="confirm"></comp-password>
                            </div>

                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn" type=button></comp-button>
                                    <comp-button class="next" id="nextBtn" type=button></comp-button>
                                </div>
                                <p>Have an account?<a href="/login" class="link"> Login</a></p>
                            </div>
                        </div>

                        <!-- User personalisation  -->
                        <div id="step2" hidden>
                            <div class="textContainer">
                                <p class="text">Step 2/2</p>
                                <h4 class="title">Personalise</h4> 
                            </div>
                             <div class="inputRow">
                                <comp-input id="age" name="age"></comp-input>
                                <comp-input id="occupation" name="occupation"></comp-input>
                            </div>
                            <div class="input">
                                <comp-textarea id="bio" name="bio"></comp-textarea>
                                <comp-file id="picture" name="picture"></comp-file>
                            </div>
                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn2" type="button"></comp-button>
                                    <comp-button class="submit" id="submit" type="submit"></comp-button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="backgroundImage">
                <img class="image" src="https://images.pexels.com/photos/4569340/pexels-photo-4569340.jpeg">
            </div>
        </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "background",
                widthPercent: 100,
                heightVh: 100,
                backgroundVar: "black100",
                overflow: "hidden",
                media: { maxWidthBp: 600, height: 1000 }
            },
            { class: "formObj", widthPercent: 100 },
            {
                class: "container",
                display: "flex",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column",
                    alignItems: "centre"
                }
            },
            {
                class: "backgroundImage",
                widthPercent: 100,
                heightVh: 100,
                paddingLeft: 400,
                media: {
                    maxWidthBp: 600,
                    heightVh: 40,
                    margin: 0,
                    padding: 0
                }
            },
            {
                class: "image",
                widthPercent: 100,
                heightPercent: 100,
                objectFit: "cover"
            },
            {
                class: "modal",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                maxWidth: 500,
                minWidth: 320,
                background: "white",
                position: "absolute",
                zIndex: 800,
                padding: 20,
                borderRadius: 14,
                marginLeft: 100,
                marginTop: 110,
                marginBotton: 50,
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                    maxWidth: 350,
                    minWidth: 250,
                    margin: 0,
                    marginTop: 150,
                    boxSizing: "border-box"
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
                class: "link",
                colourVar: "black80",
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
            },
            {
                class: "link",
                pseudoClass: "hover",
                colourVar: "black100",
            },
            {
                class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 5,
            },
            {
                class: "text",
                colourVar: "black60",
                display: "flex",
                alignSelf: "start",

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

        return (!this.checkPassword(inputs[3], inputs[4])) ? false : isValid;
    }

    validatePasswords(password, confirmPass) {
        if (confirmPass.value == '' || password.value == '') return;
        else if (confirmPass.value === password.value) confirmPass.query(".inputValue").classList.add("success");
        else confirmPass.query(".inputValue").classList.remove("success");
    }

    validateInputs(inputs, state) {
        if (state) for (let i in inputs) inputs[i].query(".inputValue").classList.add("error");
        else for (let i in inputs) inputs[i].query(".inputValue").classList.remove("error");
    }

    clearError(inputs) {
        const field = inputs.query(".inputValue");
        field.classList.remove("error");
    };

    async register() {
        const fd = new FormData();

        fd.append("name", this.getById("name").value);
        fd.append("surname", this.getById("surname").value);
        fd.append("email", this.getById("email").value);
        fd.append("password", this.getById("password").value);
        fd.append("age", this.getById("age").value);

        const p = this.getById("picture");
        const a = this.getById("age");
        const o = this.getById("occupation");
        const b = this.getById("bio");

        if (o.value) fd.append("occupation", o.value);
        if (b.value) fd.append("bio", b.value);
        if (p.value) fd.append("file", p.value);

        const result = await this.submitForm("/register", fd);

        if (result.ok) this.update("<comp-create></comp-create>")
        else alert(result.error);
    }

    afterRender() {
        const step1 = this.getById("step1");
        const step2 = this.getById("step2");
        const backButton = this.getById("backBtn");
        const backBtn2 = this.getById("backBtn2");
        const nextButton = this.getById("nextBtn");
        const submitButton = this.getById("submit");
        const email = this.getById("email");
        const password = this.getById("password");
        const confirmPass = this.getById("confirm");
        const name = this.getById("name");
        const surname = this.getById("surname");
        const age = this.getById("age");
        const occupation = this.getById("occupation");
        const bio = this.getById("bio");
        const picture = this.getById("picture");

        backButton.text = "Back";
        backButton.variant = 2;
        backButton.fill = true;
        backBtn2.text = "Back";
        backBtn2.variant = 2;
        backBtn2.fill = true;
        nextButton.text = "Next";
        nextButton.variant = 1;
        nextButton.fill = true;
        submitButton.text = "Register";
        submitButton.variant = 1;
        submitButton.fill = true;

        /**
         * Form inputs and required fields
         */
        email.label = "Email";
        email.prompt = "Enter email";
        email.type = "email";
        password.label = "Password";
        password.prompt = "Password";
        password.enableEntropy = true;
        confirmPass.label = "Confirm Password";
        confirmPass.prompt = "Confirm password";
        name.label = "Name";
        name.prompt = "Enter name";
        surname.label = "Surname";
        surname.prompt = "Enter surname";
        age.label = "Age";
        age.prompt = "Enter your age";
        age.type = "number";
        occupation.label = "Occupation";
        occupation.prompt = "Eg. student";
        occupation.type = "text";
        bio.label = "Bio";
        bio.prompt = "Tell us more about you...";
        bio.type = "textarea";

        if (picture) {
            picture.label = "Profile picture";
            picture.prompt = "Upload photo";
            picture.type = "file";

        }

        name.required = true;
        surname.required = true;
        email.required = true;
        password.required = true;
        confirmPass.required = true;
        age.required = true;

        nextButton.addEventListener("click", () => {
            const inputs = [name, surname, email, password, confirmPass];
            let valid = this.validateElements(inputs);

            if (valid) {
                step1.setAttribute("hidden", "");
                step2.removeAttribute("hidden");
            } else this.validateInputs(inputs, true);
        });

        confirmPass.addEventListener("input", () => this.validatePasswords(password, confirmPass));
        password.addEventListener("input", () => this.validatePasswords(password, confirmPass));

        [name, surname, email, confirmPass].forEach(input => {
            input.addEventListener("input", () => this.clearError(input));
        });

        backBtn2.addEventListener("click", () => {
            step2.setAttribute("hidden", "");
            step1.removeAttribute("hidden");
        });

        submitButton.addEventListener("click", (e) => {
            if (!age.value) {
                age.query(".inputValue").classList.add("error");
                return;
            }
            e.preventDefault();
            this.register();
        });
    }

    static { Comp.register(this); }
}