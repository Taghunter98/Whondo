import { Input } from './input.js';

export class File extends Input {
  
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
        
        return [
            {
                class: "fileInput",
                display: "none",
            },
            {
                class: "fileWrapper",
                widthPercent: 100,
                cursor: "pointer"
            },
            {
                class: "fileBox",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                justifyContent: "centre",
                widthPercent: 100,
                maxWidthPercent: 100,
                padding: 20,
                border: 2,
                borderRadius: 12,
                borderStyle: "dotted",
                background: "white",
                gap: 8,
                boxSizing: "border-box",
                textAlign: "centre"
            },
            {
                class: "icon",
                fontSizeRem: 2,
                fontWeight: "bold",
                colourVar: "black80",
            },
            {
                class: "filePrompt",
                fontSizeRem: 0.9,
                colourVar: "black60",
                media: {
                    breakpoint: 600,
                    fontSizeRem: 0.8,
                    wordWrap: "break-word",
                    maxWidth: 120
                }

            },
            {
                class: "fileBox",
                pseudoClass: "hover",
                outline: ["solid", 2, "var(--black60)"]
            },
            {
                class: "fileBox",
                pseudoClass: "focus",
                outline: ["solid", 2, "var(--black100)"]
            },
            {
                class: "dragover",
                outline: ["solid", 2, "var(--black100)"],
                backgroundVar: "back10",
            },
            {
                class: "filePreview",
                width: "auto",             
                maxWidth: 150,       
                maxHeight: 150,        
                objectFit: "cover",
                display: "block",
                marginTop: 8,
                marginLeft: "auto",        
                marginRight: "auto",
                borderRadius: 6,
                media: {
                    breakpoint: 600,
                    maxWidth: 100,     
                    maxHeight: 100,
                    marginTop: 8,
                    marginLeft: "auto",
                    marginRight: "auto",
                    maxWidthPercent: 100,
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 6
                }
            },
            {
                class: "reuploadBtn",
                width: "auto",
                marginTop: 12,
                media: {
                    breakpoint: 600,
                    marginTop:  8,
                    width: "auto",
                }
            }
        ];
    }

    get value() {
        return this.fileInput?.files?.[0] || null ;
    }

    afterRender() {

        const filePrompt  = this.query(".filePrompt");
        const icon        = this.query(".icon");
        const preview     = this.query(".filePreview");
        const dropArea    = this.query(".fileBox");
        const reuploadBtn = this.query(".reuploadBtn");

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

        this._fileInput = this.query(".fileInput");

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

    static { super.register(this); }

}

