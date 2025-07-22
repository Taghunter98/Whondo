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

     slide(direction) {
        const newIndex = this.index + direction;
        if (newIndex < 0 || newIndex >= this.items.length) return;

        this.index = newIndex;
        this.updateView();
    }

    updateView() {
        const scrollBox = this.query(".carousel-scroll");
        const item = this.items[this.index];
        if (!item || !scrollBox) return;

        const scrollOffset = item.offsetLeft - this.offsetLeft;
        this.track.style.transform = `translateX(-${scrollOffset}px)`;
        this.counter.textContent = `${Math.min(this.index + 1, this.items.length)} / ${this.items.length}`;
    }


    afterRender() {
        this.track = this.query(".carousel-track");
        this.counter = this.query(".carousel-counter");

        const leftBtn = this.query(".arrow.left");
        const rightBtn = this.query(".arrow.right");
        const slot = this.query("slot");
        
        leftBtn.path = "arrow_back.svg";
        rightBtn.path = "arrow_forward.svg";

        const updateItems = () => {
            this.items = slot.assignedElements() || [];
            this.index = 0;
            this.updateView();
        };

        slot.addEventListener("slotchange", updateItems);
        updateItems();

        leftBtn.addEventListener("click", () => this.slide(-1));
        rightBtn.addEventListener("click", () => this.slide(1));
    }

    static { Comp.register(this); }
}
