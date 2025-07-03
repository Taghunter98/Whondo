import { Comp } from "jay-comp";

class InputComp extends Comp {

    constructor() {

        super();
        
        this.label_         = "Label";
        this.type_          = "text";
        this.prompt_        = "Enter text";
        this.enableEntropy_ = false;
        this.required_      = false;

        this.name_ = "Input";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    set label(newLabel) {

        this.label_ = newLabel;
        this.update(this.createHTML(), this.css_);
    
    }

    set type(newType) {

        this.type_ = newType;
        this.update(this.createHTML(), this.css_);
    
    }

    set prompt(newPrompt) {

        this.prompt_ = newPrompt;
        this.update(this.createHTML(), this.css_);
    
    }

    set enableEntropy(flag){

        this.enableEntropy_ = flag;
        this.update(this.createHTML(), this.css_);
    
    }

    set required(flag){

        this.required_ = flag;
        this.update(this.createHTML(), this.css);
    
    }
        

    get label() {

        return this.label_;
    
    }

    get type() {

        return this.type_;
    
    }

    get prompt() {

        return this.prompt_;
    
    }

    get value() {

        return this.shadowRoot.querySelector("input").value;

    }

    get enableEntropy(){

        return this.enableEntropy_;
    
    }

    get required(){

        return this.required_;
    
    }


    createHTML() {

        let inputField;

        if(this.type_ === "textarea"){

            inputField = `<textarea class="inputValue areaInput" placeholder="${this.prompt_}" row="6"></textarea>`;

        } else if (this.type === "file"){

            inputField = ` <label class="fileWrapper">
                <div class="fileBox">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                    </span>
                    <span class="filePrompt">${this.prompt_}</span>
                </div>
                <input class="inputValue fileInput" type="file" accept=".png" hidden >
            </label>`;

        }

        else {

            inputField = `<input class="inputValue" type="${this.type_}" placeholder="${this.prompt_}">`;

            if (this.type_ === "password" && this.enableEntropy_){

                inputField += `<div class="hint" style="display: none">Hint: Use a mix of letters, numbers, and symbols</div>`;

            }

        }

        return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
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
            fontSize: 16,
            width: "100%",
            padding: "8px 12px",
            border: "border",
            borderRadius: 8,
            boxSizing: "border-box"
        });

        const inputHover = this.design.create({
            class: "inputValue",
            pseudoClass: "hover",
            outline: "solid 2px var(--black60)"
        });

        const inputActive = this.design.create({
            class: "inputValue",
            pseudoClass: "focus",
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
            cursor: "pointer"
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
            pseudoClass: "hover",
            outline: "solid 2px var(--black60)"
        });

        const fileActive = this.design.create({
            class: "fileBox",
            pseudoClass: "focus",
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

    hook(){

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

                    filePrompt.textContent = this.prompt_;
                    
                
                }
            
            });
        
        }


        if(this.type_ === "password" && this.enableEntropy_){

            const inputEn = this.shadowRoot.querySelector(".inputValue");
            const hintEl  = this.shadowRoot.querySelector(".hint");
            inputEn.addEventListener("input", () => {

                const password = inputEn.value;
                const entropy  = this.calculateEntropy(password);

                inputEn.classList.remove("strength-very-weak","strength-red", "strength-yellow", "strength-green");

                if(entropy < 20){
                    
                    inputEn.classList.add("strength-red");
                    
                    if(hintEl) {

                        hintEl.style.display = "block";
                    
                    }
                
                } else if (entropy < 60) {

                    inputEn.classList.add("strength-red");
                    if(hintEl) {

                        hintEl.style.display = "block";
                        hintEl.textContent   = "Weak: Try adding symbols, numbers or uppercase letters.";
                    
                    }
                
                } else if (entropy < 78) {

                    inputEn.classList.add("strength-yellow");
                    if(hintEl) {

                        hintEl.style.display = "block";
                        hintEl.textContent   = "Almost strong: Consider mixing symbols and length.";
                    
                    }
                
                } else {

                    inputEn.classList.add("strength-green");
                    if (hintEl) {

                        hintEl.style.display = "none";
                    
                    }
                
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

    isEmpty(){

        const val = this.value?.trim();
        return !val;
    
    }

}

customElements.define("comp-input", InputComp);