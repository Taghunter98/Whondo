import { Comp } from "jay-comp";

export class Advertise extends Comp {

    createHTML() {
        return /* html */ `
    <comp-navbar></comp-navbar>
    <div class="background">
        <div class="itemContainer">
            <div class="modal">
                <div class="textContainer">
                    <h3 class="title">Showcase Your Home the Smart Way</h3>
                    <p class="text">
                        Whondo gives your property the spotlight it deserves, no competition, just serious tenants.
                    </p>
                </div>
                <div class="buttons">
                    <comp-button id="continue"></comp-button>
                </div>
            </div>
            <div class="backgroundImage">
                <img class="image" src="https://images.pexels.com/photos/5623940/pexels-photo-5623940.jpeg">
            </div>
        </div>
        <div class="block">
            <div class="heroText">
                <h3 class="title">Why Whondo is Different</h3>
                <p>We’re rethinking the way people rent. To make that work, your home needs to shine and we’ve designed Whondo to do exactly that. <br><br>Our platform puts your property front and centre with a modern, sleek interface that’s built to impress.</p>
            </div>
        </div>
        <div class="block">
            <div style="width: 100%; height: auto; border-radius: 8px; overflow: hidden;">
                <video 
                    autoplay 
                    muted 
                    loop 
                    playsinline 
                    style="width: 100%; height: auto; object-fit: cover; border: none;"
                >
                    <source src="https://www.whondo.com/static/icons/scroll.mp4" type="video/quicktime">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </div>
    `;
    }

    createCSS() {
        const heroHeight = 800;
        return [
            {
                class: "background",
                widthPercent: 100,
                backgroundVar: "black100",
                height: heroHeight,
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
                height: heroHeight,
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
                marginTop: 150,
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
            },
            {
                class: "block",
                display: "flex",
                alignItems: "center",
                justifyContent: "centre",
                padding: [50, 100]
            },
            {
                class: "heroText",
                display: "flex",
                gap: 20,
                flexDirection: "column",
                widthPercent: 100,
                maxWidth: 500,
                alignItems: "centre"
            }
        ];
    }

    afterRender() {
        const cont = this.getById("continue");
        cont.text = "Get Started";

        cont.addEventListener("click", async () => {
            cont.loading = true;
            const res = await this.request("/verify/landlord", "POST");
            res.ok ? window.location.assign("/advert/new") : window.location.assign("/login");
        });
    }

    static { Comp.register(this); }
}