import { Comp } from "jay-comp"; 

export class Step3 extends Comp {

    createHTML(){
        return /* html */`
            <div id="step3" >
                <div class="textContainer">
                    <p class="text">Step 3/3</p>
                    <h4 class="title">Add Keywords</h4> 
                </div>
                <p class="text">To help people find your property, Whondo uses keywords. Add words that describe your home and its best features (like garden, near a station, or pets allowed).</p>
                <div class="input">
                    <comp-keywords class="keywords" id="keywords" name="keywords" ></comp-keywords>
                </div>
                <div class="footer">
                    <div class="btnRow">
                        <comp-button class="back" id="backBtn3" type="button"></comp-button>
                        <comp-button class="submit" id="submit" type="submit"></comp-button>
                    </div>
                </div>
            </div>
        `;
    }

    createCSS(){
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
            { class: "input",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 20,
                padding: [20, 0, 20, 0],
                media: { maxWidthBp: 600, padding: [10, 0, 20, 0], gap: 15,}
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
        ]
    }

    static { Comp.register(this); }
}