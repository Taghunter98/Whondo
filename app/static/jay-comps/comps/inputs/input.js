import { Comp } from "jay-comp";

export class Input extends Comp {

    label_    = "Label";
    type_     = "text";
    prompt_   = "Enter text";
    required_ = false;
    error_    = false;

    name_ = "Input";

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

    get label() {

        return this.label_;
    
    }

    get type() {

        return this.type_;
    
    }

    get prompt() {

        return this.prompt_;
    
    }

    get value() {

        return this.shadowRoot.querySelector("input, textarea").value;

    }

    get required(){

        return this.required_;
    
    }

    createHTML() {

        return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label_}</label>
            <input class="inputValue" type="${this.type_}" placeholder="${this.prompt_}">
        </div>
        `;
    
    }

    createCSS() {

        const inputContainer = this.css({
            class: "inputContainer",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            maxWidth: "none",
            padding: 0,
            alignItems: "start",
            gap: 10,
            background: "--white"
        });

        const input = this.css({
            class: "inputValue",
            display: "block",
            fontSize: 16,
            widthPercent: 100,
            padding: [8, 12],
            border: "border",
            borderRadius: 8,
            boxSizing: "border-box"
        });

        const inputHover = this.css({
            class: "inputValue",
            pseudoClass: "hover",
            outline: ["solid", 2, "var(--black60)"]
        });

        const inputActive = this.css({
            class: "inputValue",
            pseudoClass: "focus",
            outline: ["solid", 2, "var(--black100)"]
        });

        const statusRed = this.css({
            class: "error",
            borderBottom: ["solid", 2, "var(--red100)"]
        });

        const statusYellow = this.css({
            class: "warning",
            borderBottom: ["solid", 2, "var(--yellow100)"]
        });

        const statusGreen = this.css({
            class: "success",
            borderBottom: ["solid", 2, "var(--green100)"],
        });

        const hint = this.css({
            class: "hint",
            fontSize: "0.75rem",
            colour: "black",
            paddingTop: 4
        });

        return /* css */ `
        
        ${inputContainer}
        ${input}
        ${inputHover}
        ${inputActive}
        ${statusRed}
        ${statusYellow}
        ${statusGreen}
        ${hint}
        `;
    
    }

    isEmpty(){

        return !this.value.trim();
    
    }

    static {

        Comp.register(this);

    }

}

