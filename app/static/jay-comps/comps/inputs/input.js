import { Comp } from "jay-comp";

export class Input extends Comp {

    label_ ;
    type_;
    prompt_;
    required_ ;
    error_;

    set label(newLabel) {

        this.label_ = newLabel;
        this.update();
    
    }

    set type(newType) {

        this.type_ = newType;
        this.update();
    
    }

    set prompt(newPrompt) {

        this.prompt_ = newPrompt;
        this.update();
    
    }

    set required (flag){

        this.required_ = flag;
        this.update();

    }

    get label() { return this.label_; }

    get type() { return this.type_; }

    get prompt() { return this.prompt_; }

    get value() {

        return this.shadowRoot.querySelector("input, textarea").value;

    }

    get required(){ return this.required_; }

    beforeRender(){
        if (!this.label_) this.label_ = "Label";
        if (!this. type_) this.type_ = "text";
        if (!this.prompt_) this.prompt_= "This is placeholder";
        if (!this.required_) this.required_ = false;
        if (!this.error_) this.error_ = false;
    }

    createHTML() {

        return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
            <input class="inputValue" type="${this.type}" placeholder="${this.prompt}">
        </div>
        `;
    
    }

    createCSS() {
        
        return [
            {
                class: "inputContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                maxWidth: "none",
                padding: 0,
                alignItems: "start",
                gap: 10,
                background: "white"
            },
            {
                class: "inputValue",
                display: "block",
                fontSize: 16,
                widthPercent: 100,
                padding: [8, 12],
                borderVar: "border",
                borderRadius: 8,
                boxSizing: "border-box"
            },
            {
                class: "inputValue",
                pseudoClass: "hover",
                outline: ["solid", 2, "var(--black60)"]
            },
            {
                class: "inputValue",
                pseudoClass: "focus",
                outline: ["solid", 2, "var(--black100)"]
            },
            {
                class: "error",
                borderBottom: ["solid", 2, "var(--red100)"]
            },
            {
                class: "warning",
                borderBottom: ["solid", 2, "var(--yellow100)"]
            },
            {
                class: "success",
                borderBottom: ["solid", 2, "var(--green100)"],
            },
            {
                class: "hint",
                fontSizeEm: 0.75,
                colour: "black",
                paddingTop: 4
            },
        ];
    }

    isEmpty(){ return !this.value.trim(); }

    static { Comp.register(this); }

}