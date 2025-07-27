import { Input } from "./input.js";

export class Address extends Input {

    beforeRender(){
        super.beforeRender();
    }

    createHTML(){
         return /* html */ `
        <div class="inputContainer">
            
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
           
            <div class="input-dropdown-wrapper">
                <input class="inputValue input-tags" type="${this.type}" placeholder="${this.prompt}">
                <comp-dropdown id="dropdown"></comp-dropdown>
            </div> 
        </div>
        `;
    }

    createCSS() {
        const base = super.createCSS();

        const dropdown = {
            class: "input-dropdown-wrapper",
            widthPercent: 100,
        }

        return [base, dropdown,]
    }

   async fetchSuggestions(query) {
    const key = "live_sk_ionGFmbDpoJTNcGaJWUA9N"; // Or use your actual one

    console.log("Sending query:", query);

    const response = await fetch("https://api.postgrid.com/autocomplete/v1/addresses/suggest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": key,
        },
        body: JSON.stringify({ query }),
    });

    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Raw response text:", text);

    if (!response.ok) {
        console.error("PostGrid API error:", response.status);
        return;
    }

    let result;
    try {
        result = JSON.parse(text);
    } catch (e) {
        console.error("Failed to parse JSON:", e);
        return;
    }

    if (result?.data) {
        const options = result.data.map(item => ({
            label: item.fullAddress,
            value: item,
        }));

        this.addressMap = new Map(options.map(o => [o.label, o.value]));

        this.dropdown.setOptions(options.map(o => o.label));
    } else {
        console.warn("No data returned:", result);
    }
}

    afterRender(){
    
        this.dropdown = this.getById("dropdown");
        this.input = this.query("input")

        this.dropdown.attachToInput(this.input);

        this.input.addEventListener("input", () => {
            const query = this.input.value.trim();
            if (query.length >= 3) this.fetchSuggestions(query);
        });

       this.dropdown.addEventListener("option-selected", (e) => {
        const { text } = e.detail;

        this.input.value = text;

        this.fullAddress = this.addressMap?.get(text) || null;
});
    }

    static { super.register(this); }
    
}