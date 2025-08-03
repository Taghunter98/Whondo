import { Input } from "../inputs/input.js";

export class Address extends Input {
    key = "dtoken_hEDzcyiWMr0wlL3ArWAbIjj-1cbI8XETKd4G5YEh5cPUwbvYq_4K5Y1eyhADhPZyfzU2sJaORWmDDVr6qrcxYusf4kWGtXgwtYzdKbEzbbx4bonGTIPvffGbiToGP6BMsZNwMOP2azOPPwrvlM2KhtbPt24KI_1W5HUCnaRGBTGSUzUIMaYjMZh3EN9EGMUyMogi7R2RMpY"; 

    beforeRender() {
        super.beforeRender();
    }

    createHTML() {
        return /*html*/ `
        <div class="inputContainer">
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
            <div class="dropdown-wrapper">
                <input class="inputValue" type="${this.type}" placeholder="${this.prompt}">
                <comp-dropdown id="dropdown"></comp-dropdown>
            </div>
        </div>`;
    }

    createCSS() {
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
    defaultDropdown() {
        this.dropdown.setOptions([]);
        this.dropdown.hideDropdown();
    }

    /**
     * 
     * @param {HTMLElement} query 
     * This function check if the input query is less than 3 characters, it returns early. If not then fetches suggestions from the API.
     * It then gets the suggestions from the API and formats them into options for the dropdown.
     * 
     * 
     */
    async fetchSuggestions(query) {
        const trimmed = query.trim();
        if (!trimmed || trimmed.length < 3) return;

        const formattedQuery = trimmed.toUpperCase();
        const url = `https://api.getaddress.io/autocomplete/${encodeURIComponent(formattedQuery)}?api-key=${this.key}`;

        const res = await this.request(url, "GET");
        if (!res.ok) {
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

        this.dropdown.setOptions(suggestions.map(s => ({label: s.address, value: s.address})));
    }

    
    afterRender() {
        const input = this.query("input");
        this.dropdown = this.getById("dropdown");
        this.dropdown.attachToInput(input);

        input.addEventListener("input", () => {
            const query = input.value;
            this.fetchSuggestions(query);
        });

        /**
        * When the dropdown have been click it listen to a custom event which it will then grab value the event emit and do a second fetch form the 
        * second api with another endpoint which allow us to grab a data in more detail and pass it 
        */
        this.dropdown.subscribe("option-selected", async (e) => {
            const addressText = e.detail?.value || e.detail?.label;
            if(!addressText)return;
            const selected = this.suggestionMap.get(addressText);
            if (!selected) return;

            input.value = addressText;

            const fullUrl = `https://api.getaddress.io/get/${encodeURIComponent(selected.id)}?api-key=${this.key}`;
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