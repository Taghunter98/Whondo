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
        // Always emit a .stack container.  
        // If empty, we’ll show the “no properties” panel in afterRender.
        return /*html*/`<div class="stack"></div>`;
    }

    createCSS() {
        return [
            {
                class: "stack",
                height: "100dvh",
                widthPercent: 100,
                overflowY: "auto",
                scrollSnapType: "y mandatory",
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
                margin: 0,
                padding: 0
            },
            {
                class: "slide",                // ← renamed from “card”
                scrollSnapAlign: "start",
                height: "100dvh",
                widthPercent: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            {
                class: "no-properties",
                height: "100dvh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
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

        requestAnimationFrame(() => {
            card.querySelector(".container")?.classList.add("in-view");
        });

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

        // No cards? Show the “no properties” message
        if (this.cards_.length === 0) {
            const msg = document.createElement("div");
            msg.className = "no-properties";
            msg.innerHTML = `
        <h3>No more properties :(</h3>
        <p>Maybe try refining your prompt. Saying it out loud can help!</p>
      `;
            stack.appendChild(msg);
            return;
        }

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

        stack.addEventListener("touchstart", e => {
            startY = e.touches[0].clientY;
        }, { passive: true });

        stack.addEventListener("touchend", e => {
            const endY = e.changedTouches[0].clientY;
            const delta = startY - endY;
            // if they flick up more than 30px, go to next
            if (delta > 30) {
                this.nextCard();
            }
        }, { passive: true });
    }

    static { Comp.register(this); }
}
