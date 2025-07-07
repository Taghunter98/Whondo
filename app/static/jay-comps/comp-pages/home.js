import { Comp } from "jay-comp";
class HomePage extends Comp {

    constructor(){

        super();

        this.name  = "Home page";
        this.html_ = this.createHTML();
        this.css_  = this.createCSS();

        this.render();
    
    }

    createHTML(){

        return /* html */`
            <div class="background">
                <div class="container">
                    <div class="modal">
                        <div class="text">
                            <h2 id="head">Describe your perfect home</h2>
                        </div>
                        <div class="prompt">
                            <comp-input id="search"></comp-input>
                            <comp-button id="searchBtn"></comp-button>
                        </div>
                        <p><a href="#" class="help">Prompting Help</a></p>
                    </div>
                </div>
            </div>
        `;
    
    }

    createCSS(){

        const background = this.design.create({
            class: "background",
            display: "flex",
            flexDirection: "column",
            justifyContent: "centre",
            alignItems: "centre",
            width: "100%",
            minHeight: "100vh",
            background: "white",
        });

        const container = this.design.create({
            class: "container",
            display: "flex",
        });

        const modal = this.design.create({
            class: "modal",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            justifyContent: "centre",
            gap: 40,
            width: "100%",
            maxWidth: 900,
            padding: 20,
        });

        const head = this.design.create({
            class: "head",
            fontSize: 48,
            fontWeight: "bold",
            colour: "black100"
        });

        const prompt = this.design.create({
            const: "prompt",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            justifyContent: "centre",
            width: "100%",
            maxWidth: 860,
            borderRadius: 15,
            border: 2,
            overflow: "hidden",
            gap: 20,
            padding: 15,
            background: "black40"
        });

        const help = this.design.create({
            class: "help",
            fontSize: 14,
            TextDecoder: "underline",
            marginTop: 10,
            cursor: "pointer"
        });




        return /* css */`
            ${background}
            ${container}
            ${modal}
            ${head}
            ${prompt}
            ${help}
        `;
    
    }

    hook(){

        const prompt = this.shadowRoot.querySelector("#search"); 
        const btn    = this.shadowRoot.querySelector("#searchBtn");

        prompt.type   = "text";
        prompt.prompt = "e.g I want to live in a flat in London that is £2000 a month, has two bedrooms and one bathroom..."; 

        btn.text = "enter";

    
    }

}

customElements.define("comp-home", HomePage);