import {Comp} from "jay-comp";

class DialogComp extends Comp {

    constructor() {

        super();
        
        this.title_     = "Hello World";
        this.paragraph_ = "This is a paragraph";
        this.svgIcon_   = "";

        this.name_ = "Dialog";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();    
    
    }

    set title(newTitle){

        this.title_ = newTitle;
        this.update(this.createHTML(), this.css_);
    
    }


    set paragraph(value){

        this.paragraph1_ = value;
        this.update(this.createHTML(), this.css_);
    
    }

    set svgIcon(value){

        this.svgIcon_ = value;
        this.update(this.createHTML(), this.css_);
    
    }

    get paragraph() {

        return this.paragraph1_;
    
    }

    get title() {

        return this.title_;
    
    }


    get svgIcon() {

        return this.svgIcon_;
    
    }

    createHTML() {

        return /* html */ `
            <div class="background">

                <div class="container">

                    <!--svg logo go here-->
                    <svg class="icon" ${this.svgIcon_}></svg>
                    <h3 class="head">${this.title_}</h3>
                    <p class="dialog">${this.paragraph1_}</p>

                </div>

            </div>
        `;
    
    }

    createCSS() {

        const background = this.design.create({
            class: "background",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            alignItems: "centre",
            border: false,
            gap: 0,
            background: "black10",
            justifyContent: "centre"
        });

        const backgroundMobile = this.design.create({
            class: "background",
            padding: 20,
            width: "auto",
        });

        const container = this.design.create({
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

        const head = this.design.create({
            class: "head",
            fontSize: 24,
            alignSelf: "center",
            lineHeight: 30,
        });

        const dialog = this.design.create({
            class: "dialog",
            fontSize: 16,
            textAlign: "start",
        });

        const icon = this.design.create({
            class: "icon",
            colour: "black80",
        });

        return /* css */ `
            ${background}
            ${container}
            ${icon}
            ${head}
            ${dialog}

            @media (max-width: 600px){
                ${backgroundMobile}
            }

        `;
    
    }



}

customElements.define("dialog-box", DialogComp);