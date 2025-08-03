import { Comp } from "jay-comp";

class Cards extends Comp {
    cards_ = {}; images_ = true;

    set cards(v) {
        this.cards_ = v;
        this.update();
    }
    set images(v) {
        this.images_ = v;
        this.update();
    }

    beforeRender() {
        const dummyImg = "https://whondo.com/uploads?path=Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg";
        if (!this.cards_) this.cards_ = {
            card1: {
                image: dummyImg,
                title: "This is a card",
                description: "Lorem ipsum dolor sit amet"
            },
            card2: {
                image: dummyImg,
                title: "This is a card",
                description: "Lorem ipsum dolor sit amet"
            },
            card3: {
                image: dummyImg,
                title: "This is a card",
                description: "Lorem ipsum dolor sit amet"
            },
        };
    }

    createHTML() {
        return /*html*/`
        <div class="container">
            <div class="card">
                <img class="image" src="${this.cards_ ? this.cards_.card1.image : ""}">
                <h4 class="header">${this.cards_.card1.title}</h4>
                <p>${this.cards_.card1.description}</p>
            </div>
              <div class="card">
                <img class="image" src="${this.cards_ ? this.cards_.card2.image : ""}">
                <h4 class="header">${this.cards_.card2.title}</h4>
                <p>${this.cards_.card2.description}</p>
            </div>
              <div class="card">
                <img class="image" src="${this.cards_ ? this.cards_.card3.image : ""}">
                <h4 class="header">${this.cards_.card3.title}</h4>
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
                gap: 20,
                padding: 20,
            },
            {
                class: "image",
                widthPercent: 100,
                heightPercent: 100,
                aspectRatio: "16 / 9",
                objectFit: "cover",
                borderRadius: 14
            },
            {
                class: "header",
                fontWeight: "bold"
            }
        ]
    }

    static { Comp.register(this); }
}