import { Comp } from "jay-comp";

export class PropGal extends Comp {
    items_ = [];
    _wheelBound = false;
    _onWheel = null;

    set items(v) {
        this.items_ = v;
        this.update();
    }

    toCard(row) {
        return {
            adID: row.adID,
            pkaID: row.pkaID,
            title: row.title,
            cover: row.images?.[0] ? row.images[0] : "",
            views: 0,
            postedAt: new Date().toISOString(),
        };
    }

    async loadProperties() {
        const res = await this.request("https://whondo.com/advert/get", "GET");
        if (res.ok && Array.isArray(res.data?.results)) {
            this.items_ = res.data.results.map(r => this.toCard(r));
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
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                },
            },
            { class: "cards", display: "flex", gap: 20 },
        ];
    }

    deleteItem(pkaID) {
        if (!pkaID) return;
        this.items_ = this.items_.filter(
            x => String(x.pkaID) !== String(pkaID)
        );
        this.renderCards();
    }

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
            card.views = item.views ?? 0;
            card.postedAt = item.postedAt;

            card.subscribe?.("property-edit", e =>
                this.publish("property-edit", e.detail)
            );
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

        const scroller = this.query(".gallery");
        if (!scroller) return;
        requestAnimationFrame(() => {
            scroller.scrollLeft = scroller.scrollWidth;
        });

        if (!this._wheelBound) {
            this._onWheel = e => {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                    e.preventDefault();
                    scroller.scrollBy({ left: e.deltaY, behavior: "smooth" });
                }
            };

            scroller.addEventListener("wheel", this._onWheel, {
                passive: false,
            });
            this._wheelBound = true;
        }
    }

    static {
        Comp.register(this);
    }
}
