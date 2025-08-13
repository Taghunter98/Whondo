import { Comp } from "jay-comp";

export class EditCard extends Comp {
    adID_; pkaID_; title_; cover_; views_ = 0; postedAt_;

    set adID(v){ this.adID_ = v; }
    set pkaID(v){ this.pkaID_ = v;}
    set title(v){ this.title_ = v; this.update(); }
    set cover(v){ this.cover_ = v; this.update(); }


    beforeRender(){
        if (!this.title_) this.title_ = "Property Title";
        if (!this.cover_) this.cover_ = "Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg";
        if (!this.postedAt_) this.postedAt_ = new Date().toISOString();
    }


    createHTML(){
        return /*html*/`
        <div class="card">
            <div class="shade">
                <div class="info">
                    <h5 class="title">${this.title_}</h5>
                    <div class="meta">
                        <span>${this.views_} views</span>
                        <span>Posted ${this.fmtDate(this.postedAt_)}</span>
                    </div>
                    <div class="btns">
                        <comp-button id="del"></comp-button>
                        <comp-button id="edit"></comp-button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    createCSS(){
        const cardHeight = 550;
        return [
            { class: "card",
                display: "flex", 
                aspectRatio: "9 / 16", 
                flexDirection: "column",
                borderRadius: 14, 
                backgroundImageUrl: `https://whondo.com/uploads?path=${this.cover_}`,
                backgroundSize: "cover", 
                backgroundPosition: "centre", 
                cursor: "pointer",
                overflow: "hidden", 
                scrollSnapAlign: "start",
                transition: "transform 0.2s ease-in-out",
                maxHeight: cardHeight,
            },
            { class: "card", 
                pseudoClass: "hover", 
                transform: "scale(0.98)", 
            },
            { class: "shade", 
                marginTop: "auto", 
                widthPercent: 100,
                background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.85) 65%)" 
            },
            { class: "info", 
                display: "flex", 
                flexDirection: "column", 
                gap: 12, colour: "white", 
                padding: [20,16,16,16], 
            },
            { class: "title", 
                fontWeight: "bold",
                fontSize: 20 
            },
            { class: "meta", 
                display: "flex", 
                gap: 16, 
                opacity: .9, 
                fontSize: 12 
            },
            { class: "btns", 
                display: "flex", 
                gap: 20,
                width: 280,
                paddingTop: 6 
            }
        ];
    }

    afterRender(){
        const del = this.getById("del");
        const edit = this.getById("edit");
        del.text = "Delete";
        edit.text = "Edit";
        del.variant = 2;
        edit.variant = 2;
        del.fill = true;
        edit.fill = true;

        del.addEventListener("click", (e) => { e.stopPropagation(); this.publish("property-delete", {pkaID: this.pkaID_, adID: this.adID_ }); });

        edit.addEventListener("click", (e) => { e.stopPropagation(); this.publish("property-edit",   {pkaID: this.pkaID_, adID: this.adID_ }); });
    }

  static { Comp.register(this); }
}
