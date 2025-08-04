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

    createHTML() {
        return `
        
        `
    }
}