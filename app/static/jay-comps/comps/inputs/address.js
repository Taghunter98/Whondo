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

    /**
     * This functions set the default dropdown options to an empty array and hides the dropdown.
     */
    defaultDropdown(){
        this.dropdown.setOptions([]);
        this.dropdown.hideDropdown();
    }

    /**
     * 
     * @param {HTMLElement} query 
     * This function check if the input query is less than 3 characters, it returns early. If not then fetches suggestions from the API.
     * It then gets the suggestions from the API and formats them into options for the dropdown.
     * 
     */
    async fetchSuggestions(query){

        const trimmed = query.trim();
        if (!trimmed || trimmed.length < 3) return;

        const formattedQuery = trimmed.toUpperCase();

        const key = "";
        const url = `https://api.getaddress.io/autocomplete/${encodeURIComponent(formattedQuery)}?api-key=${key}`;

        const res = await this.request(url, "GET");
        if (!res.ok){
            console.error("autocomplete error", res.error);
            this.defaultDropdown();
            return;
        }

        const suggestions = res.data?.suggestions || [];

        if (suggestions.length === 0) {
            this.defaultDropdown();
            return;
        }

        this.suggestionMap = new Map(suggestions.map(s => [s.address, s]));

        this.dropdown.setOptions(suggestions.map(s => s.address));
    }

    afterRender(){
        const input = this.query("input");
        this.dropdown = this.getById("dropdown");
        this.dropdown.attachToInput(input);

        input.addEventListener("input", () => {
            const query = input.value;
            this.fetchSuggestions(query);
        });

       this.dropdown.addEventListener("option-selected", async (e) => {
            const text = e.detail.text;
            const selected = this.suggestionMap.get(text);
            if (!selected) return;

            input.value = text;

            const key = "";
            const fullUrl = `https://api.getaddress.io/get/${encodeURIComponent(selected.id)}?api-key=${key}`;
            const fullRes = await this.request(fullUrl, "GET");

            if (!fullRes.ok) {
                console.error("full lookup error", fullRes.error);
                return;
            }

            const { county, postcode, line_1, town_or_city, district } = fullRes.data;

                this.fullAddress = {
                name: line_1,
                street: district, 
                town: town_or_city,
                county,
                postcode,
            };
        });
    }

    static { super.register(this); }
    
}