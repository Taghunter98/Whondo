import { Comp } from "jay-comp";
import { Input } from "./input.js";

export class Password extends Input {

    enableEntropy_ = false; 
    name_ = "Password Comp";
      
    set entropy(flag){

        this.enableEntropy_ = flag;
        this.update();
        
    }

    get entropy(){

        return this.enableEntropy_;
    
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

    set enableEntropy(flag) {

        this.enableEntropy_ = flag;
        this.update();
    
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

        if (this.enableEntropy_){

            input.addEventListener("input", () => {

                const entropy = this.calculateEntropy(input.value);
                this.validateInput(input, hint, entropy);
        
            });

        }
    
    }

    static {

        Comp.register(this);

    }

}

