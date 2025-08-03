import { Comp } from "jay-comp";

export class Advertise extends Comp {

    createHTML() {
        return /* html */ `
    <comp-navbar></comp-navbar>
    <div class="background">
        <div class="itemContainer">
            <div class="modal">
                <div class="textContainer">
                    <div style="width: 100%; height: auto; border-radius: 8px; overflow: hidden;">
                        <video 
                            autoplay 
                            muted 
                            loop 
                            playsinline 
                            style="width: 100%; height: auto; object-fit: cover; border: none;"
                        >
                            <source src="https://www.whondo.com/static/icons/demo.mov" type="video/quicktime">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <h4 class="title">Showcase Your Home the Smart Way</h4>
                    <p class="text">
                        Whondo gives your property the spotlight it deserves.<br>
                        Unlike traditional rental platforms, we show your home to one prospective tenant at a time, so it never has to compete for attention.<br>
                        It’s a simple, effective way to make a great first impression and find the right renter faster.
                    </p>
                </div>
                <div class="buttons">
                    <comp-button id="back"></comp-button>
                    <comp-button id="continue"></comp-button>
                </div>
            </div>
            <div class="backgroundImage">
                <img class="image" src="https://images.pexels.com/photos/5623940/pexels-photo-5623940.jpeg">
            </div>
        </div>
    </div>
    `;
    }

    createCSS() {
        return [
            {
                class: "background",
                widthPercent: 100,
                backgroundVar: "black100",
                height: 1100,
                media: { maxWidthBp: 500, height: 1000 }
            },
            {
                class: "itemContainer",
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
                height: 1100,
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
                width: 500,
                background: "white",
                position: "absolute",
                zIndex: 800,
                padding: 20,
                borderRadius: 14,
                marginLeft: 100,
                marginTop: 100,
                media: {
                    maxWidthBp: 600,
                    boxsizing: "border-box",
                    width: "auto",
                    margin: 20,
                    marginTop: 150
                }
            },
            {
                class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 5
            },
            {
                class: "title",
                fontWeight: "bold"
            },
            {
                class: "text",
                colourVar: "black60"
            },
            {
                class: "buttons",
                display: "flex",
                widthPercent: 100,
                gap: 20,
                paddingTop: 40
            }
        ];
    }

    afterRender() {
        const cont = this.getById("continue");
        const back = this.getById("back");

        cont.text = "Continue";
        back.text = "Back";
        back.variant = 2;

        cont.addEventListener("click", () => {
            const res = this.request("https://whondo.com/verify/landlord", "POST");
            res.ok ? window.location.assign("/advert/new") : window.location.assign("/login");
            // Fire landlord API call
        });

        back.addEventListener("click", () => window.location.assign("/"));
    }

    static { Comp.register(this); }
}