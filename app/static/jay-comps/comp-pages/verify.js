import { Comp } from 'jay-comp';

class VerifyPage extends Comp {
    
    constructor() {

        super();



        this.name_ = "Verify Page";
        this.html  = this.createHTML();
        this.css_  = this.createCSS();
    
        this.render();
    
    }

    createHTML() {

        return /* html */`
        <div class="background">
            <div class="container">
                <!-- svg icon go here -->
                 <h3 class="head">Please verify your email</h3>
                <br>
                <p class="describe">
                    We have send you a verification email to you
                </p>
                <br>
                <p class="describe">
                    Please check your email please also check in spam
                </p>
            </div>
        </div>
        `;
    
    }

    createCSS() {

        return /* css */ `

        `;
    
    }

}

customElements.define('verify-page', VerifyPage);