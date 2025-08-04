import { Comp } from "jay-comp";

class Video extends Comp {
    title_; text_; video_;

    set title(v) {
        this.title_ = v;
        this.update();
    }
    set text(v) {
        this.text_ = v;
        this.update();
    }
    set video(v) {
        this.video_ = v;
        this.update();
    }

    beforeRender() {
        if (!this.title_) this.title_ = "Title";
        if (!this.text_) this.text_ = "This is a description";
        if (!this.video_) this.video_ = "scroll.mp4";
    }

    createHTML() {
        return /*html*/`
        <div class="container">
            <div class="text-container">
                 <h3 class="title">${this.title_}</h3>
                <p style="text-align: center">${this.text_}</p>
            </div>
           
            <div>
                <video 
                    autoplay 
                    muted 
                    loop 
                    playsinline 
                    style="width: 100%; max-height: 700px; object-fit: fit; border: none; object-fit: cover; clip-path: inset(1px 1px)"
                >
                <source src="https://www.whondo.com/static/icons/assets/${this.video_}" type="video/mp4"> Your browser does not support the video tag.
                </video>
            </div>
        </div>
        `;
    }

    createCSS() {
        return [{
            class: "container",
            display: "flex",
            boxSizing: "border-box",
            gap: 20,
            flexDirection: "column",
            widthPercent: 100,
            alignItems: "centre",
            padding: 170
        },
        {
            class: "text-container",
            display: "flex",
            alignItems: "centre",
            flexDirection: "column",
            gap: 10,
            maxWidth: 700
        },
        {
            class: "title",
            fontWeight: "bold"
        }];
    }

    static { Comp.register(this); }
}