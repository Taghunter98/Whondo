import { Comp } from "jay-comp";

class RegisterPageComp extends Comp {

    constructor() {

        super();

        this.title_ = "Register";

        this.name_ = "Register page";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    createHTML() {

        return /* html */ `
        <div class="background">
            <div class="container">
                <h3>${this.title_}</h3>
                <form id="register" class="reg" action="/register" enctype="multipart/form-data" method="post">
                    <div class="row">
                        <comp-input id="email" name="email"></comp-input>
                        <comp-input id="password" name="password"></comp-input>
                    </div>
                    <div class="row">
                        <comp-input id="name" name="name"></comp-input>
                        <comp-input id="surname" name="surname"></comp-input>
                    </div>
                    <div class="row">
                        <comp-input id="age" name="age"></comp-input>
                        <comp-input id="occupation" name="occupation"></comp-input>
                    </div>
                    <div class="row">
                        <comp-input id="bio" name="bio"></comp-input>
                        <comp-input id="file" class="file" name="file"></comp-input>
                    </div>
                    <div class="wrapper">
                        <comp-button id="submit" class="submit-btn"></comp-button>
                    </div> 
                </form>
            </div>
            <div class="container2">
                <a href=#>
                    <p>Have an account?</p>
                </a>
            </div>
            <p id="result"></p>
        </div>
        `;
    
    }

    createCSS(){
        
        const fadeDown = this.effect.prop("slideDown", .5);
        const fadeLeft = this.effect.prop("fadeLeft", .5);
        
        const background = this.design.create({
            class: "background",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            padding: "50px 0px",
            alignItems: "centre",
            border: false,
            gap: 0,
            background: "black10",

        });
        
        const backgroundMobile = this.design.create({
            class: "background",
            padding: 20,
            width: "auto"
        });

        const container = this.design.create({
            class: "container",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            maxWidth: 500,
            padding: 20,
            alignItems: "center",
            border: true,
            borderRadius: 16,
            gap: 15,
            background: "white",
            animation: fadeDown
            
        });

        const container2 = this.design.create({
            class: "container2",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            maxWidth: 500,
            padding: 20,
            alignItems: "centre",
            border: true,
            borderRadius: 16,
            gap: 15,
            background: "none",
            animation: fadeLeft

        });

        const wrapper = this.design.create({
            class: "wrapper",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            alignItems: "centre",
            padding: 20,
            justifyContent: "centre",
        });

        const row = this.design.create({
            class: "row",
            display: "flex",
            flexDirection: "row",
            gap: 15,
            width: "100%",
            justifyContent: "space-between"
        });

        const regis = this.design.create({
            class: "reg",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            alignItems: "centre",
            gap: 15
        });

    
        return /* css */ `
        ${background}
        ${container}
        ${wrapper}
        ${regis}
        ${row}
        ${container2}
        
    
        @media (max-width: 600px){
            ${backgroundMobile}
        }
        `;

    }

    hook(){

        const compButton = this.shadowRoot.getElementById("submit");
        const email      = this.shadowRoot.getElementById("email");
        const password   = this.shadowRoot.getElementById("password");
        const name       = this.shadowRoot.getElementById("name");
        const surname    = this.shadowRoot.getElementById("surname");
        const age        = this.shadowRoot.getElementById("age");
        const occupation = this.shadowRoot.getElementById("occupation");
        const bio        = this.shadowRoot.getElementById("bio");
        const file       = this.shadowRoot.getElementById("file");
        const result     = this.shadowRoot.getElementById('result');

        
        compButton.buttonText  = "Register";
        email.inputLabel       = "Email";
        email.inputPrompt      = "Enter email";
        email.inputType        = "email";
        password.inputLabel    = "Password";
        password.inputPrompt   = "password";
        password.inputType     = "password";
        name.inputLabel        = "Name";
        name.inputPrompt       = "Enter your name";
        surname.inputLabel     = "Surname";
        surname.inputPrompt    = "Enter you surname";
        age.inputLabe          = "Age";
        age.inputPrompt        = "Enter you age";
        occupation.inputLabel  = "Occupation";
        occupation.inputPrompt = "eg. student ";
        bio.inputLabel         = "Bio";
        bio.inputPrompt        = "Tell us more about you!";
        file.inputLabe         = "Picture";
        file.inputType         = "file";
        

        compButton.addEventListener("click", () => {

            result.innerText = "thanks!";
        
        });
        
    
    }

}

customElements.define("register-comp", RegisterPageComp);
