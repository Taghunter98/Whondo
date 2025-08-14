import { Input } from "../inputs/input.js"; 

export class InputDropdown extends Input{

    list_ = []; strict_;

    set list(newList){
        if(!Array.isArray(newList)) return;
        this.list_ = newList.map(opt => typeof opt === "string" ? { label: opt, value: opt } : opt );
        if(this.dropdown && this.inputEl){
            this.dropdown.setOptions(newList);
            this.dropdown.attachToInput(this.inputEl);
        }
    }

    /**
     * Set a strict behaviour with this you can not type any thing
     * that are not match the drop down list
     */
    set strict(flag){
        this.strict_ = flag;
        this.update();
    }

    /**
     * find the word that match in the list when type it suggest
     */
    get value(){
        const inputVal = this.inputEl?.value?.trim();
        const match = this.list_?.find(opt => opt.label === inputVal);
        return match?.value || inputVal || "";
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

        this.dropdown.subscribe("option-selected", (e) => {
            this.inputEl.value = e.detail.label;
            
            this.inputEl.classList.remove("error");
            this.publish("option-selected", e.detail);
               
        });

        this.inputEl.addEventListener("blur", () => {
            if (!this.strict_) return;
            const val = this.inputEl.value.trim();
            const match = this.list_.some(opt => opt.label === val);

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