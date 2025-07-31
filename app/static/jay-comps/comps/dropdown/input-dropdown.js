import { Input } from "../inputs/input.js"; 

export class InputDropdown extends Input{

    list_ = []; strict_;

    set list(newList){
        if(!Array.isArray(newList)) return;
        this.list_ = newList;
        if(this.dropdown && this.inputEl){
            this.dropdown.setOptions(newList);
            this.dropdown.attachToInput(this.inputEl);
        }
    }

    set strict(flag){
        this.strict_ = flag;
        this.update();
    }

    get strict() { return this.strict_;}
    get list() { return this.list_;}

    beforeRender(){
      super.beforeRender();
      if (!this.strict_) this.strict_ = false;
    }

    createHTML() {
        return /* html */ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
           
            <div class="input-dropdown-wrapper">
                <input class="inputValue" type="${this.type}" placeholder="${this.prompt}">
                <comp-dropdown></comp-dropdown>
            </div> 
        </div>
        `;
    }

    createCSS(){
        const base = super.createCSS();

        const dropdown = {
            class: "input-dropdown-wrapper",
            widthPercent: 100,
           
        }
    
        return [base,dropdown,]

    }

    afterRender(){
        
        this.dropdown = this.query("comp-dropdown");
        this.inputEl = this.query(".inputValue");

        if(this.list_?.length > 0){
            this.dropdown.setOptions(this.list);
            this.dropdown.attachToInput(this.inputEl);
        }

        this.dropdown.addEventListener("option-selected", (e) => {
            if (e.detail.text) this.inputEl.value = e.detail.text;
            
            this.inputEl.classList.remove("error");
            this.dispatchEvent(new CustomEvent("option-selected", {
                detail: e.detail,
                bubbles: true,
                composed: true
            }));
            
        });

        this.inputEl.addEventListener("blur", () => {
            if (!this.strict_) return;
            const val = this.inputEl.value.trim();
            const match = this.list_.includes(val);

            if (!match) {
                this.inputEl.value = "";
                this.inputEl.classList.add("error");
                
            } else {
                this.inputEl.classList.remove("error");
            }
        });
    }
       
    static { super.register(this) };

}