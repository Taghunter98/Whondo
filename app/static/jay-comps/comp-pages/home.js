import { Comp } from "jay-comp";

export class Home extends Comp {
    cards = [];
    currentIndex = 0;

    createHTML() {
        return /* html */`
        <comp-navbar></comp-navbar>
            <div class="background">
            <div id="properties"></div>
            <h2 class="head">Describe your perfect home</h2>
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
                flexDirection: "column",
                justifyContent: "centre",
                alignItems: "centre",
                widthPercent: 100,
                height: "100dvh",
                overflow: "hidden",
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
                left: 0,
                right: 0,
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
                paddingBottom: 20,
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
            }
        ];
    }

    showCard() {
        const container = this.query("#properties");
        container.innerHTML = "";
        if (this.currentIndex < this.cards.length) {
            container.appendChild(this.cards[this.currentIndex]);
        } else {
            container.innerHTML = `<p>No more properties</p>`;
            this.cards = [];
            this.currentIndex = 0;
        }
    }

    nextCard() {
        this.currentIndex++;
        this.showCard();
    }

    afterRender() {
        this.subscribe("query-results", (e) => {
            const properties = e.detail;
            this.cards = properties.map(prop => {
                // Add prop card here
                const card = document.createElement("comp-prop-card");
                card.title = prop.title;
                card.profile = prop.landlord_info.profilePicture;
                card.landlord_name = prop.landlord_info.name + " " + prop.landlord_info.surname;
                card.price = prop.price;
                card.images = prop.images;
                card.email = prop.landlord_info.email;

                this.query(".head").classList.add("hide");
                this.query(".modal").classList.add("stick");
                if (screen.width < 800) {
                    this.query("comp-navbar").style.display = "none";
                }

                this.subscribe("card-dismiss", () => this.nextCard());
                requestAnimationFrame(() => {
                    card.query(".container").classList.add("in-view");
                })
                return card;
            });

            this.currentIndex++;
            this.showCard();
        })
    }

    static { Comp.register(this); }

}