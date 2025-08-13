import { Comp } from 'jay-comp';

export class UpdateProp extends Comp {
    pkaID_ = null; row_ = null; keywordsReady_ = false;

    createHTML() {
        return /* html */ `
        <comp-popup  id= "popup" style="display: none"></comp-popup>
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
                <img class="image" src="https://images.pexels.com/photos/16901229/pexels-photo-16901229.jpeg">
            </div>
        </div>
        `;

    }

    createCSS() {

        return [
            {
                class: "background",
                widthPercent: 100,
                height: 1300,
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
                heightPercent: 100,
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

    getParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    _fallback(v, d) { return (v === null || v === undefined) ? d : v; }

    hasPreview(card) {
        const preview = card?.query(".filePreview");
        return !!(preview && preview.src && !preview.hasAttribute("hidden"));
    }

    prefillStep1(row){
        const s1 = this.getById("step1");

        const t = s1.getById("title");
        if (t) t.query(".inputValue").value = row.title || "";

        const r = s1.getById("rent");
        if (r) r.query(".inputValue").value = this._fallback(row.price, "");

        const ten = s1.getById("tenants");
        if (ten) ten.query(".inputValue").value = this._fallback(row.tenants, "");

        const br = s1.getById("bedrooms");
        if (br) br.query(".inputValue").value = this._fallback(row.bedrooms, "");

        const ba = s1.getById("bathrooms");
        if (ba) ba.query(".inputValue").value = this._fallback(row.bathrooms, "");

        const d = s1.getById("description");
        if (d) d.query(".inputValue").value = row.description || "";

        const propType = s1.getById("propertyType");
        if (propType && Array.isArray(propType.list)) {
            const match = propType.list.find(o => String(o.value).toLowerCase() === String(row.propType).toLowerCase());
            if (match) {
            propType.value = match.value; 
            const inp = propType.query(".inputValue");
            if (inp) inp.value = match.label;
            }
        }

        const addr = s1.getById("address");
        if (addr) {
            const label = [row.propertyName, row.street, row.town, row.county, row.postcode].filter(Boolean).join(", ");
            const inp = addr.query(".inputValue");
            if (inp) inp.value = label;

            addr.fullAddress = {
            name: row.propertyName || "",
            street: row.street || "",
            town: row.town || "",
            county: row.county || "",
            postcode: row.postcode || ""
            };
        }
    }

    prefillStep2(row){
        const s2 = this.getById("step2");
        const cover = s2.getById("cover");
        const pics = Array.from(s2.queryAll(".pic"));
        const imgs = Array.isArray(row.images) ? row.images : [];

        const showPreview = (fileCard, relPath) => {
            if (!fileCard || !relPath) return;
            const url = `https://whondo.com/uploads?path=${relPath}`;

            const filePrompt = fileCard.query(".filePrompt");
            const icon = fileCard.query(".icon");
            const preview = fileCard.query(".filePreview");
            const container = fileCard.query(".imageContainer");

            if (filePrompt) filePrompt.setAttribute("hidden", "");
            if (icon) icon.setAttribute("hidden", "");
            if (container) container.removeAttribute("hidden");
            if (preview) {
            preview.src = url;
            preview.removeAttribute("hidden");
            }

            const box = fileCard.query(".fileBox") || fileCard;
            box.classList.remove("error");

            fileCard._selectedFile = null;
            fileCard._uploadedOnce = true;
            if (typeof fileCard.publish === "function") fileCard.publish("photo-uploaded");
        };

        if (imgs[0] && cover) showPreview(cover, imgs[0]);
            for (let i = 1; i < imgs.length && i <= pics.length; i++){
                showPreview(pics[i - 1], imgs[i]);
            }
    }
   
    prefillStep3(row){
        const s3 = this.getById("step3");
        const kw = s3.getById("keywords");
        if (!kw || !Array.isArray(kw.list)) return;

        const list = Array.isArray(row.all_keywords) ? row.all_keywords : [];
        list.forEach(value => {
            const opt = kw.list.find(o => o.value === value);
            if (opt && typeof kw.addTag === "function") kw.addTag(opt.label);
        });
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
        const step2 = this.getById("step2");
        const cover = step2?.getById?.("cover");
        const pics  = Array.from(step2?.queryAll?.(".pic") || []);
        let isValid = true;

        const coverOk = !!cover?.value || (cover && this.hasPreview(cover));
        const picsOk  = pics.some(p => p.value || this.hasPreview(p));
        const anyOk   = coverOk || picsOk;      

        const coverBox = cover?.query?.(".fileBox") || cover;

        coverBox?.classList?.remove("error");
        pics.forEach(p => (p.query?.(".fileBox") || p)?.classList?.remove("error"));

        if (!anyOk) {
            isValid = false;

            const coverVisible = cover && cover.offsetParent !== null;
            if (coverVisible && !coverOk) coverBox?.classList?.add("error");

            pics.forEach(p => {
            const box = p.query?.(".fileBox") || p;
            const visible = p.offsetParent !== null;
            if (visible && !(p.value || this.hasPreview(p))) box?.classList?.add("error");
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

    async UpdateProp() {
        const fd = new FormData();
        const step1 = this.getById("step1");
        const step2 = this.getById("step2");
        const step3 = this.getById("step3");
        const keywords = step3.getById("keywords").value;

        const pkaID = this.pkaID_ ?? this.getParam("pkaID");
        if (pkaID) fd.append("pkaID", pkaID);

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

        const result = await this.submitForm("/advert/update", fd);

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
        customElements.whenDefined("comp-update1").then(() => {
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

            backBtn.addEventListener("click", () => {
                window.location.assign("/profile/properties");
            });

            const input = [address, title, rent, description, tenants, propType]
            input.forEach(inputs => inputs.addEventListener("input", () => this.clearError(inputs)));

        });

        //Step2 set up
        const page2 = this.getById("page2")
        const step2 = this.getById("step2");
        customElements.whenDefined("comp-update2").then(() => {
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
                if (cover.value || this.hasPreview(cover)) {
                    (cover.query(".fileBox") || cover).classList.remove("error");
                }
            });

            pic.forEach(picCard => {
                picCard.subscribe("photo-uploaded", () => {
                    const box = picCard.query(".fileBox") || picCard;
                    if (picCard.value || this.hasPreview(picCard)) {
                    box.classList.remove("error");
                    }
                });
            });
        });

        //Step3 setup
        const page3 = this.getById("page3");
        const step3 = this.getById("step3");
        customElements.whenDefined("comp-update3").then(() => {
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

            this.keywordsReady_ = true;
            if (this.row_) this.prefillStep3(this.row_);

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
                else this.UpdateProp()
            });
        });

        const popup = this.getById("popup");
        popup.title = "Advert Updated!";
        popup.paragraph = "Congratulations! You can now view your new advert or monitor it in your Landlord portal.";
        popup.textLeft = "Continue";
        const icon = popup.query(".icon");
        icon.style.display = "none";
        const btn = popup.query(".left-btn");
        const btn2 = popup.query(".right-btn")
        btn2.style.display = "none";
        btn.style.width = "125px";
        btn.variant = 1;

        this.pkaID_ = this.getParam("pkaID");

        Promise.all([
            customElements.whenDefined("comp-update1"),
            customElements.whenDefined("comp-update1"),
            customElements.whenDefined("comp-update2"),
            customElements.whenDefined("comp-update3"),
            customElements.whenDefined("comp-input"),
            customElements.whenDefined("comp-textarea"),
            customElements.whenDefined("comp-input-dropdown"),
            customElements.whenDefined("comp-address"),
            customElements.whenDefined("comp-file-card"),
            customElements.whenDefined("comp-keywords"),
            ]).then(async () => {
            const res  = await this.request("https://whondo.com/advert/get", "GET");
            const rows = res.ok ? res.data?.results : null;
            if (!Array.isArray(rows)) return;

            const row = rows.find(r => String(r.pkaID) === String(this.pkaID_));
            if (!row) return;

            this.row_ = row;

            requestAnimationFrame(() => {
                this.prefillStep1(row);
                this.prefillStep2(row);
                if (this.keywordsReady_) this.prefillStep3(row);
            });
        });

    }
    

    static { Comp.register(this); }
}