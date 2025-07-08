import { Comp } from "jay-comp";

class RegisterPageComp extends Comp {

    constructor() {

        super();

        this.name_ = "Register page";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }
    

    createHTML() {

        return /* html */ `
        <div class="background">

            <div class="container">

                <div class="modal">

                    <form id="register" class="formObj">

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
        
        const background = this.design.create({
            class: "background",
            width: "100%",
            minHeight: "100vh",
            background: "black100",     
            overflow: "hidden"       
        });

        const form = this.design.create({
            class: "formObj",
            width: "100%"
        });
        
        const container = this.design.create({
            class: "container",
            display: "flex",
        });

        const backgroundImage = this.design.create({
            class: "backgroundImage",
            width: "100%",
            height: 1000,
            paddingLeft: 400,
        });

        const image = this.design.create({
            class: "image",
            width: "100%",
            height: "100%",
            objectFit: "cover"
        });

        const modal = this.design.create({
            class: "modal",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            width: "100%",
            maxWidth: 500,  
            minWidth: 320,
            background: "white",
            position: "absolute",
            zIndex: 800,
            padding: 20,
            borderRadius: 14,
            marginLeft: 100,
            marginTop: 150
        });

        const input = this.design.create({
            class: "input",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 20,
            paddingTop: 20,
            paddingBottom: 40,
        });

        const inputRow = this.design.create({
            class: "inputRow",
            display: "flex",
            flexDirection: "row",
            gap: 15,
            width: "100%",
            justifyContent: "space-between"
        });

        const btnRow = this.design.create({
            class: "btnRow",
            display: "flex",
            flexDirection: "row",
            gap: 15,
            width: "100%",
            justifyContent: "space-between"
        });

        const title = this.design.create({
            class: "title",
            fontWeight: "bold"
        });

        const link = this.design.create({
            class: "link",
            colour: "black80",
            fontWeight: "bold", 
            textDecoration: "underline",
            cursor: "pointer",
        });

        const linkHover = this.design.create({
            class: "link",
            pseudoClass: "hover",
            colour: "black100",
        });

        const textContainer = this.design.create({
            class: "textContainer",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 5,
        });

        const text = this.design.create({
            class: "text",
            colour: "black60",
            display: "flex",
            alignSelf: "start",
            
        });

        const footer = this.design.create({
            class: "footer",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            width: "100%",
            gap: 10,
        });

        const inputError = this.design.create({
            class: "input-error",
            colour: "red",
            fontSize: 12,
            marginTop: 4,
        });

        /**
         * Media query content
         */
        const containerMob = this.design.create({
            class: "container",
            flexDirection: "column",
            alignItems: "centre"
        });

        const backgroundMob = this.design.create({
            class: "background",
            height: 1000
        });

        const backgroundImageMob =  this.design.create({
            class: "backgroundImage",
            height: "40vh",
            margin: 0,
            padding: 0
        });

        const modalMob = this.design.create({
            class: "modal",
            width: "100%",
            maxWidth: 350,
            minWidth: 250,
            margin: 0,
            marginTop: 150,
            boxSizing: "border-box"
        });
        
        const inputMob = this.design.create({
            class: "input",
            paddingTop: 10,
            paddingBottom: 20,
            gap: 15,
        });

        const inputRowMob = this.design.create({
            class: "inputRow",
            flexDirection: "column",
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
        
        @media (max-width: 600px){
            ${containerMob}
            ${backgroundImageMob}
            ${backgroundMob}
            ${modalMob}
            ${inputMob}
            ${inputRowMob}
        }
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

            console.log(inputs[i].value);
            
            // LOOK AT THIS LATER
            if(inputs[i].required && inputs[i].isEmpty()){

                const inputField = inputs[i].shadowRoot.querySelector(".inputValue");
                inputField.classList.add("strength-very-weak");
                isValid = false;

            }
            
        }

        return (!this.checkPassword(inputs[3], inputs[4])) ? false : isValid;
    
    }

    /*
    REFACTOR THIS SHIT
    - in input add a new field for underline which can be adjusted etc
    */
    showError(inputComp, message){

        // REVIEW LATER
        const field = inputComp.shadowRoot.querySelector(".inputValue");
        const error = document.createElement("div");

        error.className   = "input-error" ;
        error.textContent = message;

        field.classList.add("strength-very-weak");

        const existing = field.parentElement.querySelector(".input-error");
        if(!existing) field.insertAdjacentElement("afterend", error);
        
    }
    clearError(inputComp){

        const field = inputComp.shadowRoot.querySelector(".inputValue");
        field.classList.remove("strength-very-weak");

        const existing = field.parentElement.querySelector(".input-error");
        if(existing) existing.remove();
        
    }

    // MOVE TO NEW PASSWORD INPUT LATER
    validateEntropy(password, confirmPass) {

        if (confirmPass.value == '' || password.value == '') return;
        else if (confirmPass.value === password.value) confirmPass.shadowRoot.querySelector(".inputValue").classList.add("strength-green");
        else confirmPass.shadowRoot.querySelector(".inputValue").classList.remove("strength-green");
    
    }

    submitForm(form) {
        // grab the form
        // manually submit
        // validate response
    }

    hook(){

        /**
         * Comp elements, and styling
         */
        const step1        = this.shadowRoot.getElementById("step1");
        const step2        = this.shadowRoot.getElementById("step2");
        const backButton   = this.shadowRoot.getElementById("backBtn");
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
        nextButton.text      = "Next";
        nextButton.variant   = 1;
        submitButton.text    = "Register";
        submitButton.variant = 1;
        
        /**
         * Form inputs
         * - email
         * - password
         * - name
         * - surname
         * - age
         * - occupation
         * - bio
         * - profile picture
         * 
         * Required fields are also set
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

        // Input validation
        nextButton.addEventListener("click", () => {

            let valid = this.validateElements([name, surname, email, password, confirmPass]);
            if (valid) {

                step1.setAttribute("hidden", "");
                step2.removeAttribute("hidden");
            
            } else console.log(valid);
        
        });

        
        confirmPass.addEventListener("input", () => {
            
            this.validateEntropy(password, confirmPass);

        });

        password.addEventListener("input", () => {
            
            this.validateEntropy(password, confirmPass);

        });

        /**
         * @brief clear all input field status with when user type in the box
         * clean ui
         */
        [name, surname, email, password, confirmPass].forEach(input => {

            input.addEventListener("input", () => {

                this.clearError(input);
            
            });

        });


        /**
         * @brief Event for going back to step1 
         */
        const backBtn2 = this.shadowRoot.getElementById("backBtn2");

        backBtn2.addEventListener("click", () => {
            
            step2.setAttribute("hidden", "");
            step1.removeAttribute("hidden");
        
        });

        const loginLink = this.shadowRoot.querySelector(".link");

        loginLink.addEventListener("click", (e) => {

            e.preventDefault;
            this.openWindow();

        });

    
    }

}

customElements.define("comp-register", RegisterPageComp);
