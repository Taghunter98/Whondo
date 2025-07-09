import { InputComp } from './input.js';
/** @extends {InputComp} */
class FileComp extends InputComp {

    constructor(){

        super();

        this.type_ = "file";
        
        this.name_ = "File Comp";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();
    
    }

    createHTML(){

        return /* html */`
           
            <div class="inputContainer">
                <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
                <div class="fileWrapper">
                    <div class="fileBox">
                        <img class="filePreview" src="" hidden>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                            </svg>
                        </span>
                        <span class="filePrompt">${this.prompt_}</span>
                        <input class="inputValue fileInput" type="file" accept="image/png, image/jpeg, image/jpg" hidden>
                        <comp-button class="reuploadBtn" hidden></comp-button>
                    </div>
                </div>
            </div>
        `;
    
    }

    createCSS(){
       
        const fileStyle = this.design.create({
            class: "fileInput",
            display: "none",
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
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "100%",
            padding: 20,
            border: "2px",
            borderRadius: "12px",
            borderStyle: "dotted",
            background: "white",
            gap: 8,
            boxSizing: "border-box",
            textAlign: "center"
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

        const filesBoxDrag = this.design.create({
            class: "dragover",
            outline: "solid 2px var(--black100)",
            background: "back10",
        });

        const filePreview = this.design.create({
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
        });

        const reuploadBtn = this.design.create({
            class: "reuploadBtn",
            width: "auto",
            marginTop: 12,
        });

        const fileBoxMob = this.design.create({
            class: "filePreview",
            maxWidth: "100px",     
            maxHeight: "100px",
            marginTop: 8,
            marginLeft: "auto",
            marginRight: "auto",

        });

        const filePreMob = this.design.create({
            class: "filePreview",
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
            borderRadius: 6,
        });

        const filePromptMob = this.design.create({
            class: "filePrompt",
            fontSize: "0.8rem",
            wordWrap: "break-word",
            maxWidth: 120
        });

        const reloadMob = this.design.create({
            marginTop:  8,
            width: "100%",
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

        @media (max-width: 600px){
            ${fileBoxMob}
            ${filePreMob}
            ${filePromptMob}
            ${reloadMob}
        }
        


        `; 
    
    }

    hook(){

        const fileInput  = this.shadowRoot.querySelector(".fileInput");
        const filePrompt = this.shadowRoot.querySelector(".filePrompt");
        const icon       = this.shadowRoot.querySelector(".icon");
        const preview    = this.shadowRoot.querySelector(".filePreview");
        const dropArea   = this.shadowRoot.querySelector(".fileBox");

        
        // Clicking the fileBox opens the input
        dropArea?.addEventListener("click", () => fileInput?.click());

        // File selection logic
        fileInput?.addEventListener("change", () => {

            const file = fileInput.files[0];
            if (file) {

                filePrompt.textContent = file.name;
                icon.setAttribute("hidden", "");

                if (file.type.startsWith("image/")) {

                    const reader  = new FileReader();
                    reader.onload = () => {

                        preview.src = reader.result;
                        preview.removeAttribute("hidden");
                        this.shadowRoot.querySelector(".reuploadBtn")?.removeAttribute("hidden");
                    
                    };
                    reader.readAsDataURL(file);
                
                }
            
            } else {

                filePrompt.textContent = this.prompt_;
                preview?.setAttribute("hidden", "");
                preview.src = "";
            
            }
        
        });

        // Re-upload logic
        customElements.whenDefined("comp-button").then(() => {

            requestAnimationFrame(() => {

                const reuploadBtn = this.shadowRoot.querySelector(".reuploadBtn");
                if (reuploadBtn) {

                    reuploadBtn.text    = "Upload another";
                    reuploadBtn.variant = 2;

                    let clicking = false;

                    reuploadBtn.addEventListener("click", (e) => {

                        e.preventDefault();
                        e.stopPropagation();

                        if (clicking) return;
                        clicking = true;

                        fileInput.value = "";

                        setTimeout(() => {

                            requestAnimationFrame(() => {

                                fileInput.click();
                                
                                setTimeout(() => (clicking = false), 200);
                            
                            });
                        
                        }, 20);
                    
                    });
                
                }
            
            });

        });


        // Drag-and-drop support
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
            const droppedFiles = e.dataTransfer.files;
            if (droppedFiles.length > 0) {

                fileInput.files = droppedFiles;
                fileInput.dispatchEvent(new Event("change"));
            
            }
        
        });

        console.log("hello");
    
    }

}

customElements.define("comp-file", FileComp);