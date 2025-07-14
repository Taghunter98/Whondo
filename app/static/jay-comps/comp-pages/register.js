import { Comp } from "jay-comp";

export class Register extends Comp {

    name_ = "Register page";

    createHTML() {

        return /* html */ `
        <div class="background">

            <div class="container">

                <div class="modal">

                    <form class="formObj" action="https://whondo.com/register", method="POST">

                        <!-- Personal information -->
                        <div id="step1">
                            <div class="textContainer">
                                <p class="text">Step 1/2</p>
                                <h4 class="title">Personal Details</h4> 
                            </div>

                            <p class="text">Let's find out a bit more about you!</p>

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

                            <p class="text">Let's find out a bit more about you!</p>

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
                                <p>Have an account?<a href="/login" class="link"> Login</a></p>
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

    createCSS(){
        
        const background = this.css({
            class: "background",
            width: "100%",
            minHeight: "100vh",
            background: "black100",     
            overflow: "hidden",
            media: {
                breakpoint: 600,
                height: 1000
            }      
        });

        const form = this.css({
            class: "formObj",
            widthPercent: 100,
        });
        
        const container = this.css({
            class: "container",
            display: "flex",
            media: {
                breakpoint: 600,
                flexDirection: "column",
                alignItems: "centre"
            }
        });

        const backgroundImage = this.css({
            class: "backgroundImage",
            widthPercent: 100,
            height: 1000,
            paddingLeft: 400,
            media: {
                breakpoint: 600,
                height: "40vh",
                margin: 0,
                padding: 0
            }
        });

        const image = this.css({
            class: "image",
            widthPercent: 100,
            heightPercent: 100,
            objectFit: "cover"
        });

        const modal = this.css({
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
            marginTop: 150,
            media: {
                breakpoint: 600,
                widthPercent: 100,
                maxWidth: 350,
                minWidth: 250,
                margin: 0,
                marginTop: 150,
                boxSizing: "border-box"
            }
        });

        const input = this.css({
            class: "input",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            gap: 20,
            padding: [20, 0, 40, 0],
            media: {
                breakpoint: 600,
                padding: [10, 0, 20, 0],
                gap: 15,
            } 
        });

        const inputRow = this.css({
            class: "inputRow",
            display: "flex",
            flexDirection: "row",
            gap: 15,
            widthPercent: 100,
            justifyContent: "space-between",
            media: {
                breakpoint: 600,
                flexDirection: "column"
            }
        });

        const btnRow = this.css({
            class: "btnRow",
            display: "flex",
            flexDirection: "row",
            gap: 15,
            widthPercent: 100,
            justifyContent: "space-between"
        });

        const title = this.css({
            class: "title",
            fontWeight: "bold"
        });

        const link = this.css({
            class: "link",
            colour: "black80",
            fontWeight: "bold", 
            textDecoration: "underline",
            cursor: "pointer",
        });

        const linkHover = this.css({
            class: "link",
            pseudoClass: "hover",
            colour: "black100",
        });

        const textContainer = this.css({
            class: "textContainer",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            gap: 5,
        });

        const text = this.css({
            class: "text",
            colour: "black60",
            display: "flex",
            alignSelf: "start",
            
        });

        const footer = this.css({
            class: "footer",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            widthPercent: 100,
            gap: 10,
        });

        const inputError = this.css({
            class: "input-error",
            colour: "red",
            fontSize: 12,
            marginTop: 4,
        });

        return /* css */ `
        ${background}
        ${container}
        ${form}
        ${backgroundImage}
        ${image}
        ${modal}
        ${input}
        ${inputRow}
        ${btnRow}
        ${link}
        ${linkHover}
        ${inputError}
        ${textContainer}
        ${title}
        ${text}
        ${footer}
        
        `;

    }

    /**
     * Helper method validates password inputs.
     * @param {string} input1 
     * @param {string} input2 
     * @returns Valid status
     */
    checkPassword(input1, input2) {

        return (input1.value.trim() == input2.value.trim()) ? true : false;
    
    }

    /**
     * Helper method validates a list of all inputs and returns valid status.
     * @param {Array<HTMLElement>} inputs 
     * @returns Valid status
     */
    validateElements(inputs) {

        let isValid = true;
        for(let i in inputs){

            if(inputs[i].required && inputs[i].isEmpty()){

                const inputField = inputs[i].shadowRoot.querySelector(".inputValue");
                inputField.classList.add("error");
                isValid = false;

            }
            
        }

        return (!this.checkPassword(inputs[3], inputs[4])) ? false : isValid;
    
    }

    /**
     * Method validates if passwords match.
     * @param {*} password 
     * @param {*} confirmPass 
     * @returns Valid status
     */
    validatePasswords(password, confirmPass) {

        if (confirmPass.value == '' || password.value == '') return;
        else if (confirmPass.value === password.value) confirmPass.shadowRoot.querySelector(".inputValue").classList.add("success");
        else confirmPass.shadowRoot.querySelector(".inputValue").classList.remove("success");
    
    }

    validateInputs(inputs, state) {

        if (state) {

            for (let i in inputs) inputs[i].shadowRoot.querySelector(".inputValue").classList.add("error");
        
        } else {

            for (let i in inputs) inputs[i].shadowRoot.querySelector(".inputValue").classList.remove("error");
        
        }
    
    }

    clearError(inputs){

        const field = inputs.shadowRoot.querySelector(".inputValue");
        field.classList.remove("error");

    };

    async register(res){

        const fd = new FormData();

        const name = this.shadowRoot.getElementById("name");
        const email = this.shadowRoot.getElementById("email");
        const password = this.shadowRoot.getElementById("password");
        const age = this.shadowRoot.getElementById("age");
        const occupation  =this.shadowRoot.getElementById("occupation");
        const bio = this.shadowRoot.getElementById("bio");
        const picture = this.shadowRoot.getElementById("picture");

        const getValue = (el) => el?.shadowRoot.querySelector(".inputValue")?.value || "";

        fd.append("name", getValue(name));
        fd.append("email", getValue(email));
        fd.append("password", getValue(password));
        fd.append("age", getValue(age));
        fd.append("occupation", getValue(occupation));
        fd.append("bio", getValue(bio));
        
        const fileInput = picture?.shadowRoot.querySelector(".fileInput");
        if (fileInput?.files?.[0]) {
            fd.append("file", fileInput.files[0], fileInput.files[0].name);
        }

        const result = await this.submitForm("https://whondo.com/register", fd);
        res.innerHTML = "Account created. response: " + result.status;
    }

    hook(){

        const form         = this.shadowRoot.querySelector("form");
        const step1        = this.shadowRoot.getElementById("step1");
        const step2        = this.shadowRoot.getElementById("step2");
        const backButton   = this.shadowRoot.getElementById("backBtn");
        const backBtn2     = this.shadowRoot.getElementById("backBtn2");
        const nextButton   = this.shadowRoot.getElementById("nextBtn");
        const submitButton = this.shadowRoot.getElementById("submit");
        const email        = this.shadowRoot.getElementById("email");
        const password     = this.shadowRoot.getElementById("password");
        const confirmPass  = this.shadowRoot.getElementById("confirm");
        const name         = this.shadowRoot.getElementById("name");
        const surname      = this.shadowRoot.getElementById("surname");
        const age          = this.shadowRoot.getElementById("age");
        const occupation   = this.shadowRoot.getElementById("occupation");
        const bio          = this.shadowRoot.getElementById("bio");
        const picture      = this.shadowRoot.getElementById("picture");
        
        backButton.text      = "Back";
        backButton.variant   = 2;
        backBtn2.text        = "Back";
        backBtn2.variant     = 2;
        nextButton.text      = "Next";
        nextButton.variant   = 1;
        submitButton.text    = "Register";
        submitButton.variant = 1;
        
        /**
         * Form inputs and required fields
         */
        email.label            = "Email";
        email.prompt           = "Enter email";
        email.type             = "email";
        password.label         = "Password";
        password.prompt        = "Password";
        password.enableEntropy = true;
        confirmPass.label      = "Confirm Password";
        confirmPass.prompt     = "Confirm password";
        name.label             = "Name";
        name.prompt            = "Enter name";
        surname.label          = "Surname";
        surname.prompt         = "Enter surname";
        age.label              = "Age";
        age.prompt             = "Enter your age";
        age.type               = "number";
        occupation.label       = "Occupation";
        occupation.prompt      = "Eg. student";
        occupation.type        = "text";
        bio.label              = "Bio";
        bio.prompt             = "Tell us more about you...";
        bio.type               = "textarea";
        picture.label          = "Profile picture";
        picture.prompt         = "Upload photo";
        picture.type           = "file";

        name.required        = true;
        surname.required     = true;
        email.required       = true;
        password.required    = true;
        confirmPass.required = true;

        /**
         * Event listener checks for all inputs to be valid, if so then the step 2 modal is revealed.
         */
        nextButton.addEventListener("click", () => {

            const inputs = [name, surname, email, password, confirmPass];

            let valid = this.validateElements(inputs);

            if (valid) {

                step1.setAttribute("hidden", "");
                step2.removeAttribute("hidden");
            
            } else this.validateInputs(inputs, true);
        
        });

        /**
         * Event listener reviews password entropy
         */
        confirmPass.addEventListener("input", () => {
            
            this.validatePasswords(password, confirmPass);

        });

        /**
         * Event listener removes password entropy check
         */
        password.addEventListener("input", () => {
            
            this.validatePasswords(password, confirmPass);

        });

        /**
         * @brief clear all input field status with when user type in the box
         * clean ui
         */
        [name, surname, email, confirmPass].forEach(input => {

            input.addEventListener("input", () => {

                this.clearError(input);

            });

        });

        /**
         * Returns user to step 1
         */
        backBtn2.addEventListener("click", () => {
            
            step2.setAttribute("hidden", "");
            step1.removeAttribute("hidden");
        
        });

        submitButton.addEventListener("click", () => form.submit());
    
    }

    static {

        Comp.register(this);

    }

}


