import { Comp } from 'jay-comp';
import { Input } from './input.js';

export class File extends Input {
  
    type_ = "file";
    name_ = "File Comp";
       
    createHTML(){

        return /* html */`
           
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
            <div class="fileWrapper">
                <div class="fileBox">
                    <img class="filePreview" src="" hidden/>
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                    </span>
                    <span class="filePrompt">${this.prompt_}</span>
                    <input class="inputValue fileInput" type="file" accept="image/png, image/jpeg, image/jpg" hidden />
                    <comp-button class="reuploadBtn" hidden></comp-button>
                </div>
            </div>
        </div>
        `;
    
    }

    createCSS(){
       
        const fileStyle = this.css({
            class: "fileInput",
            display: "none",
        });

        const fileWrapper = this.css({
            class: "fileWrapper",
            widthPercent: 100,
            cursor: "pointer"
        });

        const fileBox = this.css({
            class: "fileBox",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            justifyContent: "centre",
            widthPercent: 100,
            maxWidthPercent: 100,
            padding: 20,
            border: "2px",
            borderRadius: "12px",
            borderStyle: "dotted",
            background: "white",
            gap: 8,
            boxSizing: "border-box",
            textAlign: "centre"
        });

        const icon = this.css({
            class: "icon",
            fontSize: "2rem",
            fontWeight: "bold",
            colour: "black80",
        });

        const filePrompt = this.css({
            class: "filePrompt",
            fontSize: "0.9rem",
            colour: "black60",
            media: {
                breakpoint: 600,
                fontSize: "0.8rem",
                wordWrap: "break-word",
                maxWidth: 120
            }

        });
        
        const fileHover = this.css({
            class: "fileBox",
            pseudoClass: "hover",
            outline: ["solid", 2, "var(--black60)"]
        });

        const fileActive = this.css({
            class: "fileBox",
            pseudoClass: "focus",
            outline: ["solid", 2, "var(--black100)"]
        });

        const filesBoxDrag = this.css({
            class: "dragover",
            outline: ["solid", 2, "var(--black100)"],
            background: "back10",
        });

        const filePreview = this.css({
            class: "filePreview",
            width: "auto",             
            maxWidth: "150px",       
            maxHeight: "150px",        
            objectFit: "cover",
            display: "block",
            marginTop: 8,
            marginLeft: "auto",        
            marginRight: "auto",
            borderRadius: 6,
            media: {
                breakpoint: 600,
                maxWidth: "100px",     
                maxHeight: "100px",
                marginTop: 8,
                marginLeft: "auto",
                marginRight: "auto",
                maxWidthPercent: 100,
                height: "auto",
                objectFit: "cover",
                borderRadius: 6
            }
        });

        const reuploadBtn = this.css({
            class: "reuploadBtn",
            width: "auto",
            marginTop: 12,
            media: {
                breakpoint: 600,
                marginTop:  8,
                width: "auto",
            }
        });

        return /* css */`
        ${fileWrapper}
        ${fileBox}
        ${icon}
        ${filePrompt}
        ${fileStyle}
        ${fileHover}
        ${fileActive}
        ${filesBoxDrag}
        ${filePreview}
        ${reuploadBtn}

        `; 
    
    }

    get value() {
        return this.fileInput?.files?.[0] || null ;
    }

    hook() {

        const filePrompt  = this.shadowRoot.querySelector(".filePrompt");
        const icon        = this.shadowRoot.querySelector(".icon");
        const preview     = this.shadowRoot.querySelector(".filePreview");
        const dropArea    = this.shadowRoot.querySelector(".fileBox");
        const reuploadBtn = this.shadowRoot.querySelector(".reuploadBtn");

        reuploadBtn.text     = "Upload another";
        reuploadBtn. variant = 2;

        const handleFile = (file) => {

            if (!file) return;

            filePrompt.textContent = file.name;

            if (file.type.startsWith("image/")) {

                const reader  = new FileReader();
                reader.onload = () => {

                    preview.src = reader.result;
                    preview.removeAttribute("hidden");
                    icon.setAttribute("hidden", "");
                    reuploadBtn?.removeAttribute("hidden");
                
                };
                reader.readAsDataURL(file);
            
            }
        
        };

        const createInput = () => {

            const input     = document.createElement("input");
            input.type      = "file";
            input.className = "inputValue fileInput";
            input.accept    = "image/png, image/jpeg, image/jpg";
            input.hidden    = true;

            input.addEventListener("change", () => {

                if (input.files?.[0]) {

                    this._fileInput = input;
                    handleFile(input.files[0]);
                
                }
            
            });

            return input;
        
        };

        this._fileInput = this.shadowRoot.querySelector(".fileInput");

        if (this._fileInput) {

            this._fileInput.addEventListener("change", () => {

                if (this._fileInput.files?.[0]) {

                    handleFile(this._fileInput.files[0]);
                
                }
            
            });

        }

        
        dropArea?.addEventListener("click", () => {

            this._fileInput?.click();
        
        });

        dropArea?.addEventListener("dragover", (e) => {

            e.preventDefault();
            dropArea.classList.add("dragover");
        
        });

        dropArea?.addEventListener("dragleave", (e) => {

            e.preventDefault();
            dropArea.classList.remove("dragover");
        
        });

        dropArea?.addEventListener("drop", (e) => {

            e.preventDefault();
            dropArea.classList.remove("dragover");

            const file = e.dataTransfer.files[0];
            if (file) {

                this._fileInput?.remove(); 
                const input = createInput();
                dropArea.appendChild(input);
                this._fileInput = input;

                
                Object.defineProperty(input, 'files', {
                    value: e.dataTransfer.files,
                    writable: false
                });
                input.dispatchEvent(new Event("change"));
            
            }
        
        });

        reuploadBtn?.addEventListener("click", (e) => {

            e.preventDefault();
            e.stopPropagation();

            this._fileInput?.remove();

            const newInput = createInput();
            dropArea.appendChild(newInput);
            this._fileInput = newInput;

            setTimeout(() => newInput.click(), 10);
        
        });


    }

    static {

        Comp.register(this);

    }

}

