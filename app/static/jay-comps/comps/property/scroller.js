import { Comp } from "jay-comp";

class Scroller extends Comp {
    cards_ = [];
    currentIndex = 0;

    set cards(c) {
        this.cards_ = c || [];
        this.update();
    }

    beforeRender() {
        if (!this.cards_) this.cards_ = [];
    }

    createHTML() {
        return /*html*/`<div class="stack"></div>`;
    }

    createCSS() {
        return [
            {
                class: "stack",
                height: "100dvh",
                overflowY: "auto",
                scrollSnapType: "y mandatory",
                overscrollBehavior: "contain",
            },
            {
                class: "slide",
                scrollSnapAlign: "start",
                height: "100dvh",
                widthPercent: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }
        ];
    }

    buildCard(data) {
        const card = document.createElement("comp-prop-card");
        card.title = data.title;
        card.profile = data.landlord_info.profilePicture;
        card.landlord_name = `${data.landlord_info.name} ${data.landlord_info.surname}`;
        card.price = data.price;
        card.description = data.description;
        card.images = data.images;
        card.email = data.landlord_info.email;
        card.keywords = data.all_keywords;
        card.matched = data.matched_keywords;

        return card;
    }

    nextCard() {
        if (this.currentIndex < this.cards_.length - 1) {
            this.currentIndex++;
            const stack = this.query(".stack");
            const nextPanel = stack.children[this.currentIndex];
            nextPanel?.scrollIntoView({ behavior: "smooth" });
        }
    }

    afterRender() {
        const stack = this.query(".stack");
        stack.innerHTML = "";
        this.currentIndex = 0;

        // Build each card and append
        this.cards_.forEach((prop, index) => {
            const wrapper = document.createElement("div");
            wrapper.className = "slide";

            const cardEl = this.buildCard(prop);
            wrapper.appendChild(cardEl);
            stack.appendChild(wrapper);

            // Listen for each card's dismiss event to advance
            cardEl.addEventListener("card-dismiss", () => this.nextCard());
        });
    }

    static { Comp.register(this); }
}
