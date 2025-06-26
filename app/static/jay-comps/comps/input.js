import { Comp } from "jay-comp";

class InputComp extends Comp {

    constructor() {

        super();
        
        this.inputLabel_  = "";
        this.inputType_   = "text";
        this.inputPrompt_ = "Enter text";

        this.name_ = "Input";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    set inputLabel(newInputLabel) {

        this.inputLabel_ = newInputLabel;
        this.update(this.createHTML(), this.css_);
    
    }

    set inputType(newInputType) {

        this.inputType_ = newInputType;
        this.update(this.createHTML(), this.css_);
    
    }

    set inputPrompt(newInputPrompt) {

        this.inputPrompt_ = newInputPrompt;
        this.update(this.createHTML(), this.css_);
    
    }

    get inputLabel() {

        return this.inputLabel_;
    
    }

    get inputType() {

        return this.inputType_;
    
    }

    get inputPrompt() {

        return this.inputPrompt_;
    
    }

    get inputValue() {

        return this.shadowRoot.querySelector(".inputValue").value;

    }


    createHTML() {
        
        let inputField;

        if(this.inputType_ === "textarea"){

            inputField = `<textarea class="inputValue areaInput" placeholder="${this.inputPrompt_}" row="6"></textarea>`;
        
    
        } else if (this.inputType_ === "file"){

            inputField = `
            <label class="fileWrapper">
                <div class="fileBox">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </span>
                    <span class="filePrompt">${this.inputPrompt_}</span>
                </div>
                <input class="inputValue fileInput" type="file" accept=".png" hidden >
            </label>
            `;
        
        }
        
        else {

            inputField = `<input class="inputValue" type="${this.inputType_}" placeholder="${this.inputPrompt_}">`;

            if (this.inputType_ === "password"){

                inputField += `<div class="hint" style="display: none">Hint: Use a mix of letters, numbers, and symbols</div>`;
            
            }
        
        }

        return /* html */ `
        <div class="inputContainer">
            <label>${this.inputLabel_}</label>
            ${inputField}
        </div>
        `;
    
    }

    createCSS() {

        const inputContainer = this.design.create({
            class: "inputContainer",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "none",
            padding: 0,
            alignItems: "start",
            gap: 10,
            background: "--white"
        });

        const input = this.design.create({
            class: "inputValue",
            display: "block",
            fontSize: 12,
            width: "100%",
            padding: "8px 12px",
            border: "border",
            borderRadius: 8,
            boxSizing: "border-box"
        });

        const inputHover = this.design.create({
            class: "inputValue",
            psuedoClass: "hover",
            outline: "solid 2px var(--black60)"
        });

        const inputActive = this.design.create({
            class: "inputValue",
            psuedoClass: "focus",
            outline: "solid 2px var(--black100)"
        });

        const fileStyle = this.design.create({
            class: "fileInput",
            display: "none",
        });

        const areaInput = this.design.create({

            class: "areaInput",
            resize: "none",
            height: "80px",
            width: "100%",

        });

        const fileWrapper = this.design.create({
            class: "fileWrapper",
            width: "100%",
            cursor: "pointer",
        });

        const fileBox = this.design.create({
            class: "fileBox",
            display: "flex",
            flexDirection: "column",
            justifyContent: "centre",
            alignItems: "centre",
            padding: 40,
            border: "2px",
            borderRadius: "12px",
            borderStyle: "dotted",
            background: "white",
            gap: 8,
            colour: "black60",
            textAlign: "centre",
        });

        const icon = this.design.create({
            class: "icon",
            fontSize: "2rem",
            fontWeight: "bold",
            colour: "black80",
        });

        const filePrompt = this.design.create({
            class: "filePrompt",
            fontSize: "0.9rem",
            colour: "black60",

        });
        
        const fileHover = this.design.create({
            class: "fileBox",
            psuedoClass: "hover",
            outline: "solid 2px var(--black60)"
        });

        const fileActive = this.design.create({
            class: "fileBox",
            psuedoClass: "focus",
            outline: "solid 2px var(--black100)"
        });

        const strengthVeryWeak = this.design.create({
            class: "strength-very-weak",
            borderBottom: "2px solid DarkRed",
        });

        const strengthRed = this.design.create({
            class: "strength-red",
            borderBottom: "2px solid red",
        });

        const strengthYellow = this.design.create({
            class: "strength-yellow",
            borderBottom: "2px solid orange",
        });

        const strengthGreen = this.design.create({
            class: "strength-green",
            borderBottom: "2px solid green",
        });

        const hint = this.design.create({
            class: "hint",
            fontSize: "0.75rem",
            colour: "black",
            paddingTop: 4,
            paddingLeft: 2,
        });

        return /* css */ `
        
        ${inputContainer}
        
        ${input}
        ${inputHover}
        ${inputActive}
        ${hint}
        ${strengthVeryWeak}
        ${strengthRed}
        ${strengthYellow}
        ${strengthGreen}
        ${fileWrapper}
        ${fileBox}
        ${icon}
        ${filePrompt}
        ${fileStyle}
        ${fileHover}
        ${fileActive}
        ${areaInput}

        `;
    
    }

    hook() {

        const fileInput  = this.shadowRoot.querySelector(".fileInput");
        const filePrompt = this.shadowRoot.querySelector(".filePrompt");
        const icon       = this.shadowRoot.querySelector(".icon");

        if(fileInput && filePrompt){

            fileInput.addEventListener("change", () => {

                const file = fileInput.files[0];
                if(file){

                    filePrompt.textContent = file.name;
                    icon.innerHTML         = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
                
                }else {

                    filePrompt.textContent = this.inputPrompt_;
                    
                
                }
            
            });
        
        }


        if(this.inputType_ === "password"){

            const inputEn = this.shadowRoot.querySelector(".inputValue");

            inputEn.addEventListener("input", () => {

                const password = inputEn.value;
                const entropy  = this.calculateEntropy(password);

                inputEn.classList.remove("strength-red", "strength-yellow", "strength-green");

                if(entropy >= 78){
                    
                    inputEn.classList.add("strength-green");
                
                } else if (entropy >= 60) {

                    inputEn.classList.add("strength-yellow");
                
                } else if (entropy > 20) {

                    inputEn.classList.add("strength-red");
                
                } else {

                    inputEn.classList.add("strength-very-weak");
                
                }

                const hintEn = this.shadowRoot.querySelector(".hint");

                if (entropy < 78 ) {

                    if (hintEn) hintEn.style.display = "block";
                
                } else {

                    if (hintEn) hintEn.style.display = "none";
                
                }
            
            });
        
        }

    }

    calculateEntropy(password){

        let poolSize = 0;
        if (/[a-z]/.test(password)) poolSize += 26;
        if (/[A-Z]/.test(password)) poolSize += 26;
        if (/[0-9]/.test(password)) poolSize += 10;
        if (/[^A-Za-z0-9]/.test(password)) poolSize += 32; 

        return password.length * Math.log2(poolSize || 1);;
    
    }

}

customElements.define("comp-input", InputComp);