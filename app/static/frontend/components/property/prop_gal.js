import { Comp } from "jay-comp";

export class PropGal extends Comp {
    items_ = [];
    wheelBound_ = false;
    onWheel_ = null;

    set items(v) {
        this.items_ = v;
        this.update();
    }

    get items() {
        return this.items_;
    }

    /**
     * 
     * @param {json} row 
     * @returns a helper method that help to refine a data that return from a endpoint and add to a list and then use to create a card 
     */
    toCard(row) {
        return {
            adID: row.adID,
            pkaID: row.pkaID,
            title: row.title,
            cover: row.images?.[0] ? row.images[0] : "",
        };
    }

    async loadProperties() {
        const res = await this.request("https://whondo.com/advert/get", "GET");
        if (res.ok && Array.isArray(res.data?.results)) {
            this.items_ = res.data.results.map(r => ({
                ...this.toCard(r),
                row_: r,
            }));
            this.renderCards();
        } else {
            this.items_ = [];
            this.renderCards();
        }
    }

    createHTML() {
        return /* html */ `
            <div class="gallery">
                <div class="cards"></div>
            </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "gallery",
                display: "flex",
                width: 1141,
                maxWidthPercent: 100,
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                overscrollBehaviorX: "contain",
                paddingBottom: 20,
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                },
            },
            { class: "cards", display: "flex", gap: 20 },
        ];
    }

    /**
     * 
     * 
     * @returns  delete card from gallery and re-render a card that exist
     */
    deleteItem(pkaID) {
        if (!pkaID) return;
        this.items_ = this.items_.filter(
            x => String(x.pkaID) !== String(pkaID)
        );
        this.renderCards();
    }

    /**
     * This function take and items array and create a card and set the card data base on data request from advert/get and publish custom event with a payload data to use later 
     * 
     * @returns a list of card on the screen with the create prop-card
     * that all way on the right 
     */
    renderCards() {
        const wrap = this.query(".cards");
        if (!wrap) return;
        wrap.innerHTML = "";

        const items = Array.isArray(this.items_) ? this.items_ : [];

        items.forEach(item => {
            const card = document.createElement("comp-edit-card");
            card.adID = item.adID;
            card.pkaID = item.pkaID;
            card.title = item.title;
            card.cover = item.cover;

            card.subscribe?.("property-edit", (e) => {
            const detail = e?.detail || {};               
            this.publish("property-edit", { ...detail, row: item.row_ });
            });

            card.subscribe?.("property-delete", e =>
                this.publish("property-delete", e.detail)
            );

            wrap.appendChild(card);
        });

        const addCard = document.createElement("comp-new-prop-card");
        addCard.subscribe?.("create-request", () =>
            this.publish("create-request")
        );
        wrap.appendChild(addCard);
    }

    afterRender() {
        this.loadProperties();

        /**
         * allow mouse scroller to scroll through the gallery
         * and prevent browser scroll default when scroll in gallery
         */
        const scroller = this.query(".gallery");
        if (!scroller) return;
        requestAnimationFrame(() => {
            scroller.scrollLeft = scroller.scrollWidth;
        });

        if (!this.wheelBound_) {
            this.onWheel_ = e => {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    scroller.scrollBy({ left: e.deltaY, behavior: "smooth" });
                }
            };

            scroller.addEventListener("wheel", this.onWheel_, {
                passive: false,
            });
            this.wheelBound_ = true;
        }
    }

    static {
        Comp.register(this);
    }
}
