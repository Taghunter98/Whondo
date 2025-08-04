import { Comp } from "jay-comp";

export class Advertise extends Comp {

    createHTML() {
        return /* html */ `
    <comp-navbar></comp-navbar>
    <div class="background">
        <div class="block">
           <div class="hero">
            <div class="heroText">
                <h2 class="title">The New Way To Rent</h2>
                <p>We’re rethinking the way people rent. To make that work, your home needs to shine and we’ve designed Whondo to do exactly that. </p>
                <comp-button id="advertise"></comp-button>
            </div>
           <video 
                autoplay 
                muted 
                loop 
                playsinline 
                style="
                    width: 100%;
                    aspect-ratio: 1 / 1;
                    max-width: 600px;
                    max-height: 600px;
                    object-fit: cover;
                    border: none;
                    border-radius: 8px;
                    clip-path: inset(1px 1px);
                "
                >
                <source src="https://www.whondo.com/static/icons/assets/scroll.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>

           </div>
        </div>
        <div class="block">
            <comp-video id="prompt"></comp-video>
        </div>
         <div class="block">
            <comp-video id="viewer"></comp-video>
        </div>
        <div class="block dark footer">
            <h3 class="title white">How it Works</h3>
            <comp-cards id="cards-about"></comp-cards>
            <comp-modal id="list" style="padding-top: auto"></comp-modal>
        </div>
    </div>
    `;
    }

    createCSS() {
        return [
            {
                class: "background",
                heightVh: 100,
                overflowY: "auto",
                scrollSnapType: "y mandatory"
            },
            {
                class: "hero",
                display: "flex",
                alignItems: "centre",
                gap: 20
            },
            {
                class: "block",
                heightVh: 100,
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: "translateY(50px)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                willChange: "opacity, transform"
            },
            {
                class: "block--active",
                opacity: 1,
                transform: "translateY(0)"
            },
            {
                class: "heroText",
                display: "flex",
                maxWidth: 700,
                paddingLeft: 100,
                gap: 20,
                flexDirection: "column",
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
                class: "dark",
                backgroundVar: "black100"
            },
            {
                class: "white",
                colour: "white"
            },
            {
                class: "footer",
                boxSizing: "border-box",
                height: "auto",
                padding: 0,
                paddingTop: 50
            }
        ];
    }


    afterRender() {
        const advertise = this.getById("advertise");
        const prompt = this.getById("prompt");
        const viewer = this.getById("viewer");
        const cardsAbout = this.getById("cards-about");
        const list = this.getById("list");

        advertise.auto = true;
        advertise.text = "Advertise My Home"

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

        list.title = "Ready to List?";
        list.description = "Takes a few short minutes and we can get your home up and ready.";
        list.button = "Advertise My Home";
        list.image = "flowers.jpg";

        this.subscribe("modal-clicked", async () => {
            list.query("comp-button").loading = true;
            const res = await this.request("/verify/landlord", "POST");
            res.ok ? window.location.assign("/advert/new") : window.location.assign("/login");
        });
    }

    static { Comp.register(this); }
}