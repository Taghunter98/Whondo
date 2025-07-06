import { Comp } from "jay-comp";
class HomePage extends Comp {

    constructor(){

        super();

        this.name  = "Home page";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
    
    }

    createHTML(){

        return /* html */`
            <div>
                <div id="container">
                    <div class="modal">
                        <div class="text">

                        </div>
                        <div class="prompt">

                        </div>
                        <p></p>
                    </div>
                </div>
            </div>
        `;
    
    }

    createCSS(){

        return /* css */`
        
        `;
    
    }

    hook(){

    }

}

customElements.define("comp-home", HomePage);