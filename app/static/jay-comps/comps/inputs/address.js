import { Input } from "./input.js";

export class Address extends Input {

    beforeRender(){
        super.beforeRender();
    }

    createHTML(){
        return /*html*/ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
            <div class="dropdown-wrapper">
                <input class="inputValue" type="${this.type}" placeholder="${this.prompt}">
                <comp-dropdown id="dropdown"></comp-dropdown>
            </div>
        </div>`;
    }

    createCSS(){
        const base = super.createCSS();

        const dropdown = {
            class: "dropdown-wrapper",
            widthPercent: 100,
        }

        return [base, dropdown,];
    }

    async fetchSuggestions(query){

        const trimmed = query.trim();
        if (!trimmed || trimmed.length < 3) return;

        const formattedQuery = trimmed.toUpperCase();

        const key = "s5OpFhhZzEeYG0I2F23bPA47115";
        const url = `https://api.getaddress.io/autocomplete/${encodeURIComponent(formattedQuery)}?api-key=${key}`;

        const res = await this.request(url, "GET");
        if (!res.ok){
            console.error("autocomplete error", res.error);
            this.dropdown.setOptions([]);
            this.dropdown.hideDropdown();
            return;
        }

        const suggestions = res.data?.suggestions || [];

        if (suggestions.length === 0) {
            this.dropdown.setOptions([]);
            this.dropdown.hideDropdown();
            return;
        }

         const options = suggestions.map(s => ({
            label: s.address,
            value: s,
        }));

        this.addressMap = new Map(options.map(o => [o.label, o.value]));
        this.dropdown.setOptions(options.map(o => o.label));
    }

    afterRender(){
        this.input = this.query("input");
        this.dropdown = this.getById("dropdown");
        this.dropdown.attachToInput(this.input);

         this.input.addEventListener("input", () => {
            const query = this.input.value;
            this.fetchSuggestions(query);
        });

        this.dropdown.addEventListener("option-selected", (e) => {
            const text = e.detail.text;
            this.input.value = text;
            this.fullAddress = this.addressMap.get(text) || {};
        });
    }

    static { super.register(this); }
    
}