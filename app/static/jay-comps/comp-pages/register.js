import { Comp } from "../comp-src/comp.js";

class RegisterPageComp extends Comp {

    constructor() {

        super();

        this.title_ = "Register to Whondo";

        this.compName_ = "Register page";
        this.compHTML_ = this.createHTML();
        this.compCSS_  = this.createCSS();

        this.renderComp();
    
    }

    createHTML() {

        return /* html */ `
        <div class="background">
            <div class="container">
                <h3>${this.title_}</h3>
                
                <comp-input id="email"></comp-input>
                <comp-input id="password"></comp-input>
                <comp-input id="name"></comp-input>
                <comp-input id="surname"></comp-input>
                <comp-input id="age"></comp-input>
                <comp-input id="occupation"></comp-input>
                <comp-input id="bio"></comp-input>
                <comp-input id= "file"></comp-input>
                <comp-button id="submit"></comp-button>

            </div>
            <div class="container2">
                <p>Have an account?</p>
                <a></a>
            </div>
        </div>
        `;
    
    }

    createCSS(){
        
        const background = this.design.create({
            valueID: "background",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: "50px 0px",
            border: false,
            gap: 0,
            background: "black10",

        });
        
        const backgroundMobile = this.design.create({
            valueID: "background",
            padding: 20,
            width: "auto"
        });

        const container = this.design.create({
            valueID: "container",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            maxWidth: 500,
            padding: 20,
            alignItems: "start",
            border: true,
            borderRadius: 16,
            gap: 15,
            background: "white",
            opacity: 0,
        });

        const container2 = this.design.create({
            valueID: "container2",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            maxWidth: 500,
            padding: 20,
            alignItems: "start",
            border: true,
            borderRadius: 16,
            gap: 15,
            background: "white",
            opacity: 0,

        });

        return /* css */ `
        ${background}
        ${container}
        ${container2}

        @media (max-width: 600px){
            ${backgroundMobile}
        }
        `;

    }

    compHook(){

        const compButton = this.shadowRoot.getElementById("submit");
        const email      = this.shadowRoot.getElementById("email");
        const password   = this.shadowRoot.getElementById("password");
        const name       = this.shadowRoot.getElementById("name");
        const surname    = this.shadowRoot.getElementById("surname");
        const age        = this.shadowRoot.getElementById("age");
        const occupation = this.shadowRoot.getElementById("occupation");
        const bio        = this.shadowRoot.getElementById("bio");
        const file       = this.shadowRoot.getElementById("file");
        
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
        

    
    }

}

customElements.define("register-comp", RegisterPageComp);





