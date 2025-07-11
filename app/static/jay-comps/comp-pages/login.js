import { Comp } from "jay-comp";

export class Login extends Comp {

    name_ = "Login Page";
       
    createHTML() {
    
        return /* html */ `
        
        <div class="background">

            <div class="itemContainer">

                <div class="modal">

                    <div class="textContainer">
                        <h3 class="title">Login</h3>
                        <p class="text">Welcome back! Let's find you a new home.</p>
                    </div>

                    <div class="inputs">
                        <comp-input id="email" name="email"></comp-input>
                        <comp-input id="password" 
                        name="password"></comp-input>
                    </div>

                    <div class="footer">
                        <comp-button id="submit">Refresh Card</comp-button>
                        <p class="link"><a>Forgot password?</a></p>
                    </div>
                    <p id="result"></p>
                </div>

            <div class="backgroundImage">
                <img class="image" src="https://images.pexels.com/photos/4781426/pexels-photo-4781426.jpeg">
            </div>
            </div>
            
        </div>
        `;
    
    }

    createCSS() {   

        // Background and image styling
        const background = this.css({
            class: "background",
            widthPercent: 100,
            background: "black100",
            height: "100vh",
        });

        const itemContainer = this.css({
            class: "itemContainer",
            display: "flex",
            media: {
                breakpoint: 600,
                flexDirection: "column",
                alignItems: "centre"
            }
        });

        const imageBackground = this.css({
            class: "backgroundImage",
            widthPercent: 100,
            height: "100vh",
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
        
        // Login modal styling
        const modal = this.css({
            class: "modal",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            width: 500,
            background: "white",
            position: "absolute",
            zIndex: 800,
            padding: 20,
            borderRadius: 14,
            marginLeft: 100,
            marginTop: 100,
            media: {
                breakpoint: 600,
                width: "auto",
                margin: 0,
                marginTop: 200
            }
        });

        const inputs = this.css({
            class: "inputs",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            gap: 10,
            padding: [20, 0, 40, 0]
        });

        // Link

        const link = this.css({
            class: "link",
            colour: "black80",
            textDecoration: "underline",
            cursor: "pointer"
        });

        const linkHover = this.css({
            class: "link",
            pseudoClass: "hover",
            colour: "black100"
        });

        const textContainer = this.css({
            class: "textContainer",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            gap: 5
        });

        const title = this.css({
            class: "title",
            fontWeight: "bold"
        });

        const text = this.css({
            class: "text",
            colour: "black60"
        });
        
        const footer = this.css({
            class: "footer",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            widthPercent: 100,
            gap: 10
        });

    
        return /* css */ `
        ${background}
        ${itemContainer}
        ${imageBackground}
        ${image}
        ${modal}
        ${inputs}
        ${link}
        ${linkHover}
        ${textContainer}
        ${title}
        ${text}
        ${footer}

        `;
    
    }

    openWindow() {

        window.location.assign("/register");
    
    }

    async login(result, json) {

        let data = await this.api.request("/login", "POST", json);
        
        (data.status) ? result.innerHTML = data.message : result.innerHTML = data.error;
    
    }

    hook() {

        const compButton = this.shadowRoot.getElementById("submit");
        const result     = this.shadowRoot.getElementById("result");
        const email      = this.shadowRoot.getElementById("email");
        const pass       = this.shadowRoot.getElementById("password");
        
        compButton.text = "Login";
        email.label     = "Email";
        email.prompt    = "Enter email";
        pass.label      = "Password";
        pass.type       = "password";
        pass.prompt     = "Enter password";

        compButton.addEventListener("click", () => {
            
            let cookie   = "true";
            let jsonData = {email : email.value, password : pass.value, consent: cookie};

            this.login(result, jsonData);
        
        });
    
    }

    static {

        Comp.register(this); 

    }
  
}

