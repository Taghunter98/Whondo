import { Input } from "../inputs/input.js"; 

export class InputDropdown extends Input{

    list_;

    set list(newList){
        if(!Array.isArray(newList)) return;
        this.list_ = newList;
        if(this.dropdown && this.inputEl){
            this.dropdown.setOptions(newList);
            this.dropdown.attachToInput(this.inputEl);
        }
    }

    get list() { return this.list_};

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
        });
       
    }

    static { super.register(this) };

}