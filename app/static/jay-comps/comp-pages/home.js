import { Comp } from "jay-comp";

export class Home extends Comp {

    text_;

    set text(v){
        this.text_ = v;
        this.update();
    }

    get text() { return this.text_; }

    beforeRender(){
        if (!this.text_) {
            const longText = "e.g I want to live in a flat in London that is £2000 a month, has two bedrooms and one bathroom...";
            const shortText = "e.g I want a flat in London (£2000)..."
            
            this.text_ = window.innerWidth <= 600 ? shortText : longText
        }
    }

    createHTML(){
        
        return /* html */`
        <div class="background">
            <div class="container">
                <div class="modal">
                    <div class="text">
                        <h2 class="head">Describe your perfect home</h2>
                    </div>
                    <div class="prompt-wrapper">
                        <textarea name="" id="prompt" class="prompt" placeholder="${this.text_}"></textarea>

                        <div class="iconBtn">
                            <comp-ibutton class="miniBtn" id="sendBtn"></comp-ibutton>
                        </div>
                    </div>
                    <p><a href="#" class="help">Prompting Help</a></p>
                </div>
            </div>
        </div>
        `;
    }

    createCSS(){

        const placeholder = {
            class: "prompt",
            pseudoClass: ":placeholder",
            fontFamily: "Geist, sans-serif",
            fontSize: 16
        };

        return [ placeholder,
            {
                class: "background",
                display: "flex",
                flexDirection: "column",
                justifyContent: "centre",
                alignItems: "centre",
                widthPercent: 100,
                heightVh: 100,
                background: "white"
            },
            {
                class: "container",
                display: "flex",
                widthPercent: 100,
                justifyContent: "centre"
            },
            {
                class: "modal",
                display: "flex",
                flexDirection: "column",
                justifyContent: "centre",
                alignItems: "centre",
                gap: 40,
                widthPercent: 100,
                maxWidth: 900,
                padding: 20,
                boxSizing: "border-box"
            },
            {
                class: "head",
                fontSize: 48,
                colourVar: "black100",
                textAlign: "centre",
                widthPercent: 100,
                fontWeight: "bold",
                lineHeight: "normal",
                media: {
                    maxWidthBp: 600,
                    fontSize: 32,
                }
            },
            {
                class: "prompt-wrapper",
                display: "flex",
                alignItems: "centre",
                gap: 20,
                widthPercent: 100,
                maxWidth: 900,
                minHeight: 74,
                padding: 15,
                backgroundVar: "black10",
                borderVar: "border",
                borderRadius: 15,
                boxSizing: "border-box",
            },
            {
                class: "prompt",
                flexGrow: 1,
                flexShrink: 1,
                widthPercent: 100,
                backgroundVar: "black10",
                border: "none",
                fontSize: 16,
                resize: "none",
                lineHeight: 1.5,
                outline: "none",
                fontFamily: "Geist",
                minHeight: 44,
                maxHeight: 150,
                whiteSpace: "pre-wrap",
                media: {
                maxWidthBp: 600,
                fontSize: 16,
                }
            },
            {
                class: "iconBtn",
                display: "flex",
                justifyContent: "centre",
                borderRadius: 8,
                flexShrink: 0,
            },
            {
                class: "help",
                display: "flex",
                justifyContent: "centre",
                fontSize: 14,
                cursor: "pointer",
                colourVar: "black100"
            },
            {
                class: "text",
                widthPercent: 100,
                display: "flex",
                justifyContent: "centre",
                textAlign: "centre"
            },
            {
                class: "miniBtn",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
            },
            {
                class: "icon",
                display: "flex",
                alignItems: "centre",
                justifyContent: "centre",
                alignItems: "centre",
                borderVar: "black100",
                border: "none",
                padding: 10
            }
        ];
    }

     autoResize(el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }

    afterRender(){
        
        const textarea = this.query(".prompt");
        const btn = this.query(".miniBtn")

        btn.text = `<img src="app\static\icons\arrow_forward2.png">`;

        textarea.value = "";
        textarea.placeholder= this.text_;

        this.autoResize(textarea);

        textarea.addEventListener("input", () => {
            this.autoResize(textarea);
        });
    }

     static { Comp.register(this); }

}