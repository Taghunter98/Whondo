import { InputComp } from "./input.js";
/** @extends {InputComp} */
class PasswordComp extends InputComp {

    constructor(){

        super();

        this.type_          = "password";
        this.enableEntropy_ = false; 

        this.name_ = "Password Comp",
        this.html_ = this.createHTML();
        this.css_ = this.createCSS(); 

    
    }

    createHTML(){

        return /* html */`
            <div class="inputContainer">

                <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
                <input class="inputValue" type="password" placeholder="${this.prompt_}">

            <div class="hint" style="display: none">
                Hint: Use a mix of letters, numbers, and symbols
            </div>
        </div>
        
        `;
        
    }

    calculateEntropy(password){

        let poolSize = 0;
        if(/[a-z]/.test(password)) poolSize += 26;
        if(/[A-Z]/.test(password)) poolSize += 26;
        if(/[0-9]/.test(password)) poolSize += 10;
        if(/[^A-Za-z0-9]/.test(password)) poolSize += 32;

        return password.length * Math.log2(poolSize || 1);
    
    }

    hook(){

        const input = this.shadowRoot.querySelector(".inputValue");
        const hint  = this.shadowRoot.querySelector(".hint");

        input.addEventListener("input", () => {

            const entropy = this.calculateEntropy(input.value);
            if(entropy < 20) {

                input.classList.add("strength-red");
                hint.style.display = "block";
                hint.textContent   = "Too weak. Add more variety.";
            
            } else if ( entropy < 60) {

                input.classList.add("strength-red");
                hint.style.display = "block";
                hint.textContent   = "Weak: Try adding symbols, numbers or uppercase letters.";
            
            } else if (entropy < 78) {

                input.classList.add("strength-yellow");
                hint.style.display = "block";
                hint.textContent   = "Almost strong: Consider mixing symbols and length.";
            
            } else {

                input.classList.add("strength-green");
                hint.style.display = "none";
            
            }
        
        });


    }

}

customElements.define("comp-password", PasswordComp);