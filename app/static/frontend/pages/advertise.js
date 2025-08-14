import { Comp } from "jay-comp";

export class Advertise extends Comp {

    createHTML() {
        return /* html */ `
    <comp-navbar></comp-navbar>
    <div class="background">
        <div>
            
                 <div class="hero">
            <div class="heroText">
                <h2 class="title">Showcase Your Home the Smart Way</h2>
                <p>We’re rethinking the way people rent. To make that work, your home needs to shine and we’ve designed Whondo to do exactly that. </p>
            
            <comp-button id="get-started"></comp-button>
            </div>
            <div>
                 <video 
                autoplay 
                muted 
                loop 
                playsinline 
                class = "video"
                >
                <source src="https://www.whondo.com/static/icons/assets/scroll.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            </div>
           </div>
        </div>
    </div>
    `;
    }

    createCSS() {
        return [
            {
                class: "background",
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                heightVh: 100,
                media: {
                    maxWidthBp: 600
                }
            },
            {
                class: "hero",
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                gap: 20,
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column-reverse",
                    gap: 0
                }
            },
            {
                class: "heroText",
                display: "flex",
                maxWidth: 500,
                paddingLeft: 100,
                gap: 20,
                flexDirection: "column",
                media: {
                    maxWidthBp: 600,
                    paddingLeft: 20,
                    paddingRight: 20
                }
            },
            {
                class: "video",
                widthPercent: 100,
                aspectRatio: "1 / 1",
                maxEidth: 600,
                maxHeight: 600,
                objectFit: "cover",
                border: "none",
                borderRadius: 8,
                clipPath: "inset(1px 1px)",
                media: {
                    maxWidthBp: 600,
                    height: 280
                }
            },
            {
                class: "title",
                fontWeight: "bold",
                media: {
                    maxWidthBp: 600,
                    fontSize: 32,
                    lineHeight: "normal"
                }
            },
            {
                class: "text",
                colourVar: "black60"
            }
        ];
    }


    afterRender() {
        const btn = this.getById("get-started");
        btn.text = "Get Started";

        btn.addEventListener("click", async () => {
            btn.loading = true;
            const res = await this.request("/verify/landlord", "POST");
            res.ok ? window.location.assign("/advert/new") : window.location.assign("/login");
        });
    }

    static { Comp.register(this); }
}