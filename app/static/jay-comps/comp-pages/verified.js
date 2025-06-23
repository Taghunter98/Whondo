import { Comp } from 'jay-comp';

class Verified extends Comp {
    
    constructor() {

        super();

        this.name_ = "Verified";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    createHTML() {

        return /* html */`
        <div class="background">
            <!-- replace with google icons -->
            <i id="" class="fa-solid fa-circle-check"></i>

            <div class="container">
                <h3 class="head">Verified!</h3>
                <p class="describe">Welcome {{ email }}!<br>Your account has now been verified.</p>
                <comp-button></comp-button>
            </div>
        </div>
        `;
    
    }

    createCSS() {

        const animation = this.effect.prop("slideUp", .5);

        const background = this.design.create({
            class: "background",
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            width: "auto",
            padding: "50px 0px",
            alignItems: "centre",
            border: false,
            gap: 0,
            background: "black10",
            justifyContent: "centre",
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
            alignItems: "centre",
            border: "border",
            borderRadius: 16,
            gap: 10,
            background: "white",
            textAlign: "centre",
            animation: animation,
            marginTop: 0,
        });

        const head = this.design.create({
            class: "head",
            fontSize: 24,
            alignSelf: "centre",
            paddingBottom: 0,
            lineHeight: 30,
        });

        return /* css */`
        ${background}
        ${container}
        ${head}

        @media (max-width: 600px) {
            ${backgroundMobile}
        }
        `;
    
    }

    hook() {

        this.shadowRoot.querySelector('comp-button').buttonText = "Continue";
    
    }

}

customElements.define("comp-verified", Verified);