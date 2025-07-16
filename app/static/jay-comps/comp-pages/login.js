import { Comp } from "jay-comp";

export class Login extends Comp {
       
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
        return[
            {
                class: "background",
                widthPercent: 100,
                backgroundVar: "black100",
                heightVh: 100,
            },
            {
                class: "itemContainer",
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
                    height: "40vh",
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
            // Login modal styling
            {
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
                    maxWidthBp: 600,
                    width: "auto",
                    margin: 0,
                    marginTop: 200
                }
            },
            {
                class: "inputs",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 10,
                padding: [20, 0, 40, 0]
            },
            // Link
            {
                class: "link",
                colourVar: "black80",
                textDecoration: "underline",
                cursor: "pointer"
            },
            {
                class: "link",
                pseudoClass: "hover",
                colourVar: "black100"
            },
            {
                class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 5
            },
            {
                class: "title",
                fontWeight: "bold"
            },
            {
                class: "text",
                colourVar: "black60"
            },
            {
                class: "footer",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                gap: 10
            }
        ];
    }

    openWindow() {

        window.location.assign("/register");
    
    }

    async login(result, json) {

        let data = await this.api.request("/login", "POST", json);
        
        (data.status) ? result.innerHTML = data.message : result.innerHTML = data.error;
    
    }

    afterRender() {

        const compButton = this.getById("submit");
        const result     = this.getById("result");
        const email      = this.getById("email");
        const pass       = this.getById("password");
        
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

    static { Comp.register(this); }
  
}

