import { Comp } from "jay-comp";

export class Home extends Comp {

    prompt_;

    set prompt(v){
        this.prompt_ = v;
        this.update();
    }

    get prompt() { return this.prompt_; }

    beforeRender(){
        if (!this.prompt_) this.prompt_ = "This is a placeholder"
    }

    createHTML(){
        return /* html */`
        
        <div class="container">
            <textarea name="" id="prompt" placeholder="${this.prompt}"></textarea>

            <div class="wrapper">
                <comp-icon class="icon" id="icon"></comp-icon>
            </div>
        </div>

        `;
    }

    createCSS(){
        return [
            {
                class: "container",
                display: "flex",
                

            }
        ]
    }

    afterRender(){
        const holder = this.getById("prompt");
        const icon = this.query("comp-icon");


        holder.prompt = "e.g I want to live in a flat in London that is £2000 a month, has two bedrooms and one bathroom...";
        icon.path = "arrow_forward.png";
    }

     static { Comp.register(this); }

}