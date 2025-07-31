import { Comp } from "jay-comp";

class Scroller extends Comp {
    cards_ = [];
    data_;
    currentIndex = 0;

    set data(c) {
        this.data_ = c;
        this.update();
    }

    beforeRender() {
        if (!this.data_) this.data_ = [];
    }

    createHTML() { return `<div id="stack"></div>`; }

    createCSS() {
        return [
            {
                class: "stack",
                position: "relative",
                widthPercent: 100,
                height: "100dvh",
                overflow: "hidden"
            }

        ];
    }

    showCard() {
        const stack = this.query("#stack");
        stack.innerHTML = "";

        const message = `
        <div class="no-properties">
            <h3 style="font-weight: bold; font-size: 24px;">No more properties :(</h3>
            <p>It's ok! Maybe try refining your prompt, the best way is to try and say it out loud trust me!</p>
        </div>
        `

        if (this.currentIndex < this.cards_.length) {
            const card = this.cards_[this.currentIndex];
            const c = card.query(".container");
            c.classList.remove("in-view", "out-view");

            stack.appendChild(card);

            requestAnimationFrame(() => {
                void c.offsetWidth;
                c.classList.add("in-view");
            });
        }

        else stack.innerHTML = message;
    }

    nextCard() { this.currentIndex++; this.showCard(); }

    afterRender() {
        this.cards_ = this.data_.map(prop => {

            // Card creation and setup
            const card = document.createElement("comp-prop-card");
            card.title = prop.title;
            card.profile = prop.landlord_info.profilePicture;
            card.landlord_name = prop.landlord_info.name + " " + prop.landlord_info.surname;
            card.price = prop.price;
            card.description = prop.description;
            card.images = prop.images;
            card.email = prop.landlord_info.email;
            card.keywords = prop.all_keywords;
            card.matched = prop.matched_keywords;

            // Subscribe to each cards event listener and add new class for animation
            this.subscribe("card-dismiss", () => this.nextCard());
            requestAnimationFrame(() => {
                card.query(".container").classList.add("in-view");
            })

            return card;
        });

        this.currentIndex++;
        this.showCard();
    }

    static { Comp.register(this); }
}