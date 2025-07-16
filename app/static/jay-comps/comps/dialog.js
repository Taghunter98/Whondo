import {Comp} from "jay-comp";

export class Dialog extends Comp {
     
    title_;
    paragraph_ ;
    svgIcon_;
    text_;

    set title(newTitle){

        this.title_ = newTitle;
        this.update();
    
    }

    set paragraph(value){

        this.paragraph_ = value;
        this.update();
    
    }

    set svgIcon(value){

        this.svgIcon_ = value;
        this.update();
    
    }

    set text(value){

        this.text = value;
        this.update();
    
    }

    get paragraph() {

        return this.paragraph_;
    
    }

    get title() {

        return this.title_;
    
    }

    get svgIcon() {

        return this.svgIcon_;
    
    }

    get text(){

        return this.text_;
    
    }

    beforeRender(){
        if (!this.title_) this.title_ = "Hello World";
        if (!this.paragraph_) this.paragraph_ = "This is a paragraph";
        if (!this.svgIcon_) this.svgIcon_  = "";
        if (!this.text_) this.text_ = "This is a button";
    }

    hideButton() {

        requestAnimationFrame(() => {

            const btn = this.query("comp-button");
            if (btn) btn.setAttribute("hidden", "");
        
        });

    }

    showButton() {

        requestAnimationFrame(() => {

            const btn = this.query("comp-button");
            if (btn) btn.removeAttribute("hidden");
        
        });

    }

    createHTML() {

        return /* html */ `
            <div class="background">

                <div class="container">

                    <!--svg logo go here-->
                    <svg class="icon" ${this.svgIcon_}></svg>
                    <h3 class="head">${this.title_}</h3>
                    <p class="dialog">${this.paragraph_}</p>

                </div>

            </div>
        `;
    
    }

    createCSS() {
        return [
            {
                class: "background",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                heightVh: "100",
                alignItems: "centre",
                border: false,
                gap: 0,
                backgroundVar: "black10",
                justifyContent: "centre",
            },
            {
                class: "container",
                display: "flex",
                flexDirection: "column",
                width: "auto",
                maxWidth: 500,
                padding: 20,
                alignItems: "centre",
                borderVar: "border",
                borderRadius: 16,
                gap: 10,
                background: "white",
                textAlign: "start",
                marginTop: 0,
            },
            {
                class: "head",
                fontSize: 24,
                alignSelf: "center",
            },
            {
                class: "dialog",
                fontSize: 16,
                textAlign: "start",
                media: {
                    maxWidthBp: 600,
                    fontSize: 16
                }
            },
            {
                class: "icon",
                colourVar: "black80",
            },
        ];
    }

    static { Comp.register(this); }


}

