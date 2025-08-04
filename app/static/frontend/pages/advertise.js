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
                <h1 class="title">Why Whondo is Different</h1>
                <p style="text-align: center">We’re redefining renting, giving every home the spotlight it deserves. Whondo is built to make yours shine.
            </div>
            <div style="width: 100%; height: auto; border-radius: 8px; overflow: hidden">
                <video 
                    autoplay 
                    muted 
                    loop 
                    playsinline 
                    style="width: 100%; height: 100%; object-fit: cover; border: none; object-fit: cover; clip-path: inset(1px 1px)"
                >
                <source src="https://www.whondo.com/static/icons/scroll.mp4" type="video/mp4"> Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <div class="block">
            <comp-cards id="cards-hero"></comp-cards>
        </div>
        <div class="block dark">
            <h3 class="title white">How it Works</h3>
            <comp-cards id="cards-about"></comp-cards>
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
                gap: 50,
                flexDirection: "column",
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
                maxWidth: 700,
                alignItems: "centre"
            },
            {
                class: "dark",
                backgroundVar: "black100"
            },
            {
                class: "white",
                colour: "white"
            }
        ];
    }

    afterRender() {
        const cont = this.getById("continue");
        const cardsHero = this.getById("cards-hero");
        const cardsAbout = this.getById("cards-about");

        cont.text = "Get Started";

        cardsHero.cards = {
            card1: {
                title: "Prompt-Based Searching",
                description: "Tenants describe what they’re looking for, we show them homes that match. No endless scrolling, no generic filters."
            },
            card2: {
                title: "Card-Style Viewing",
                description: "A clean, TikTok-style design makes each home feel like a feature, not just another listing. Your property gets the attention it deserves."
            },
            card3: {
                title: "One Viewer at a Time",
                description: "No competition. Just your home, viewed intentionally by a serious prospect."
            }
        }

        cardsAbout.query(".card").classList.add("dark");

        cardsAbout.cards = {
            card1: {
                title: "List your home",
                description: "Whondo gives your property the spotlight it deserves, no competition, just serious tenants."
            },
            card2: {
                title: "Renters find your home",
                description: "We use a keyword searching algorithm that allows for super fast property searching and a more personal touch. You control the keywords making your advert as engaging as you like."
            },
            card3: {
                title: "Receive enquiries via email",
                description: "Prospective renters will then be able to email you with an enquiry for a viewing."
            }
        }

        cont.addEventListener("click", async () => {
            cont.loading = true;
            const res = await this.request("/verify/landlord", "POST");
            res.ok ? window.location.assign("/advert/new") : window.location.assign("/login");
        });
    }

    static { Comp.register(this); }
}