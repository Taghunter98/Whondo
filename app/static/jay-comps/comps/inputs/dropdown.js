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
            { class: "dropdown-container",
                widthPercent: 100,
            },
            { class: "dropdown-list",
                marginTop: 10,
                widthPercent: 100,
                background: "white",
                borderRadius: 8,
                border: "none",
                overflowY: "auto",
                maxHeight: 160,
                boxShadow: [0, 4, 23, 0, "rgba(0, 0, 0, 0.12)"],
                media: {
                    maxWidthBp: 600,
                    maxHeight: 120,
                }
            },
            { class: "dropdown-item",
                padding: [10, 14],
                fontSize: 14,
                borderBottomVar: "border",
                cursor: "pointer",
            },
            { class: "dropdown-item",
                pseudoClass: "hover",
                backgroundVar: "black10",
            },
        ];
    }

    setOptions(options) {
        this.options_ = options || [];
        this.filtered_ = [...this.options_]
        this.renderList();
    }

    resetDropdown() {
        this.filtered_ = [...this.options_] 
        this.renderList();
        this.showDropdown();
    }

    filterOptions(query){
        const lower = query.trim().toLowerCase();
        this.filtered_ = this.options_.filter(opt => opt.toLowerCase().includes(lower));
        this.renderList();
        this.showDropdown();
    }

    renderList() {
        this.dropdownEl.innerHTML = this.filtered_
            .map(opt => `<div class="dropdown-item" data-value="${opt}">${opt}</div>`)
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

        this.inputEl.addEventListener("focus", () => this.resetDropdown());
        this.inputEl.addEventListener("click", () => this.resetDropdown());
        this.inputEl.addEventListener("input", () => this.filterOptions(this.inputEl.value));
        this.inputEl.addEventListener("blur", () => {
            setTimeout(() => this.hideDropdown(), 150);
        });
    }

    afterRender() {
        this.dropdownEl = this.query(".dropdown-list");

        this.dropdownEl.addEventListener("click", (e) => {
            const item = e.target.closest(".dropdown-item");
            if (!item) return;

            const text = item.dataset.value;

            this.dispatchEvent(new CustomEvent("option-selected", {
                detail: { text },
                bubbles: true,
            }));

            this.hideDropdown();
        });
    }

    static {
        Comp.register(this);
    }
}
