import { Comp } from "jay-comp";

export class Home extends Comp {
    cards = [];
    currentIndex = 0;

    createHTML() {
        return /* html */`
        <comp-navbar></comp-navbar>
            <div class="background">
            <div id="properties"></div>
            <h2 class="head"><span id="typewriter"></span></h2>
            <div class="modal">
                <comp-promptbar></comp-promptbar>
            </div>
        </div>
        `;
    }

    createCSS() {
        const slideUp = this.effect.slideUp(20)
        const prop1 = this.effect.prop("slideUp", .6, "ease-in-out")

        return [
            slideUp,
            {
                heightPercent: 100,
                overflow: "hidden"
            },
            {
                class: "background",
                display: "flex",
                position: "fixed",
                top: 0, left: 0, right: 0, bottom: 0,
                justifyContent: "centre",
                alignItems: "centre",
                background: "white",
            },
            {
                class: "container",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                justifyContent: "centre",
            },
            {
                class: "modal",
                position: "absolute",
                widthPercent: 100,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 40,
                zIndex: 800,
                maxWidth: 900,
                margin: "0 auto",
                padding: 20,
                boxSizing: "border-box",
                transition: "bottom .4s ease-in-out",
                media: { maxWidthBp: 600, gap: 10 }
            },
            {
                class: "head",
                colourVar: "black100",
                textAlign: "centre",
                fontWeight: "bold",
                animation: prop1,
                media: { maxWidthBp: 600, fontSize: 24, paddingBottom: 0 }
            },
            {
                class: "hide",
                display: "none"
            },
            {
                class: "stick",
                position: "fixed",
                bottom: 0
            },
            {
                class: "help",
                display: "flex",
                justifyContent: "centre",
                fontSize: 14,
                cursor: "pointer",
                colourVar: "black100"
            },
            {
                class: "no-properties",
                background: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "centre",
                alignItems: "centre",
                maxWidth: 400,
                textAlign: "centre",
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                    height: "100dvh",
                }
            }
        ];
    }

    showCard() {
        const container = this.query("#properties");
        container.innerHTML = "";

        const message = `
        <div class="no-properties">
            <h3 style="font-weight: bold; font-size: 24px;">No more properties :(</h3>
            <p>It's ok! Maybe try refining your prompt, the best way is to try and say it out loud trust me!</p>
        </div>
        `

        if (this.currentIndex < this.cards.length) {
            const card = this.cards[this.currentIndex];
            const c = card.query(".container");
            c.classList.remove("in-view", "out-view");

            container.appendChild(card);

            requestAnimationFrame(() => {
                void c.offsetWidth;
                c.classList.add("in-view");
            });
        }

        else container.innerHTML = message;
    }

    nextCard() { this.currentIndex++; this.showCard(); }

    afterRender() {
        const el = this.query("#typewriter");
        const phrases = [
            "Describe your perfect home",
            "Where would it be?",
            "Flat, House, Bungalow?",
            "Less than £1000 a month?",
            "One or two bed?",
            "Near a train station or uni?",
            "Quiet, Pets, LGBTQ, Vegan?",
            "Let's find your dream home :)"
        ];
        let current = 0;

        const typePhrase = (phrase, i = 0) => {
            if (i <= phrase.length) {
                el.textContent = phrase.slice(0, i);
                setTimeout(() => typePhrase(phrase, i + 1), 30);
            } else {
                setTimeout(() => deletePhrase(phrase.length), 1200);
            }
        };

        const deletePhrase = (i) => {
            if (i >= 0) {
                el.textContent = el.textContent.slice(0, i);
                setTimeout(() => deletePhrase(i - 1), 30);
            } else {
                current = (current + 1) % phrases.length;
                setTimeout(() => typePhrase(phrases[current]), 500);
            }
        };

        typePhrase(phrases[current]);

        /**
         * Main property scrolling loop logic
         */
        this.subscribe("query-results", (e) => {
            const properties = this.query("#properties");
            properties.innerHTML = "";
            this.cards = [];
            this.currentIndex = 0;

            // Remove background elements and clean up UI
            this.query(".head").classList.add("hide");
            this.query(".modal").classList.add("stick");

            const scroller = document.createElement("comp-scroller");
            scroller.cards = e.detail;
            properties.appendChild(scroller);
        })
    }

    static { Comp.register(this); }
}