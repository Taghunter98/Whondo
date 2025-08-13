import { Comp } from "jay-comp";

export class Carousel extends Comp {
    createHTML() {
        return /* html */ `
            <div class="carousel-container">
                <div class="carousel-box">
                    <comp-icon class="arrow left" part="arrow-left"></comp-icon>
                    
                    <div class="carousel-scroll">
                        <div class="carousel-track">
                            <slot></slot>
                        </div>
                    </div>

                    <comp-icon class="arrow right" part="arrow-right"></comp-icon>
                </div>

                <div class="carousel-counter">1 / 1</div>
            </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "carousel-container",
                widthPercent: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                gap: 8,
            },
            {
                class: "carousel-box",
                position: "relative",
                widthPercent: 100,
                display: "flex",
                alignItems: "centre",
                height: 387,
            },
            {
                class: "carousel-scroll",
                overflow: "hidden",
                flexGrow: 1,
            },
            {
                class: "carousel-track",
                display: "flex",
                transition: ["transform", "0.4s", "ease-in-out"],
                gap: 12,
                paddingLeft: 6,
                paddingRight: 6,
                boxSizing: "border-box",
            },
            {
                class: "carousel-track ::slotted(*)",
                flex: "0 0 50%",
                boxSizing: "border-box",
                display: "none",
            },
            {
                class: "arrow",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "centre",
                justifyContent: "centre",
                cursor: "pointer",
            },
            {
                class: "arrow.left",
                left: -16,
            },
            {
                class: "arrow.right",
                right: -16,
            },
            {
                class: "carousel-counter",
                fontSize: 14,
                marginTop: 4,
            },
        ];
    }
    /**
     * 
     * @param {number} direction 
     * @returns  track index of card that was carousel was on
     */
    slide(direction) {
        const visibleItems = this.items.filter(el => el.style.display !== "none");
        const newIndex = this.index + direction;
        if (newIndex < 0 || newIndex >= visibleItems.length) return;

        this.index = newIndex;
        this.updateView();
    }

    /**
     * 
     * @returns show slide animation then index change base on slide()
     */
    updateView() {
        const scrollBox = this.query(".carousel-scroll");
        const visibleItems = this.items.filter(el => el.style.display !== "none");
        const item = visibleItems[this.index];
        if (!item || !scrollBox) return;

        const scrollOffset = item.offsetLeft - this.offsetLeft;
        this.track.style.transform = `translateX(-${scrollOffset}px)`;
        this.counter.textContent = `${Math.min(this.index + 1, visibleItems.length)} / ${visibleItems.length}`;
    }

    afterRender() {
        this.track = this.query(".carousel-track");
        this.counter = this.query(".carousel-counter");

        const leftBtn = this.query(".arrow.left");
        const rightBtn = this.query(".arrow.right");
        const slot = this.query("slot");

        leftBtn.path = "arrow_back.svg";
        rightBtn.path = "arrow.svg";

        rightBtn.query("img").style.background = "var(--black100)";
        leftBtn.query("img").style.background = "var(--black100)";

        const updateItems = () => {
            this.items = slot.assignedElements() || [];
            this.index = 0;

            this.items.forEach((el, i) => {
                el.style.display = i === 0 ? "block" : "none";
            });

            this.updateView();
        };

        this.subscribe("photo-uploaded", () => {
            const next = this.items.find(el => el.style.display === "none" || getComputedStyle(el).display === "none");
            if (next) {
                next.style.display = "block";
                this.updateView();
            }
        })

        slot.addEventListener("slotchange", updateItems);
        updateItems();

        leftBtn.addEventListener("click", () => this.slide(-1));
        rightBtn.addEventListener("click", () => this.slide(1));
    }

    static { Comp.register(this); }
}