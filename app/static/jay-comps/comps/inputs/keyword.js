import { Input } from "./input.js";

export class Keywords extends Input {
    tags_ = [];
    validOptions_ = [];

    keywords = [
        "house",
        "flat",
        "bungalow",
        "studio",
        "bedsit",
        "maisonette",
        "shared_house",
        "student_accommodation",
        "en_suite",
        "penthouse",
        "furnished",
        "unfurnished",
        "bills_included",
        "all_inclusive",
        "double_room",
        "single_room",
        "balcony",
        "garden",
        "parking",
        "pets_allowed",
        "wifi_included",
        "utilities_included",
        "short_let",
        "long_let",
        "no_deposit",
        "low_deposit",
        "dss_accepted",
        "guarantor_required",
        "no_guarantor",
        "student_friendly",
        "city_centre",
        "near_university",
        "close_to_station",
        "bus_route",
        "zone_1",
        "zone_2",
        "zone_3",
        "zone_4",
        "cycle_friendly",
        "lgbtq_friendly",
        "vegan_household",
        "non_smoking",
        "smoking_allowed",
        "social_house",
        "quiet_house",
        "wheelchair_accessible",
        "lift",
        "ground_floor",
        "bike_storage"
    ];


    get value() {
        return this.tags_
    }

    beforeRender() {
        super.beforeRender();
    }

    createHTML() {
        return /* html */ `
        <div class="inputContainer">
            
            <label style="color: var(--black80); font-size: 14px">${this.label}</label>
           
            <div class="input-dropdown-wrapper">
                <input class="inputValue input-tags" type="${this.type}" placeholder="${this.prompt}">
                <comp-dropdown></comp-dropdown>
            </div> 
            
            <div class="keywords">
                <label style="color: var(--black80); font-size: 14px">My Keywords</label>
                <div class="tags"></div>
            </div>
        </div>
        `;
    }

    createCSS() {
        const base = super.createCSS();

        return [base,
            {
                class: "keywords",
                display: "flex",
                flexDirection: "column",
                maxWidth: 460,
                padding: 0,
                alignItems: "start",
                gap: 10,
                marginTop: 10,
                background: "white"
            },
            {
                class: "tags",
                display: "flex",
                flexWrap: "wrap",
                widthPercent: 100,
                gap: 10
            },
            {
                class: "tag",
                display: "flex",
                alignItems: "center",
                background: "white",
                padding: [8, 12],
                fontSize: 14,
                borderVar: "border",
                borderRadius: 8,
                gap: 10,
                boxSizing: "border-box",
                heighPercent: 100,
            },
            {
                class: "remove-btn",
                cursor: "pointer",
                fontSize: 16,
                colourVar: "black60",
                padding: 2,
            },
            {
                class: "input-dropdown-wrapper",
                widthPercent: 100,
            }
        ];
    }

    addTag(text) {
        if (this.tags_.length >= 10 || this.tags_.includes(text) || !this.validOptions_.includes(text)) return;

        this.tags_.push(text);

        this.inputEl?.classList.remove("error");

        const tagEl = document.createElement("div");
        tagEl.className = "tag";
        tagEl.textContent = text;

        const removeBtn = document.createElement("span");
        removeBtn.className = "remove-btn";
        removeBtn.title = "remove"

        const iconEl = document.createElement("comp-icon");
        iconEl.path = "close-black.svg"

        removeBtn.appendChild(iconEl);
        tagEl.appendChild(removeBtn);

        removeBtn.addEventListener("click", () => {
            this.tags_ = this.tags_.filter(tag => tag !== text);
            this.tagsEl.removeChild(tagEl);
        });

        this.tagsEl.appendChild(tagEl);
    }

    afterRender() {
        const dropdown = this.query("comp-dropdown");
        this.inputEl = this.query(".inputValue");
        this.tagsEl = this.query(".tags");

        this.validOptions_ = this.keywords;
        dropdown.setOptions(this.keywords)
        dropdown.attachToInput(this.inputEl);

        this.inputEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && this.inputEl.value.trim()) {
                e.preventDefault();
                this.addTag(this.inputEl.value.trim());
                this.inputEl.value = "";
            }
        });

        dropdown.addEventListener("option-selected", (e) => {
            if (e.detail.text) {
                this.addTag(e.detail.text);
                this.inputEl.value = "";
            }
        });

    }

    static { super.register(this); }
}