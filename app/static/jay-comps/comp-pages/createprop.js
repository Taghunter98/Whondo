import { Comp } from 'jay-comp';

export class CreateProp extends Comp {

    createHTML() {

        return /* html */ `
        <div class="background">

            <div class="container">

                <div class="modal">

                    <form class="formObj" action="", method="POST" data-pg-verify>

                        <!-- Personal information -->
                        <div id="step1">
                            <div class="textContainer">
                                <p class="text">Step 1/3</p>
                                <h4 class="title">Property Details</h4>
                            </div>

                            <p class="text">Let’s create a beautiful advert, tell us about your home!</p>

                            <div class="input">
                                
                                <comp-address id="address" name="address" ></comp-address>
                                <comp-input id="title" name="title"></comp-input>
                                <div class="wrapper">
                                    <comp-input id="rent" name="rent"></comp-input>
                                    <p class="unit">p/m</p>
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

                        <!-- User personalisation  -->
                        <div id="step2" hidden >

                            <div class="textContainer">
                                <p class="text">Step 2/3</p>
                                <h4 class="title">Add Images</h4> 
                                <p class="text">The best adverts have great pictures, we recommend at least 8 to properly show off your home! Be mindful our users mostly use mobile! So we advise taking pictures in profile.</p>
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

                        <div id="step3" hidden>

                            <div class="textContainer">
                                <p class="text">Step 3/3</p>
                                <h4 class="title">Add Keywords</h4> 
                            </div>

                            <p class="text">Whondo works with a prompting system that uses keywords to help your property be noticed. We want to show your advert to as many people as possible, so add some keywords!</p>

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
                    </form>
                </div>
            </div>
            <div class="backgroundImage">
                <img class="image" src="https://images.pexels.com/photos/4569340/pexels-photo-4569340.jpeg">
            </div>
        </div>
        `;
    
    }

    createCSS(){

        return[
            { class: "background",
                widthPercent: 100,
                heightVh: 100,
                backgroundVar: "black100",     
                overflow: "hidden",
                media: {
                    maxWidthBp: 600,
                    height: 1000
                }      
            },
            { class: "formObj",
                widthPercent: 100,
            },
            { class: "container",
                display: "flex",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column",
                    alignItems: "centre"
                }
            },
            { class: "backgroundImage",
                widthPercent: 100,
                heightVh: 100,
                paddingLeft: 400,
                media: {
                    maxWidthBp: 600,
                    heightVh: 40,
                    margin: 0,
                    padding: 0
                }
            },
            { class: "image",
                widthPercent: 100,
                heightPercent: 100,
                objectFit: "cover"
            },
            { class: "modal",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                maxWidth: 500,  
                minWidth: 320,
                background: "white",
                position: "absolute",
                zIndex: 800,
                padding: 20,
                borderRadius: 14,
                marginLeft: 100,
                marginTop: 150,
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                    maxWidth: 350,
                    minWidth: 250,
                    margin: 0,
                    marginTop: 150,
                    boxSizing: "border-box"
                }
            },
            { class: "input",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 20,
                padding: [20, 0, 20, 0],
                media: {
                    maxWidthBp: 600,
                    padding: [10, 0, 20, 0],
                    gap: 15,
                } 
            },
            { class: "inputRow",
                display: "flex",
                flexDirection: "row",
                gap: 10,
                padding: [20, 0, 20, 0],
                widthPercent: 100,
                justifyContent: "space-between",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column"
                }
            },
            { class: "inputRowFile",
                display: "flex",
                flexDirection: "row",
                gap: 10,
                padding: [20, 0, 20, 0],
                widthPercent: 100,
                justifyContent: "space-between",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column"
                }
            },
            { class: "btnRow",
                display: "flex",
                flexDirection: "row",
                gap: 20,
                widthPercent: 100,
                justifyContent: "space-between"
            },
            { class: "title",
                fontWeight: "bold"
            },
            { class: "link",
                colourVar: "black80",
                fontWeight: "bold", 
                textDecoration: "underline",
                cursor: "pointer",
            },
            { class: "link",
                pseudoClass: "hover",
                colourVar: "black100",
            },
            { class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 10,
            },
            { class: "text",
                colourVar: "black60",
                display: "flex",
                alignSelf: "start",
                lineHeight: "normal"
            },
            { class: "footer",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                gap: 20,
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
            { class: "cover",
                borderRadius: 8,
                borderVar: "borderBlack",
            }
        ];   
        
    }

    afterRender(){
        const step1 = this.getById("step1");
        const step2 = this.getById("step2");
        const step3 = this.getById("step3")
        const address = this.getById("address");
        const title = this.getById("title");
        const rent = this.getById("rent");
        const description = this.getById("description");
        const keyword = this.getById("keywords");
        const backBtn = this.getById("backBtn");
        const backBtn2 = this.getById("backBtn2");
        const backBtn3 = this.getById("backBtn3");
        const nextBtn = this.getById("nextBtn");
        const nextBtn2 = this.getById("nextBtn2");
        const submit = this.getById("submit");
        const cover = this.getById("cover");
        const pic = this.queryAll(".pic")

        address.label = "Address";
        address.prompt = "Start typing your address";
        title.label = "Title";
        title.prompt = "10 Downing Street...";
        rent.label = "Rent";
        rent.prompt = "Enter a price...";
        description.label = "Property description";
        description.prompt = "Tell us about your home, be descriptive!";
        keyword.label = "Add keyword";
        keyword.prompt = "Choose 10 keywords..."
        backBtn.text = "Back";
        backBtn.variant = 2;
        backBtn2.text = "Back";
        backBtn2.variant = 2;
        backBtn3.text = "Back"
        backBtn3.variant = 2;
        nextBtn.text = "Next";
        nextBtn2.text = "Next";
        submit.text = "Finish";
        cover.prompt = "Add Cover";

       pic.forEach((el) => {
            el.prompt = "Add Photo";
        })

        nextBtn.addEventListener("click", ()=> {
            step1.setAttribute("hidden", "");
            step3.setAttribute("hidden", "");
            step2.removeAttribute("hidden")
        })

        nextBtn2.addEventListener("click", ()=> {
            step1.setAttribute("hidden", "");
            step2.setAttribute("hidden", "");
            step3.removeAttribute("hidden")
        })

         backBtn2.addEventListener("click", () => {
            step2.setAttribute("hidden", "");
            step3.setAttribute("hidden", "");
            step1.removeAttribute("hidden")
        })

         backBtn3.addEventListener("click", () => {
            step3.setAttribute("hidden", "");
            step1.setAttribute("hidden", "");
            step2.removeAttribute("hidden")
        })

    
}    
static { Comp.register(this); }

}