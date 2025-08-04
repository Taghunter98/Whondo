import { Comp } from "jay-comp";

export class Dropdown extends Comp {

    options_ = [];
    filtered_ = [];

    createHTML() {
        return /* html */ `
        <div class="dropdown-container">
            <div class="dropdown-list" hidden></div>
        </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "dropdown-container",
                widthPercent: 100,
            },
            {
                class: "dropdown-list",
                marginTop: 10,
                widthPercent: 100,
                background: "white",
                borderRadius: 8,
                border: "none",
                overflowY: "auto",
                maxHeight: 120,
                boxShadow: [0, 4, 23, 0, "rgba(0, 0, 0, 0.12)"],
                media: {
                    maxWidthBp: 600,
                    maxHeight: 120,
                }
            },
            {
                class: "dropdown-item",
                padding: [10, 14],
                fontSize: 14,
                borderBottomVar: "border",
                cursor: "pointer",
            },
            {
                class: "dropdown-item",
                pseudoClass: "hover",
                backgroundVar: "black10",
            },
        ];
    }

    /**
     * 
     * @param {String || object} options 
     * This function will set up the dropdown list it accept both normal list of sting or a object
     * and also assign to a filtered for lookup
     */
    setOptions(options) {
        this.options_ = (options || []).map(opt => typeof opt === "string" ? {label: opt, value: opt} : opt);
        this.filtered_ = [...this.options_]
        this.renderList();
    }

    resetDropdown() {
        this.filtered_ = [...this.options_]
        this.renderList();
        this.showDropdown();
    }

    /**
     * 
     * @param {HTMLElement} query 
     * This method filters the options based on the input query.
     * use for find the options that match the query.
     */
    filterOptions(query) {
        const q = query.toLowerCase();
        this.filtered_ = this.options_.filter(opt => opt.label.toLowerCase().includes(q));
        this.renderList();
        this.showDropdown();
    }

    renderList() {
        this.dropdownEl.innerHTML = this.filtered_
            .map(opt => `<div class="dropdown-item" data-value="${opt.value}">${opt.label}</div>`)
            .join("");
    }

    showDropdown() {
        this.dropdownEl.removeAttribute("hidden");
    }

    hideDropdown() {
        this.dropdownEl.setAttribute("hidden", "");
    }

    /**
     * 
     * @param {HTMLElement} input 
     * This method attaches the dropdown to an input element.
     * @example
     * const input = this.query(".inputValue");
     * const dropdown = this.query("comp-dropdown");
     * dropdown.attachToInput(input);
     * 
     */
    attachToInput(input) {
        this.inputEl = input;

        this.inputEl.addEventListener("click", () => { if (this.filtered_?.length > 0) this.resetDropdown() });
        this.inputEl.addEventListener("focus", () => this.filterOptions(this.inputEl.value));
        this.inputEl.addEventListener("input", () => this.filterOptions(this.inputEl.value));
        this.inputEl.addEventListener("blur", () => {
            setTimeout(() => this.hideDropdown(), 150);
        });
    }

    afterRender() {
        this.dropdownEl = this.query(".dropdown-list");

        /**
         * When the dropdown was selected emit a custom event for other comp to listen with a data in the payload
         * Label: what show on drop down
         * Value: real data that being send to back-end 
         */
        this.dropdownEl.addEventListener("click", (e) => {
            const item = e.target.closest(".dropdown-item");
            if (!item) return;

                const label = item.textContent;
                const value = item.dataset.value || label;

            this.publish("option-selected", {label,value});
               

            this.hideDropdown();
        });
    }

    static { Comp.register(this); }
}