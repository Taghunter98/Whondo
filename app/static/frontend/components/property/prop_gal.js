import { Comp } from "jay-comp";

export class PropGal extends Comp {

    item_ = [];

    beforeRender(){
        this.items_ = [
      { id: 1, title: "Sample Property A", cover: "Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg", views: 25, postedAt: "2025-08-09T14:21:03Z" },
      { id: 2, title: "Sample Property B", cover: "Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg", views: 10, postedAt: "2025-08-10T10:05:12Z" },
      { id: 2, title: "Sample Property B", cover: "Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg", views: 10, postedAt: "2025-08-10T10:05:12Z" },
      { id: 2, title: "Sample Property B", cover: "Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg", views: 10, postedAt: "2025-08-10T10:05:12Z" },
      { id: 2, title: "Sample Property B", cover: "Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg", views: 10, postedAt: "2025-08-10T10:05:12Z" }
    ];
    }

    createHTML(){
        return /* html */`
            <div class="gallery">
                <div class="cards"></div>
            </div>
        `;
    }

    createCSS(){
        return [
            { class: "gallery",
                display: "flex",
                width: 1141,
                overflowX: "auto",
                padding: [20,20],
                scrollSnapType: "x mandatory",
                media:{
                    maxWidthBp: 600,
                    widthPercent: 100,
                }
            },
            { class: "cards",
                display: "flex",
                gap: 20
            }
        ];
    }

    renderCards(){
        const wrap = this.query(".cards");
        if (!wrap) return;
        wrap.innerHTML = "";

        const items = Array.isArray(this.items_) ? this.items_ : [];
        
        items.forEach(item => {
        const card = document.createElement("comp-landlord-card");
        card.id = item.id;
        card.title = item.title;
        card.cover = item.cover;
        card.views = item.views ?? 0;
        card.postedAt = item.postedAt;

        
        card.subscribe?.("property-edit",   (e) => this.publish("property-edit",   e.detail));
        card.subscribe?.("property-delete", (e) => this.publish("property-delete", e.detail));

        wrap.appendChild(card);
        });

        const addCard = document.createElement("comp-new-prop-card");
        addCard.subscribe?.("create-request", () => this.publish("create-request"));
        wrap.appendChild(addCard);
    }

    afterRender(){
        
        this.renderCards();
      
    }

    static { Comp.register(this); }

}