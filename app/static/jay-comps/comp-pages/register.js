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


                <form id="register" class="reg" action="/register" enctype="multipart/form-data" method="post">

                    <div class="modal" id="step1">
                        
                        <!-- step 1-->

                        <div class="textContainer">
                            <p class="text">Step 1/2</p>
                            <h3 class="title">Personal Details</h3>
                            <p class="text">Lets' find out a bit more about you!</p>
                        </div>

                        <div class="row">
                            <comp-input id="name" name="name"></comp-input>
                            <comp-input id="surname" name="surname"></comp-input>
                        </div>

                        <div class="input">
                            <comp-input id="email" name="email"></comp-input>
                            <comp-input id="password" name="password"></comp-input>
                            <comp-input id="confirm" name="confirm-password"></comp-input>
                        </div>
                        <div class="footer">
                            <div class="row">
                                <comp-button id="backBtn"></comp-button>
                                <comp-button id="nextBtn"></comp-button>
                            </div>
                                <p>Have an account?<a href="#" class="link"> Login</a></p>
                    </div>
                </form>
            </div>
            <div class="backgroundImage">
                <img class="image" src="https://images.pexels.com/photos/4569340/pexels-photo-4569340.jpeg">
            </div>
        </div>
        `;
    
    }

    createCSS(){
        
        const fadeDown = this.effect.prop("slideDown", .5);
        const fadeLeft = this.effect.prop("fadeLeft", .5);
        
        const background = this.design.create({
            class: "background",
            width: "100%",
            height: "100vh",
            background: "black100",
        });
        
        
        const container = this.design.create({
            class: "container",
            display: "flex",
        });

        const backgroundImage = this.design.create({
            class: "backgroundImage",
            width: "100%",
            height: "100vh",
            paddingLeft: 400

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
            alignItems: "center",
            width: 500,
            background: "white",
            position: "absolute",
            zIndex: 800,
            padding: 20,
            borderRadius: 14,
            marginLeft: 100,
            marginTop: 100,
        });

        const input = this.design.create({
            class: "input",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 10,
            paddingTop: 20,
            paddingBottom: 40,
        });

        const row = this.design.create({
            class: "row",
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
            colour: "black60"
        });

        const footer = this.design.create({
            class: "footer",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            width: "100%",
            gap: 10,
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
            margin: 0,
            marginTop: 200
        });
        


        return /* css */ `
       ${background}

        ${container}

        ${backgroundImage}
        ${image}

        ${modal}
        ${input}
        ${row}
        ${link}
        ${linkHover}

        ${textContainer}
        ${title}
        ${text}

        ${footer}
        

        @media (max-width: 600px){
            ${containerMob}
            ${backgroundImageMob}
            ${modalMob}
        }
        `;

    }

    openWindow(){

        window.location.assign("/login");
    
    }

    hook(){

        const backButton = this.shadowRoot.getElementById("backBtn");
        const nextButton = this.shadowRoot.getElementById("nextBtn");
        const email      = this.shadowRoot.getElementById("email");
        const password   = this.shadowRoot.getElementById("password");
        const name       = this.shadowRoot.getElementById("name");
        const surname    = this.shadowRoot.getElementById("surname");
        const result     = this.shadowRoot.getElementById('result');

        
        
        backButton.buttonText    = "Back";
        nextButton.buttonText    = "Next";
        backButton.buttonVarient = 2;
        email.inputLabel         = "Email";
        email.inputPrompt        = "Enter email";
        email.inputType          = "email";
        password.inputLabel      = "Password";
        password.inputPrompt     = "password";
        password.inputType       = "password";
        password.enableEntropy   = true;
        name.inputLabel          = "Name";
        name.inputPrompt         = "Enter your name";
        surname.inputLabel       = "Surname";
        surname.inputPrompt      = "Enter you surname";
        name.required            = true;
        surname.required         = true;
        email.required           = true;
        password.required        = true;

        /**
         * 
         */
        compButton.addEventListener("click", () => {

            const inputs = [name, surname, email, password, age, occupation];
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

            if (!valid){

                result.innerText = "Please fill in all required fields.";
                return;
            
            }

            result.innerText = "welcome";
        
        });

        const loginLink = this.shadowRoot.querySelector(".link");

        loginLink.addEventListener("click", () => this.openWindow());

    
    }

}

customElements.define("register-comp", RegisterPageComp);
