import { File } from "./file.js";

export class FileCard extends File {

    createHTML(){

        return /* html */`
           
        <div class="inputContainer">
            <div class="fileWrapper">
                <div class="fileBox">
                    <div class="imageContainer" hidden>
                        <img class="filePreview" src="" hidden/>
                    </div>
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="currentColor">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                    </span>
                    <span class="filePrompt">${this.prompt_}</span>
                    <input class="inputValue fileInput" type="file" accept="image/png, image/jpeg, image/jpg" hidden />
                </div>
            </div>
        </div>
        `;
    
    }

    createCSS (){

        const base = super.createCSS();

        const fileBox = {
            class: "fileBox",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            justifyContent: "centre",
            position: "relative",
            widthPercent: 100,
            maxWidthPercent: 100,
            padding: 0,
            border: 2,
            borderRadius: 8,
            borderStyle: "dotted",
            background: "white",
            gap: 8,
            boxSizing: "border-box",
            textAlign: "centre",
            overflow: "hidden",
            height: 387,
            media: {
                maxWidthBp: 600
            }
        };

        const previewBox = {
            
            class: "filePreview",
            maxWidthPercent: 100,               
            maxHeightPercent: 100,
            objectFit: "cover",
            display: "block",
            objectPosition: "centre",
            margin: 0,
            borderRadius: 12,
            media: {
                maxWidthBp: 600,
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
    
        };

        const imageContainer = {
            class: "imageContainer",
            widthPercent: 100,
            position: "relative",
        };
    
        return [base, previewBox, fileBox, imageContainer,];
    
    }

    afterRender() {

        const filePrompt = this.query(".filePrompt");
        const icon       = this.query(".icon");
        const preview    = this.query(".filePreview");
        const dropArea   = this.query(".fileBox");
        const container  = this.query(".imageContainer");

        const handleFile = (file) => {

            if (!file) return;

            filePrompt.setAttribute("hidden", "");

            this._selectedFile = file;

            if (file.type.startsWith("image/")) {

                const reader  = new FileReader();
                reader.onload = () => {

                    preview.src = reader.result;
                    container.removeAttribute("hidden");
                    preview.removeAttribute("hidden");
                    icon.setAttribute("hidden", "");
                
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
                
                handleFile(file);
            
            }
        
        });
    
    }

    static {

        super.register(this); 

    }
    
}