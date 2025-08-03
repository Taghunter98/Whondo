import { Comp } from "jay-comp";

class Cards extends Comp {
    cards_ = {};

    set cards(v) {
        this.cards_ = v;
        this.update();
    }

    beforeRender() {
        if (!this.cards_) this.cards_ = {
            card1: {
                title: "This is a card",
                description: "Lorem ipsum dolor sit amet"
            },
            card2: {
                title: "This is a card",
                description: "Lorem ipsum dolor sit amet"
            },
            card3: {
                title: "This is a card",
                description: "Lorem ipsum dolor sit amet"
            },
        };
    }

    createHTML() {
        return /*html*/`
        <div class="container">
            <div class="card">
                <h5 class="header">${this.cards_.card1.title}</h5>
                <p>${this.cards_.card1.description}</p>
            </div>
            <div class="card">
                <h5 class="header">${this.cards_.card2.title}</h5>
                <p>${this.cards_.card2.description}</p>
            </div>
            <div class="card">
                <h5 class="header">${this.cards_.card3.title}</h5>
                <p>${this.cards_.card3.description}</p>
            </div>
        </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "container",
                display: "flex",
                gap: 10,
                widthPercent: 100,
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column"
                }
            },
            {
                class: "card",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 20,
                padding: 20,
                boxSizing: "border-box",
                borderRadius: 14,
                overflow: "hidden"
            },
            {
                class: "image",
                widthPercent: 100,
                heightPercent: 100,
                borderRadius: 14
            },
            {
                class: "header",
                fontWeight: "bold"
            },
            {
                class: "dark",
                colour: "white"
            }
        ]
    }

    static { Comp.register(this); }
}