import { Comp } from 'jay-comp';

export class UpdateProp extends Comp {
    createHTML() {
        return /* html */ `
        <comp-popup  id= popup style="display: none"></comp-popup>
        <comp-navbar></comp-navbar>
        <div class="background">
            <div class="container">
                <div class="modal">
                    <form class="formObj">
                        <div>
                            <!-- Property information -->
                            <div id="page1">
                            <comp-update1 id="step1"></comp-update1>
                            </div>
                            <!-- Photo upload  -->
                            <div id="page2" hidden>
                            <comp-update2 id="step2"></comp-update2>
                            </div>
                            <!-- Keywords section -->
                            <div id="page3" hidden>
                                <comp-update3 id="step3"></comp-update3>
                            </div>
                            <p id="result" style="text-align: center; padding-top: 10px"></p>
                        </div>
                    </form>
                </div>
            </div>
            <div class="backgroundImage">
                <img class="image" src="https://whondo.com/static/icons/assets/property.jpg">
            </div>
        </div>
        `;

    }

    createCSS() {

        return [
            {
                class: "background",
                widthPercent: 100,
                height: 1050,
                backgroundVar: "black100",
                overflow: "hidden",
                media: { maxWidthBp: 600, height: 1200, }
            },
            {
                class: "formObj",
                widthPercent: 100,
            },
            {
                class: "container",
                display: "flex",
                media: { maxWidthBp: 600, flexDirection: "column", alignItems: "centre" }
            },
            {
                class: "backgroundImage",
                widthPercent: 100,
                height: 1050,
                paddingLeft: 400,
                media: { maxWidthBp: 600, heightVh: 40, margin: 0, padding: 0 }
            },
            {
                class: "image",
                widthPercent: 100,
                heightPercent: 100,
                objectFit: "cover"
            },
            {
                class: "modal",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                maxWidth: 500,
                minWidth: 320,
                background: "white",
                position: "absolute",
                zIndex: 800,
                padding: 20,
                borderRadius: 14,
                marginLeft: 100,
                marginTop: 110,
                marginBottom: 50,
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                    maxWidth: 350,
                    minWidth: 250,
                    margin: 0,
                    marginTop: 150,
                    boxSizing: "border-box"
                }
            },
        ];
    }

    validateStep1() {
        const step1 = this.query("#step1")
        const inputs = [step1.getById("address"), step1.getById("title"), step1.getById("rent"), step1.getById("description"), step1.getById("propertyType"), step1.getById("tenants")];
        let isValid = true;

        for (let input of inputs) {
            if (input.required && input.isEmpty()) {
                input.query(".inputValue").classList.add("error");
                isValid = false;
            }
        }
        return isValid;
    }

    validateStep2() {
        const step2 = this.getById("step2")
        const cover = step2.getById("cover");
        const pics = Array.from(step2.queryAll(".pic"));
        let isValid = true;

        if (!cover.value) {
            cover.classList.add("error");
            isValid = false;
        } else {
            cover.classList.remove("error");
        }

        const uploadedPics = pics.filter(pic => pic.value);
        if (uploadedPics.length < 1) {

            isValid = false;

            pics.forEach(pic => {
                const box = pic.query(".fileBox")

                const isVisible = pic.offsetParent !== null;
                if (!pic.value && isVisible) {
                    box.classList.add("error");
                }
            });

        } else {
            pics.forEach(pic => {
                const box = pic.query(".fileBox");
                const isVisible = pic.offsetParent !== null;
                if (isVisible) box.classList.remove("error");
            });
        }

        return isValid;
    }

    validateStep3() {
        let isValid = true;
        const step3 = this.getById("step3")
        const keywords = step3.getById("keywords");
        const box = keywords.query(".inputValue");

        const selected = keywords.value || [];

        if (!Array.isArray(selected) || selected.length < 1) {
            box.classList.add("error");
            isValid = false;
        }

        return isValid;
    }

    async createProp() {
        const fd = new FormData();
        const step1 = this.getById("step1");
        const step2 = this.getById("step2");
        const step3 = this.getById("step3");
        const keywords = step3.getById("keywords").value;

        fd.append("title", step1.getById("title").value);
        fd.append("price", step1.getById("rent").value);
        fd.append("tennants", step1.getById("tenants").value);
        fd.append("description", step1.getById("description").value);
        fd.append("propType", step1.getById("propertyType").value);
        fd.append("bedrooms", step1.getById("bedrooms").value);
        fd.append("bathrooms", step1.getById("bathrooms").value);
        fd.append("keywords", JSON.stringify(keywords));

        const addr = step1.getById("address")?.fullAddress || {};

        fd.append("name", addr.name);
        fd.append("street", addr.street);
        fd.append("town", addr.town);
        fd.append("county", addr.county);
        fd.append("postcode", addr.postcode);

        const cover = step2.getById("cover");
        const pics = step2.queryAll(".pic");

        if (cover?.value) fd.append("images", cover.value);

        let i = 0;
        for (const pic of pics) {
            if (pic?.value) {
                const file = pic.value;
                const filename = file.name || `pic${i}.${file.type.split("/")[1] || "jpg"}`;
                fd.append("images", file, filename);
                i++;
            }
        }

        const result = await this.submitForm("https://whondo.com//advert/update", fd);

        if (result.ok) {
            const popup = this.getById("popup");
            popup.style.display = "block";
            popup.subscribe("popup-leftBtn", () => { window.location.assign("/"); }, { once: true });
        }

        else this.query("#result").innerHTML = result.error;
    }

    clearError(inputs) {
        const field = inputs.query(".inputValue");
        field.classList.remove("error");
    };

    afterRender() {
        //Step 1 setup
        const page1 = this.getById("page1")
        const step1 = this.getById("step1");
        customElements.whenDefined("comp-step1").then(() => {
            const address = step1.query("#address");
            const title = step1.getById("title");
            const rent = step1.getById("rent");
            const tenants = step1.getById("tenants");
            const description = step1.getById("description");
            const propType = step1.getById("propertyType");
            const bedrooms = step1.getById("bedrooms");
            const bathrooms = step1.getById("bathrooms");
            const backBtn = step1.getById("backBtn");
            const nextBtn = step1.getById("nextBtn");

            address.label = "Address";
            address.prompt = "Enter your postcode";
            title.label = "Title";
            title.prompt = "10 Downing Street...";
            rent.label = "Rent";
            rent.prompt = "Enter a price...";
            tenants.label = "Tenants";
            tenants.prompt = "Number of tenants"
            bedrooms.label = "Bedrooms";
            bedrooms.prompt = "Enter bedrooms";
            bedrooms.type = "number";
            bathrooms.label = "Bathrooms";
            bathrooms.prompt = "Enter bathrooms";
            bathrooms.type = "number";
            propType.label = "Property Type";
            propType.prompt = "Select from dropdown";
            propType.list = [{ label: "House", value: "house" }, { label: "Flat", value: "flat" }, { label: "Studio", value: "studio" }, { label: "Bungalow", value: "bungalow" }, { label: "Bedsit", value: "bedsit" }, { label: "Maisonette", value: "maisonette" }, { label: "Shared House", value: "shared_house" }, { label: "Student Accommodation", value: "student_accommodation" }, { label: "Penthouse", value: "penthouse" },];
            propType.strict = true;

            description.label = "Property description";
            description.prompt = "Tell us about your home, be descriptive!";
            backBtn.text = "Back";
            backBtn.variant = 2;
            backBtn.fill = true;
            nextBtn.text = "Next";
            nextBtn.fill = true;

            address.required = true;
            title.required = true;
            rent.required = true;
            description.required = true;
            propType.required = true;
            tenants.required = true;

            this.prevPropType = null;
            propType.subscribe("option-selected", (e) => {
                const step3 = this.getById("step3")
                const keywords = step3.getById("keywords");
                const selectedLabel = e.detail?.label;
                if (!selectedLabel || typeof keywords.addTag !== "function") return;
                const match = propType.list.find(opt => opt.label === selectedLabel);
                if (!match) return
                if (this.prevPropType && typeof keywords.removeTag === "function") {
                    keywords.removeTag(this.prevPropType);
                }

                keywords.addTag(selectedLabel);
                this.prevPropType = match.value;
            });

            nextBtn.addEventListener("click", () => {
                if (this.validateStep1()) {
                    page1.setAttribute("hidden", "");
                    page3.setAttribute("hidden", "");
                    page2.removeAttribute("hidden");
                }
            });

            const input = [address, title, rent, description, tenants, propType]
            input.forEach(inputs => inputs.addEventListener("input", () => this.clearError(inputs)));

        });

        //Step2 set up
        const page2 = this.getById("page2")
        const step2 = this.getById("step2");
        customElements.whenDefined("comp-step2").then(() => {
            const backBtn2 = step2.getById("backBtn2");
            const nextBtn2 = step2.getById("nextBtn2");
            const cover = step2.getById("cover");
            const pic = step2.queryAll(".pic")

            backBtn2.text = "Back";
            backBtn2.fill = true;
            backBtn2.variant = 2;
            nextBtn2.text = "Next";
            nextBtn2.fill = true;
            cover.prompt = "Add Cover";
            pic.forEach((el) => el.prompt = "Add Photo");

            backBtn2.addEventListener("click", () => {
                page2.setAttribute("hidden", "");
                step3.setAttribute("hidden", "");
                page1.removeAttribute("hidden")
            });

            nextBtn2.addEventListener("click", () => {
                if (this.validateStep2()) {
                    page1.setAttribute("hidden", "");
                    page2.setAttribute("hidden", "");
                    page3.removeAttribute("hidden")
                }
            });

            cover.subscribe("photo-uploaded", () => {
                if (cover.value) cover.classList.remove("error");
            });

            pic.forEach(picCard => {
                picCard.subscribe("photo-uploaded", () => {
                    const box = picCard.query(".fileBox");
                    if (picCard.value) box.classList.remove("error");
                });
            });
        });

        //Step3 setup
        const page3 = this.getById("page3");
        const step3 = this.getById("step3");
        customElements.whenDefined("comp-step3").then(() => {
            const backBtn3 = step3.getById("backBtn3");
            const submit = step3.getById("submit");
            const keyword = step3.getById("keywords")

            keyword.label = "Add keyword";
            keyword.prompt = "Choose some keywords..."
            backBtn3.text = "Back"
            backBtn3.fill = true;
            backBtn3.variant = 2;
            submit.text = "Finish";
            submit.fill = true;

            keyword.list = [
                { label: "House", value: "house" },
                { label: "Flat", value: "flat" },
                { label: "Bungalow", value: "bungalow" },
                { label: "Studio", value: "studio" },
                { label: "Bedsit", value: "bedsit" },
                { label: "Maisonette", value: "maisonette" },
                { label: "Shared House", value: "shared_house" },
                { label: "Student Accommodation", value: "student_accommodation" },
                { label: "En Suite", value: "en_suite" },
                { label: "Penthouse", value: "penthouse" },
                { label: "Furnished", value: "furnished" },
                { label: "Unfurnished", value: "unfurnished" },
                { label: "Bills Included", value: "bills_included" },
                { label: "All Inclusive", value: "all_inclusive" },
                { label: "Double Room", value: "double_room" },
                { label: "Single Room", value: "single_room" },
                { label: "Balcony", value: "balcony" },
                { label: "Garden", value: "garden" },
                { label: "Parking", value: "parking" },
                { label: "Pets Allowed", value: "pets_allowed" },
                { label: "WiFi Included", value: "wifi_included" },
                { label: "Utilities Included", value: "utilities_included" },
                { label: "Short Let", value: "short_let" },
                { label: "Long Let", value: "long_let" },
                { label: "No Deposit", value: "no_deposit" },
                { label: "Low Deposit", value: "low_deposit" },
                { label: "DSS Accepted", value: "dss_accepted" },
                { label: "Guarantor Required", value: "guarantor_required" },
                { label: "No Guarantor", value: "no_guarantor" },
                { label: "Student Friendly", value: "student_friendly" },
                { label: "City Centre", value: "city_centre" },
                { label: "Near University", value: "near_university" },
                { label: "Close to Station", value: "close_to_station" },
                { label: "Bus Route", value: "bus_route" },
                { label: "Zone 1", value: "zone_1" },
                { label: "Zone 2", value: "zone_2" },
                { label: "Zone 3", value: "zone_3" },
                { label: "Zone 4", value: "zone_4" },
                { label: "Cycle Friendly", value: "cycle_friendly" },
                { label: "LGBTQ+ Friendly", value: "lgbtq_friendly" },
                { label: "Vegan Household", value: "vegan_household" },
                { label: "Non Smoking", value: "non_smoking" },
                { label: "Smoking Allowed", value: "smoking_allowed" },
                { label: "Social House", value: "social_house" },
                { label: "Quiet House", value: "quiet_house" },
                { label: "Wheelchair Accessible", value: "wheelchair_accessible" },
                { label: "Lift", value: "lift" },
                { label: "Ground Floor", value: "ground_floor" }, { label: "Bike Storage", value: "bike_storage" }];

            backBtn3.addEventListener("click", () => {
                page3.setAttribute("hidden", "");
                page1.setAttribute("hidden", "");
                page2.removeAttribute("hidden")
            });

            submit.addEventListener("click", (e) => {
                const step1Valid = this.validateStep1();
                const step2Valid = this.validateStep2();
                const step3Valid = this.validateStep3();
                if (!step1Valid || !step2Valid || !step3Valid) e.preventDefault();
                else this.createProp()
            });
        });

        const popup = this.getById("popup");
        popup.title = "Advert Published!";
        popup.paragraph = "Congratulations! You can now view your new advert or monitor it in your Landlord portal.";
        popup.textLeft = "Continue";
        const icon = popup.query(".icon");
        icon.style.display = "none";
        const btn = popup.query(".left-btn");
        const btn2 = popup.query(".right-btn")
        btn2.style.display = "none";
        btn.style.width = "125px";
        btn.variant = 1;

    }

    static { Comp.register(this); }
}