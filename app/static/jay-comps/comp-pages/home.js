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

            <div class="icon">
                <img class="img" src="app\static\icons\arrow_forward.png">
            </div>
        </div>

        `;
    }

    createCSS(){

    }

    afterRender(){

    }

     static  { Comp.register(this); }

}