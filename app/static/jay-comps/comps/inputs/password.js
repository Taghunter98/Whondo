import { InputComp } from "./input.js";

class PasswordComp extends InputComp {

    constructor(){

        super();

        this.type_          = "password";
        this.enableEntropy_ = false; 

        this.name_ = "Password Comp",
        this.html_ = this.createHTML();
        this.css_ = this.createCSS(); 

        this.render();
    
    }

    createHTML(){

        return /* html */`
            <div class="inputContainer">

                <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
                <input class="inputValue" type="${this.type_}" placeholder="${this.prompt_}">

                <div class="hint" style="display: none">
                    Hint: Use a mix of letters, numbers, and symbols
                </div>
            </div>
        
        `;
        
    }

    set enableEntropy(flag) {

        this.enableEntropy_ = flag;
        this.update(this.createHTML(), this.css_);
    
    }

    get enableEntropy() {

        return this.enableEntropy_;
    
    }

    calculateEntropy(password){

        let poolSize = 0;
        if(/[a-z]/.test(password)) poolSize += 26;
        if(/[A-Z]/.test(password)) poolSize += 26;
        if(/[0-9]/.test(password)) poolSize += 10;
        if(/[^A-Za-z0-9]/.test(password)) poolSize += 32;

        return password.length * Math.log2(poolSize || 1);
    
    }

    validateInput(input, hint, entropy) {

        entropy < 78 && entropy > 0 ? hint.style.display = "block" : hint.style.display = "none";
        
        if (entropy == 0) input.classList.remove("success", "warning", "error");

        else if ( entropy < 60) {

            input.classList.add("error");
            hint.textContent = "Weak: Try adding symbols, numbers or uppercase letters.";
            
        } else if (entropy < 78) {

            input.classList.add("warning");
            hint.textContent = "Almost strong: Consider mixing symbols and length.";
            
        } else if (entropy > 78) {

            input.classList.add("success");
            
        }
    
    }

    hook(){

        const input = this.shadowRoot.querySelector(".inputValue");
        const hint  = this.shadowRoot.querySelector(".hint");

        if (this.type_ === "password" && this.enableEntropy_){

            input.addEventListener("input", () => {

                const entropy = this.calculateEntropy(input.value);
                this.validateInput(input, hint, entropy);
        
            });

        }
    
    }

}

customElements.define("comp-password", PasswordComp);