import { Comp } from "jay-comp";

export class Step2 extends Comp {

    createHTML(){
        return /* html */`
            <div id="step2">
                <div class="textContainer">
                    <p class="text">Step 2/3</p>
                        <h4 class="title">Add Images</h4> 
                        <p class="text">Photos make your advert stand out. We recommend adding at least 8 clear images of your home. Most people view adverts on mobile devices, so vertical (portrait) photos work best.</p>
                </div>
                <div class="inputRowFile">
                    <comp-carousel>
                        <comp-file-card class="cover" id="cover"></comp-file-card>
                        <comp-file-card class="pic"></comp-file-card>
                        <comp-file-card class="pic">></comp-file-card>
                        <comp-file-card class="pic">></comp-file-card>
                        <comp-file-card class="pic">></comp-file-card>
                        <comp-file-card class="pic">></comp-file-card>
                        <comp-file-card class="pic">></comp-file-card>
                        <comp-file-card class="pic">></comp-file-card>
                        <comp-file-card class="pic">></comp-file-card>
                        <comp-file-card class="pic">></comp-file-card>
                    </comp-carousel>
                </div>
                <div class="footer">
                    <div class="btnRow">
                        <comp-button class="back" id="backBtn2" type="button"></comp-button>
                        <comp-button class="next" id="nextBtn2" type="button"></comp-button>
                    </div>
                </div>
            </div>

        
        `;
    }

    createCSS() {
        return [
            { class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 10,
            },
            { class: "title",
                fontWeight: "bold"
            },
            { class: "text",
                colourVar: "black60",
                display: "flex",
                alignSelf: "start",
                lineHeight: "normal"
            },
            { class: "inputRowFile",
                display: "flex",
                flexDirection: "row",
                gap: 10,
                padding: [20, 0, 20, 0],
                widthPercent: 100,
                justifyContent: "space-between",
                media: { maxWidthBp: 600, flexDirection: "column" }
            },
            { class: "btnRow",
                display: "flex",
                flexDirection: "row",
                gap: 20,
                widthPercent: 100,
                justifyContent: "space-between"
            },
            { class: "footer",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                gap: 20,
            },
            { class: "cover",
                borderRadius: 8,
                borderVar: "borderBlack",
            },
            { class: "error",
                border: ["solid", 2, "var(--red100)"],
            }
        ]

    }

    afterRender(){

    }

    static { Comp.register(this); } 

}