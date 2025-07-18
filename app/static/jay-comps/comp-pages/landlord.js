import { Comp } from 'jay-comp';

export class Landlord extends Comp {

    createHTML() {

        return /* html */ `
        <div class="background">

            <div class="container">

                <div class="modal">

                    <form class="formObj" action="", method="POST">

                        <!-- Personal information -->
                        <div id="step1">
                            <div class="textContainer">
                                <p class="text">Step 1/3</p>
                                <h4 class="title">Property Details</h4> 
                            </div>

                            <p class="text">Let’s create a beautiful advert, tell us about your home!</p>

                            <div class="input">
                                
                                <comp-input id="address" name="address"></comp-input>
                                <comp-input id="title" name="title"></comp-input>
                                <comp-input id="rent" name="rent"></comp-input>
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
                        <div id="step2" hidden>

                            <div class="textContainer">
                                <p class="text">Step 2/3</p>
                                <h4 class="title">Add Images</h4> 
                            </div>

                            <p class="text">The best adverts have great pictures, we recommend at least 8 to properly show off your home! Be mindful our users mostly use mobile! So we advise taking pictures in profile.</p>

                             <div class="inputRow">
                                <!-- new file comp for prop go here -->
                            </div>

                            <div class="footer">
                                <p id="count" class="count">1/10</p>
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn2" type="button"></comp-button>
                                    <comp-button class="submit" id="submit" type="submit"></comp-button>
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
                                <comp-input id="keyword" name="keyword"></comp-input>
                            </div>

                            <div class="footer">
                                <p id="count" class="count">1/10</p>
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn2" type="button"></comp-button>
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
            {
                class: "background",
                widthPercent: 100,
                minHeightVh: 100,
                backgroundVar: "black100",     
                overflow: "hidden",
                media: {
                    maxWidthBp: 600,
                    height: 1000
                }      
            },
            {
                class: "formObj",
                widthPercent: 100,
            },
            {
                class: "container",
                display: "flex",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column",
                    alignItems: "centre"
                }
            },
            {
                class: "backgroundImage",
                widthPercent: 100,
                height: 1000,
                paddingLeft: 400,
                media: {
                    maxWidthBp: 600,
                    heightVh: 40,
                    margin: 0,
                    padding: 0
                }
            },
            {
                class: "image",
                widthPercent: 100,
                heightPercent: 100,
                objectFit: "cover"
            },
            {
                class: "modal",
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
            {
                class: "input",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 20,
                padding: [20, 0, 40, 0],
                media: {
                    maxWidthBp: 600,
                    padding: [10, 0, 20, 0],
                    gap: 15,
                } 
            },
            {
                class: "inputRow",
                display: "flex",
                flexDirection: "row",
                gap: 15,
                widthPercent: 100,
                justifyContent: "space-between",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column"
                }
            },
            {
                class: "btnRow",
                display: "flex",
                flexDirection: "row",
                gap: 15,
                widthPercent: 100,
                justifyContent: "space-between"
            },
            {
                class: "title",
                fontWeight: "bold"
            },
            {
                class: "link",
                colourVar: "black80",
                fontWeight: "bold", 
                textDecoration: "underline",
                cursor: "pointer",
            },
            {
                class: "link",
                pseudoClass: "hover",
                colourVar: "black100",
            },
            {
                class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 5,
            },
            {
                class: "text",
                colourVar: "black60",
                display: "flex",
                alignSelf: "start",
            
            },
            {
                class: "footer",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                gap: 10,
            },
    
        ];   
        
    }

    static {

        Comp.register(this); 

    }

}