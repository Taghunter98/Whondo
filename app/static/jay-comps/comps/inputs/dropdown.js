import { Comp } from "jay-comp";

export class Dropdown extends Comp {

    options_ = [];

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
                borderVar: "border",
                overflowY: "auto",
                maxHeight: 160,
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
        this.renderList();
    }

    renderList() {
        this.dropdownEl.innerHTML = this.options_
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

        this.inputEl.addEventListener("focus", () => this.showDropdown());
        this.inputEl.addEventListener("click", () => this.showDropdown());
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
            this.inputEl.value = text;

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
