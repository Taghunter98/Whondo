import {Comp} from "jay-comp";

export class Dialog extends Comp {
     
    title_     = "Hello World";
    paragraph_ = "This is a paragraph";
    svgIcon_   = "";
    text_ = "This is a button";

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

    hideButton() {

        requestAnimationFrame(() => {

            const btn = this.shadowRoot?.querySelector("comp-button");
            if (btn) btn.setAttribute("hidden", "");
        
        });

    }

    showButton() {

        requestAnimationFrame(() => {

            const btn = this.shadowRoot?.querySelector("comp-button");
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

        const background = this.css({
            class: "background",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            height: "100vh",
            alignItems: "centre",
            border: false,
            gap: 0,
            background: "black10",
            justifyContent: "centre",
        });

        const container = this.css({
            class: "container",
            display: "flex",
            flexDirection: "column",
            width: "auto",
            maxWidth: 500,
            padding: 20,
            alignItems: "centre",
            border: "border",
            borderRadius: 16,
            gap: 10,
            background: "white",
            textAlign: "start",
            marginTop: 0,
        });

        const head = this.css({
            class: "head",
            fontSize: 24,
            alignSelf: "center",
        });

        const dialog = this.css({
            class: "dialog",
            fontSize: 16,
            textAlign: "start",
        });

        const icon = this.css({
            class: "icon",
            colour: "black80",
        });

        const media = this.css({
            media: {
                breakpoint: 600,
                padding: 20,
                width: 350
            }
        });

        return /* css */ `
            ${background}
            ${container}
            ${icon}
            ${head}
            ${dialog}
            ${media}
        `;
    
    }

    static {

        Comp.register(this);

    }


}

