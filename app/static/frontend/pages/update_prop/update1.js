import { Comp } from "jay-comp";

export class Update1 extends Comp {

    createHTML(){
        return /* html */`
            <div id="step1">
                <div class="textContainer">
                    <p class="text">Step 1/3</p>
                    <h4 class="title">Property Details</h4>
                </div>
                    <p class="text">Let’s create your property advert. Start by telling us about your home.</p>

                <div class="input">
                    <comp-address id="address" name="address" ></comp-address>
                    <comp-input id="title" name="title"></comp-input>
                    <div class="wrapper">
                        <comp-input id="rent" name="rent"></comp-input>
                        <p class="unit">p/m</p>
                    </div>
                    <div class="inputRow">
                        <comp-input-dropdown id="propertyType" name="propType" disabled></comp-input-dropdown>
                        <comp-input id="tenants" name="tennants"></comp-input>
                    </div>
                    <div class="inputRow">
                        <comp-input id="bedrooms" name="bedrooms"></comp-input>
                        <comp-input id="bathrooms" name="bathrooms"></comp-input>
                    </div>
                        <comp-textarea id="description" name="description"></comp-textarea>
                </div>
                <div class="footer">
                    <div class="btnRow">
                        <comp-button class="back" id="backBtn" type=button></comp-button>
                        <comp-button class="next" id="nextBtn" type=button></comp-button>
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
         { class: "wrapper",
            position: "relative",
            widthPercent: 100,
        },
        { class: "unit",
            position: "absolute",
            right: 14,
            top: "50%",
            fontSize: 14,
            colourVar: "black60",
            pointerEvents: "none",
        },
        { class: "input",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            gap: 20,
            padding: [20, 0, 20, 0],
            media: { maxWidthBp: 600, padding: [10, 0, 20, 0], gap: 15,}
        },
        { class: "inputRow",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            widthPercent: 100,
            justifyContent: "space-between",
            media: { maxWidthBp: 600, flexDirection: "column" }
        },
        { class: "footer",
            display: "flex",
            flexDirection: "column",
            alignItems: "centre",
            widthPercent: 100,
            gap: 20,
        },
        { class: "btnRow",
            display: "flex",
            flexDirection: "row",
            gap: 20,
            widthPercent: 100,
            justifyContent: "space-between"
        },
       ]
    }

    afterRender(){

    }

    static { Comp.register(this); }

}
