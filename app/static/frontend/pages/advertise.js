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
                <img class="image" src="https://whondo.com/static/icons/assets/home_flowers.jpg">
            </div>
        </div>
        <div class="block">
            <div class="heroText">
                <h1 class="title">Why Whondo is Different</h1>
                <p style="text-align: center">We’re rethinking the way people rent. To make that work, your home needs to shine and we’ve designed Whondo to do exactly that. 
            </div>
            <div style="width: 100%; height: auto; border-radius: 8px; overflow: hidden">
                <video 
                    autoplay 
                    muted 
                    loop 
                    playsinline 
                    style="width: 100%; height: 100%; object-fit: cover; border: none; object-fit: cover; clip-path: inset(1px 1px)"
                >
                <source src="https://www.whondo.com/static/icons/assets/scroll.mp4" type="video/mp4"> Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <div class="block">
            <comp-video id="prompt"></comp-video>
        </div>
         <div class="block">
            <comp-video id="viewer"></comp-video>
        </div>
        <div class="block dark">
            <h3 class="title white">How it Works</h3>
            <comp-cards id="cards-about"></comp-cards>
        </div>
        <comp-modal></comp-modal>
    </div>
    `;
    }

    createCSS() {
        const heroHeight = 800;
        return [
            {
                keyframes: {
                    name: "blockSlideUp",
                    "0%": { opacity: 0, transform: "translateY(40px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" }
                }
            },
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
                justifyContent: "center",
                padding: [50, 100],
                opacity: 0,
                transform: "translateY(40px)",
                willChange: "opacity, transform",
                transition: "opacity 0.6s ease-out, transform 0.6s ease-out"
            },
            {
                class: "block-visible",
                animation: "blockSlideUp 0.6s ease-out forwards"
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
        const blocks = this.queryAll(".block");
        const prompt = this.getById("prompt");
        const viewer = this.getById("viewer");
        const cardsAbout = this.getById("cards-about");

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("block-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
            { threshold: 0.20 }
        );
        blocks.forEach((b) => observer.observe(b));


        prompt.title = "Prompt Based Searching";
        prompt.text = "Tenants tell us what they’re looking for, we show them homes that match. No endless scrolling. No generic filters. You just add a few keywords that describe your home, and our smart matching algorithm does the rest."
        prompt.video = "prompt.mp4";

        viewer.title = "One Viewer at a Time";
        viewer.text = "Our clean, scrollable interface makes every home feel like a feature, designed to stand out, not blend in. Your property gets the attention it deserves, one renter at a time."

        cardsAbout.dark = true;

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