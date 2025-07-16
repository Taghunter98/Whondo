import { Comp } from "jay-comp";

export class Home extends Comp {

    text_;

    set text(v){
        this.text_ = v;
        this.update();
    }

    get text() { return this.text_; }

    beforeRender(){
        if (!this.text_) this.text_ = "This is a placeholder"
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
                        <textarea name="" id="prompt" class="prompt" placeholder="${this.text}"></textarea>

                        <div class="icon">
                            <comp-icon class="img" id="img"></comp-icon>
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
                maxWidth: 800,
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
                height: 74,
                maxWidth: 800,
                padding: 15,
                backgroundVar: "black10",
                borderVar: "border",
                borderRadius: 15,
                boxSizing: "border-box",
                media:{
                    maxWidthBp: 600,
                    flexDirection: "row",
                }
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
                overflow: "hidden",
                lineHeight: 1.5,
                outline: "none",
                media: {
                maxWidthBp: 600,
                fontSize: 16
            }
            },
            {
                class: "icon",
                display: "flex",
                justifyContent: "centre",
                padding: 10,
                backgroundVar: "black100",
                borderRadius: 8,
                flexShrink: 0
            },
            {
                class: "img",
                width: 24,
                height: 24,
                display: "block"
            },
            {
                class: "help",
                display: "flex",
                justifyContent: "centre",
                fontSize: 14,
                cursor: "pointer",
                colourVar: "black100"
            }
        ];
    }

    afterRender(){
        const holder = this.query("textarea");
        const icon = this.query("comp-icon");


        holder.text = "e.g I want to live in a flat in London that is £2000 a month, has two bedrooms and one bathroom...";
        icon.path = "arrow_forward.png";
    }

     static { Comp.register(this); }

}