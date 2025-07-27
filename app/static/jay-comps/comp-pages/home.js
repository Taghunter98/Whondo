import { Comp } from "jay-comp";

export class Home extends Comp {
    createHTML(){
        return /* html */`
        <div class="background">
            <div class="container">
                
                <h2 class="head">Describe your perfect home</h2>
                    
                <div class="modal">
                    <comp-promptbar></comp-promptbar>
                    <p><a href="#" class="help">Prompting Help</a></p>
                </div>
            </div>
        </div>
        `;
    }

    createCSS(){
        const slideUp = this.effect.slideUp(20)
        const prop1 = this.effect.prop("slideUp", .6, "ease-in-out")
     
        return [ 
            slideUp,
            { class: "background",
                display: "flex",
                flexDirection: "column",
                justifyContent: "centre",
                widthPercent: 100,
                height: 800,
                background: "white",
                media: {maxWidthBp: 600, justifyContent: "end", height: 650}
            },
            { class: "container",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                justifyContent: "centre",
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
                boxSizing: "border-box",
                media: {maxWidthBp: 600, gap: 10}
            },
            { class: "head",
                colourVar: "black100",
                textAlign: "centre",
                fontWeight: "bold",
                paddingBottom: 20,
                animation: prop1,
                media: { maxWidthBp: 600, fontSize: 24, paddingBottom: 0}
            },
            { class: "help",
                display: "flex",
                justifyContent: "centre",
                fontSize: 14,
                cursor: "pointer",
                colourVar: "black100"
            }
        ];
    }

    static { Comp.register(this); }

}