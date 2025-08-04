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
            <h3 class="title">${this.title_}</h3>
            <p style="text-align: center">${this.text_}</p>
           
            <div style="width: 100%; height: auto; border-radius: 8px; overflow: hidden">
                <video 
                    autoplay 
                    muted 
                    loop 
                    playsinline 
                    style="width: 100%; height: 100%; object-fit: cover; border: none; object-fit: cover; clip-path: inset(1px 1px)"
                >
                <source src="https://www.whondo.com/static/icons/${this.video_}" type="video/mp4"> Your browser does not support the video tag.
                </video>
            </div>
        </div>
        `;
    }

    createCSS() {
        return [{
            class: "container",
            display: "flex",
            gap: 10,
            flexDirection: "column",
            widthPercent: 100,
            alignItems: "centre"
        },
        {
            class: "title",
            fontWeight: "bold"
        }];
    }

    static { Comp.register(this); }
}