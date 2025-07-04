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

                    <form id="register" action="/register" enctype="multipart/form-data" method="post">

                        <!-- step 1-->
                        <div id="step1" class="step">
                            <div class="textContainer">
                                <p class="text">Step 1/2</p>
                                <h3 class="title">Personal Details</h3> 
                            </div>

                            <p class="text">Lets' find out a bit more about you!</p>

                            <div class="inputRow">
                                <comp-input id="name" name="name"></comp-input>
                                <comp-input id="surname" name="surname"></comp-input>
                            </div>

                            <div class="input">
                                <comp-input id="email" name="email"></comp-input>
                                <comp-input id="password" name="password"></comp-input>
                                <comp-input id="confirm" name="confirm"></comp-input>
                            </div>

                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn" type=button></comp-button>
                                    <comp-button class="next" id="nextBtn" type=button></comp-button>
                                </div>
                                <p>Have an account?<a href="#" class="link"> Login</a></p>
                            </div>
                        </div>

                        <div id="step2" class="step2" hidden>

                            <div class="textContainer">
                                <p class="text">Step 2/2</p>
                                <h3 class="title">Personalise</h3> 
                            </div>

                            <p class="text">Lets' find out a bit more about you!</p>

                             <div class="inputRow">
                                <comp-input id="age" name="age"></comp-input>
                                <comp-input id="occupation" name="occupation"></comp-input>
                            </div>

                            <div class="input">
                                <comp-input id="bio" name="bio"></comp-input>
                                <comp-input id="picture" name="picture"></comp-input>
                            </div>

                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn2" type="button"></comp-button>
                                    <comp-button class="submit" id="submit" type="submit"></comp-button>
                                </div>
                                <p>Have an account?<a href="#" class="link"> Login</a></p>
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
            minHeight: "100vh",
            overflow: "hidden"       
        });
        
        
        const container = this.design.create({
            class: "container",
            display: "flex",
        });

        const backgroundImage = this.design.create({
            class: "backgroundImage",
            width: "100%",
            height: "100vh",
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
            background: "white",
            position: "absolute",
            zIndex: 800,
            padding: 20,
            borderRadius: 14,
            marginLeft: 100,
            marginTop: 100,
            boxSizing: "border-box"
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
            marginBottom: 10
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

        //media query

        const containerMob = this.design.create({
            class: "container",
            flexDirection: "column",
            alignItems: "centre"
        });

        const backgroundImageMob =  this.design.create({
            class: "backgroundImage",
            height: "40vh",
            margin: 0,
            padding: 0
        });

        const modalMob = this.design.create({
            class: "modal",
            width: "auto",
            maxWidth: 350,
            minWidth: 250,
            margin: 0,
            marginTop: 60,
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
            ${modalMob}
            ${inputMob}
            ${inputRowMob}
        }
        `;

    }

    openWindow(){

        window.location.assign("/login");
    
    }


    hook(){

        //form section
        const form = this.shadowRoot.getElementById("register");
        
        //modal section
        const step1 = this.shadowRoot.getElementById("step1");
        const step2 = this.shadowRoot.getElementById("step2");

        //button section
        const backButton   = this.shadowRoot.querySelectorAll(".back");
        const nextButton   = this.shadowRoot.getElementById("nextBtn");
        const submitButton = this.shadowRoot.getElementById("submit");

        //input section
        const email       = this.shadowRoot.getElementById("email");
        const password    = this.shadowRoot.getElementById("password");
        const confirmPass = this.shadowRoot.getElementById("confirm");
        const name        = this.shadowRoot.getElementById("name");
        const surname     = this.shadowRoot.getElementById("surname");
        const age         = this.shadowRoot.getElementById("age");
        const occupation  = this.shadowRoot.getElementById("occupation");
        const bio         = this.shadowRoot.getElementById("bio");
        const picture     = this.shadowRoot.getElementById("picture");

        
        //button section
        backButton.forEach(btn => {

            btn.text    = "Back";
            btn.variant = 2;
        
        });
        nextButton.text      = "Next";
        nextButton.variant   = 1;
        submitButton.text    = "Register";
        submitButton.variant = 1;
        
        //input section
        email.label            = "Email";
        email.prompt           = "Enter email";
        email.type             = "email";
        password.label         = "Password";
        password.prompt        = "password";
        password.type          = "password";
        password.enableEntropy = true;
        confirmPass.label      = "Confirm Password";
        confirmPass.type       = "password";
        confirmPass.prompt     = "confirm password";
        name.label             = "Name";
        name.prompt            = "Enter your name";
        surname.label          = "Surname";
        surname.prompt         = "Enter you surname";
        age.label              = "Age";
        age.prompt             = "Enter your age";
        age.type               = "number";
        occupation.label       = "occupation";
        occupation.prompt      = "Eg. student";
        occupation.type        = "text";
        bio.label              = "Bio";
        bio.prompt             = "Tell us more about you...";
        bio.type               = "textarea";
        picture.label          = "Profile picture";
        picture.prompt         = "Upload photo";
        picture.type           = "file";

        //required field
        name.required        = true;
        surname.required     = true;
        email.required       = true;
        password.required    = true;
        confirmPass.required = true;

        /**
         * @brief Show error message under input
         */
        function showError(inputComp, message){

            const field = inputComp.shadowRoot.querySelector(".inputValue");
            const error = document.createElement("div");

            error.className   = "input-error" ;
            error.textContent = message;

            field.classList.add("strength-very-weak");

            const existing = field.parentElement.querySelector(".input-error");
            if(!existing){
                
                field.insertAdjacentElement("afterend", error);
                

            }
        
        }

        /**
         * 
         * @brief clear error message if there exist before
         */
        function clearError(inputComp){

            const field = inputComp.shadowRoot.querySelector(".inputValue");
            field.classList.remove("strength-very-weak");

            const existing = field.parentElement.querySelector(".input-error");
            if(existing){

                existing.remove();
            
            }
        
        }

        /**
         * @brief Event that validate form check if the form is empty or not
         * and check if password match or not and switch between step1 and step2 modal
         */
        nextButton.addEventListener("click", () => {

            const inputs = [name, surname, email, password, confirmPass];
            let valid    = true;
            
            for(const input of inputs){
                
                const inputField = input.shadowRoot.querySelector(".inputValue");
                
                //reset colour
                inputField.classList.remove("strength-very-weak");
                
                if(input.required && input.isEmpty()){

                    inputField.classList.add("strength-very-weak");
                    
                    valid = false;

                }
            
            }

            const passwordVal = password.value.trim();
            const confirmVal  = confirmPass.value.trim();

            if(confirmVal != passwordVal){

                showError(confirmPass, "Password do not match");
                valid = false;
            
            }

            
            if(!valid) return;
            


            step1.setAttribute("hidden", "");
            step2.removeAttribute("hidden");
            
        
        });

        /**
         * @brief check password match if it match green status will appear
         */
        confirmPass.addEventListener("input", () => {

            const confirmInput = confirmPass.shadowRoot.querySelector(".inputValue");
            const passwordVal  = password.value.trim();
            const confirmVal   = confirmPass.value.trim();

            confirmInput.classList.remove("strength-very-weak", "strength-red", "strength-yellow", "strength-green");

            if (confirmVal === passwordVal) {

                confirmInput.classList.add("strength-green");
            
            } 

        });

        /**
         * @brief clear all input field status with when user type in the box
         */
        [name, surname, email, password, confirmPass].forEach(input => {

            input.addEventListener("input", () => {

                clearError(input);
            
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

    
    }

}

customElements.define("register-comp", RegisterPageComp);
