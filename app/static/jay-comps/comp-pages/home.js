import { Comp } from "jay-comp";

export class Home extends Comp {

    text_;

    set text(v){
        this.text_ = v;
        this.update();
    }

    get text() { return this.text_; }

    beforeRender(){
        if (!this.text_) 
            this.text_ = window.innerWidth <= 600 ?
                "I want to rent a flat in London that's £2000 a month..." :
                "I want to rent a flat in London that's £2000 a month, has two bedrooms and one bathroom and near a tube station..."
    }

    createHTML(){
        return /* html */`
        <div class="background">
            <div class="container">
                
                <h2 class="head">Describe your perfect home</h2>
                    
                <div class="modal">
                    <div class="prompt-wrapper">
                        <textarea name="" id="prompt" class="prompt" placeholder="${this.text_}"></textarea>

                        <div class="iconBtn">
                            <comp-prompt-icon class="icon"></comp-prompt-icon>
                        </div>
                    </div>
                    <p><a href="#" class="help">Prompting Help</a></p>
                </div>
            </div>
        </div>
        `;
    }

    createCSS(){
        return [ 
            { class: "background",
                display: "flex",
                flexDirection: "column",
                justifyContent: "centre",
                widthPercent: 100,
                heightVh: 100,
                background: "white",
                media: {maxWidthBp: 600, justifyContent: "end" }
            },
            { class: "container",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                justifyContent: "centre"
            },
            { class: "modal",
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
            { class: "head",
                colourVar: "black100",
                textAlign: "centre",
                fontWeight: "bold",
                paddingBottom: 20,
                media: { maxWidthBp: 600, fontSize: 24, paddingBottom: 0}
            },
            { class: "prompt-wrapper",
                display: "flex",
                gap: 20,
                widthPercent: 100,
                maxWidth: 900,
                minHeight: 74,
                padding: 15,
                backgroundVar: "black10",
                borderVar: "border",
                borderRadius: 15,
                boxSizing: "border-box"
            },
            { class: "prompt",
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
                media: { maxWidthBp: 600, fontSize: 16 }
            },
            { class: "help",
                display: "flex",
                justifyContent: "centre",
                fontSize: 14,
                cursor: "pointer",
                colourVar: "black100"
            },
            { class: "prompt",
                pseudoClass: ":placeholder",
                fontFamily: "Geist, sans-serif",
                fontSize: 16
            }
        ];
    }

    /**
     * Method auto resizes the prompt bar element
     * @param {HTMLElement} el 
     */
    autoResize(el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }

    afterRender(){
        const icon = this.query(".icon");
        const textarea = this.query(".prompt");

        icon.path = "arrow_forward.svg"

        textarea.text = this.text_;

        this.autoResize(textarea);

        textarea.addEventListener("input", () => this.autoResize(textarea));
    }

    static { Comp.register(this); }

}