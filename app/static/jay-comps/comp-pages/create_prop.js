import { Comp } from 'jay-comp';

export class CreateProp extends Comp {
    createHTML() {
        return /* html */ `
        <comp-popup  id= popup style="display: none"></comp-popup>
        <comp-navbar></comp-navbar>
        <div class="background">
            <div class="container">
                <div class="modal">
                    <form class="formObj">
                        <!-- Personal information -->
                        <div id="step1">
                            <div class="textContainer">
                                <p class="text">Step 1/3</p>
                                <h4 class="title">Property Details</h4>
                            </div>
                            <p class="text">Let’s create your property advert. Start by telling us about your home.</p>

                            <div class="input">
                                <comp-address id="address" name="address" ></comp-address>
                                <comp-input id="title" name="title"></comp-input>
                                <div class="wrapper">
                                    <comp-input id="rent" name="rent"></comp-input>
                                    <p class="unit">p/m</p>
                                </div>
                                <div class="inputRow">
                                    <comp-input-dropdown id="propertyType" name="propType" disabled></comp-input-dropdown>
                                    <comp-input id="tenants" name="tennants"></comp-input>
                                </div>
                                <div class="inputRow">
                                    <comp-input id="bedrooms" name="bedrooms"></comp-input>
                                    <comp-input id="bathrooms" name="bathrooms"></comp-input>
                                </div>
                                <comp-textarea id="description" name="description"></comp-textarea>
                            </div>
                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn" type=button></comp-button>
                                    <comp-button class="next" id="nextBtn" type=button></comp-button>
                                </div>
                            </div>
                        </div>

                        <!-- User personalisation  -->
                        <div id="step2" hidden >
                            <div class="textContainer">
                                <p class="text">Step 2/3</p>
                                <h4 class="title">Add Images</h4> 
                                <p class="text">Photos make your advert stand out. We recommend adding at least 8 clear images of your home.
Most people view adverts on mobile devices, so vertical (portrait) photos work best.</p>
                            </div>
                             <div class="inputRowFile">
                                        <comp-carousel>
                                            <comp-file-card class="cover" id="cover"></comp-file-card>
                                            <comp-file-card class="pic"></comp-file-card>
                                            <comp-file-card class="pic">></comp-file-card>
                                            <comp-file-card class="pic">></comp-file-card>
                                            <comp-file-card class="pic">></comp-file-card>
                                            <comp-file-card class="pic">></comp-file-card>
                                            <comp-file-card class="pic">></comp-file-card>
                                            <comp-file-card class="pic">></comp-file-card>
                                            <comp-file-card class="pic">></comp-file-card>
                                            <comp-file-card class="pic">></comp-file-card>
                                        </comp-carousel>
                                </div>
                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn2" type="button"></comp-button>
                                    <comp-button class="next" id="nextBtn2" type="button"></comp-button>
                                </div>
                            </div>
                        </div>

                        <div id="step3" hidden>
                            <div class="textContainer">
                                <p class="text">Step 3/3</p>
                                <h4 class="title">Add Keywords</h4> 
                            </div>
                            <p class="text">To help people find your property, Whondo uses keywords. Add words that describe your home and its best features (like ‘garden’, ‘near a station, or ‘pets allowed).</p>
                             <div class="input">
                                <comp-keywords class="keywords" id="keywords" name="keywords" ></comp-keywords>
                            </div>
                            <div class="footer">
                                <div class="btnRow">
                                    <comp-button class="back" id="backBtn3" type="button"></comp-button>
                                    <comp-button class="submit" id="submit" type="submit"></comp-button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="backgroundImage">
                <img class="image" src="https://images.pexels.com/photos/5563472/pexels-photo-5563472.jpeg">
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
                media: {
                    maxWidthBp: 600,
                    height: 1250
                }
            },
            {
                class: "formObj",
                widthPercent: 100,
            },
            {
                class: "container",
                display: "flex",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column",
                    alignItems: "centre"
                }
            },
            {
                class: "backgroundImage",
                widthPercent: 100,
                height: 1050,
                paddingLeft: 400,
                media: {
                    maxWidthBp: 600,
                    heightVh: 40,
                    margin: 0,
                    padding: 0
                }
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
            {
                class: "input",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 20,
                padding: [20, 0, 20, 0],
                media: {
                    maxWidthBp: 600,
                    padding: [10, 0, 20, 0],
                    gap: 15,
                }
            },
            {
                class: "inputRow",
                display: "flex",
                flexDirection: "row",
                gap: 10,
                widthPercent: 100,
                justifyContent: "space-between",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column"
                }
            },
            {
                class: "inputRowFile",
                display: "flex",
                flexDirection: "row",
                gap: 10,
                padding: [20, 0, 20, 0],
                widthPercent: 100,
                justifyContent: "space-between",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column"
                }
            },
            {
                class: "btnRow",
                display: "flex",
                flexDirection: "row",
                gap: 20,
                widthPercent: 100,
                justifyContent: "space-between"
            },
            {
                class: "title",
                fontWeight: "bold"
            },
            {
                class: "link",
                colourVar: "black80",
                fontWeight: "bold",
                textDecoration: "underline",
                cursor: "pointer",
            },
            {
                class: "link",
                pseudoClass: "hover",
                colourVar: "black100",
            },
            {
                class: "textContainer",
                display: "flex",
                flexDirection: "column",
                widthPercent: 100,
                gap: 10,
            },
            {
                class: "text",
                colourVar: "black60",
                display: "flex",
                alignSelf: "start",
                lineHeight: "normal"
            },
            {
                class: "footer",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                widthPercent: 100,
                gap: 20,
            },
            {
                class: "wrapper",
                position: "relative",
                widthPercent: 100,
            },
            {
                class: "unit",
                position: "absolute",
                right: 14,
                top: "50%",
                fontSize: 14,
                colourVar: "black60",
                pointerEvents: "none",
            },
            {
                class: "cover",
                borderRadius: 8,
                borderVar: "borderBlack",
            },
            {
                class: "error",
                border: ["solid", 2, "var(--red100)"],
            }
        ];
    }

    validateStep1() {
        const inputs = [
            this.getById("address"),
            this.getById("title"),
            this.getById("rent"),
            this.getById("description"),
            this.getById("propertyType"),
            this.getById("tenants")
        ];
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
        const cover = this.getById("cover");
        const pics = Array.from(this.queryAll(".pic"));
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

        const keywords = this.getById("keywords");
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
        const keywords = this.getById("keywords").value;

        fd.append("title", this.getById("title").value);
        fd.append("price", this.getById("rent").value);
        fd.append("tennants", this.getById("tenants").value);
        fd.append("description", this.getById("description").value);
        fd.append("propType", this.getById("propertyType").value);
        fd.append("bedrooms", this.getById("bedrooms").value);
        fd.append("bathrooms", this.getById("bathrooms").value);
        fd.append("keywords", JSON.stringify(keywords));

        const addr = this.getById("address")?.fullAddress || {};

        fd.append("name", addr.name);
        fd.append("street", addr.street);
        fd.append("town", addr.town);
        fd.append("county", addr.county);
        fd.append("postcode", addr.postcode);

        const cover = this.getById("cover");
        const pics = this.queryAll(".pic");

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

        const result = await this.submitForm("https://whondo.com/advert/new", fd);

        if (result.ok) {
            const popup = this.getById("popup");
            popup.style.display = "block";
            popup.subscribe("popup-button", () => { window.location.assign("/"); }, { once: true });
        }

        else alert(result.error);
    }

    clearError(inputs) {
        const field = inputs.query(".inputValue");
        field.classList.remove("error");
    };

    afterRender() {

        const step1 = this.getById("step1");
        const step2 = this.getById("step2");
        const step3 = this.getById("step3")
        const address = this.getById("address");
        const title = this.getById("title");
        const rent = this.getById("rent");
        const tenants = this.getById("tenants");
        const description = this.getById("description");
        const propType = this.getById("propertyType");
        const bedrooms = this.getById("bedrooms");
        const bathrooms = this.getById("bathrooms");
        const keyword = this.getById("keywords");
        const backBtn = this.getById("backBtn");
        const backBtn2 = this.getById("backBtn2");
        const backBtn3 = this.getById("backBtn3");
        const nextBtn = this.getById("nextBtn");
        const nextBtn2 = this.getById("nextBtn2");
        const submit = this.getById("submit");
        const cover = this.getById("cover");
        const pic = this.queryAll(".pic")
        const keywords = this.getById("keywords")
    
        const popup = this.getById("popup");
        popup.title = "Advert Published!";
        popup.paragraph = "Congratulations! You can now view your new advert or monitor it in your Landlord portal.";
        popup.text = "Continue";
        const icon = popup.query(".icon");
        icon.style.display = "none";
        const btn = popup.query(".btn");
        btn.style.width = "125px";

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
        propType.list = [ { label: "House", value: "house" }, { label: "Flat", value: "flat" }, { label: "Studio", value: "studio" }, { label: "Bungalow", value: "bungalow" }, { label: "Bedsit", value: "bedsit" }, { label: "Maisonette", value: "maisonette" }, { label: "Shared House", value: "shared_house" }, { label: "Student Accommodation", value: "student_accommodation" }, { label: "Penthouse", value: "penthouse" },];
        propType.strict = true;
        keyword.list = [ { label: "House", value: "house" }, { label: "Flat", value: "flat" }, { label: "Bungalow", value: "bungalow" }, { label: "Studio", value: "studio" },
        { label: "Bedsit", value: "bedsit" }, { label: "Maisonette", value: "maisonette" }, { label: "Shared House", value: "shared_house" }, { label: "Student Accommodation", value: "student_accommodation" }, { label: "En Suite", value: "en_suite" }, { label: "Penthouse", value: "penthouse" },{ label: "Furnished", value: "furnished" }, { label: "Unfurnished", value: "unfurnished" }, { label: "Bills Included", value: "bills_included" }, { label: "All Inclusive", value: "all_inclusive" }, { label: "Double Room", value: "double_room" }, { label: "Single Room", value: "single_room" },{ label: "Balcony", value: "balcony" }, { label: "Garden", value: "garden" }, { label: "Parking", value: "parking" }, { label: "Pets Allowed", value: "pets_allowed" }, { label: "WiFi Included", value: "wifi_included" }, { label: "Utilities Included", value: "utilities_included" }, { label: "Short Let", value: "short_let" }, { label: "Long Let", value: "long_let" }, { label: "No Deposit", value: "no_deposit" },{ label: "Low Deposit", value: "low_deposit" }, { label: "DSS Accepted", value: "dss_accepted" }, { label: "Guarantor Required", value: "guarantor_required" }, { label: "No Guarantor", value: "no_guarantor" }, { label: "Student Friendly", value: "student_friendly" }, { label: "City Centre", value: "city_centre" },  { label: "Near University", value: "near_university" }, { label: "Close to Station", value: "close_to_station" }, { label: "Bus Route", value: "bus_route" }, { label: "Zone 1", value: "zone_1" }, { label: "Zone 2", value: "zone_2" }, { label: "Zone 3", value: "zone_3" }, { label: "Zone 4", value: "zone_4" }, { label: "Cycle Friendly", value: "cycle_friendly" },{ label: "LGBTQ+ Friendly", value: "lgbtq_friendly" }, { label: "Vegan Household", value: "vegan_household" }, { label: "Non Smoking", value: "non_smoking" }, { label: "Smoking Allowed", value: "smoking_allowed" },{ label: "Social House", value: "social_house" },{ label: "Quiet House", value: "quiet_house" },{ label: "Wheelchair Accessible", value: "wheelchair_accessible" },{ label: "Lift", value: "lift" },{ label: "Ground Floor", value: "ground_floor" },{ label: "Bike Storage", value: "bike_storage" }];

        description.label = "Property description";
        description.prompt = "Tell us about your home, be descriptive!";
        keyword.label = "Add keyword";
        keyword.prompt = "Choose some keywords..."
        backBtn.text = "Back";
        backBtn.fill = true;
        backBtn.variant = 2;
        backBtn2.text = "Back";
        backBtn2.fill = true;
        backBtn2.variant = 2;
        backBtn3.text = "Back"
        backBtn3.fill = true;
        backBtn3.variant = 2;
        nextBtn.text = "Next";
        nextBtn.fill = true;
        nextBtn2.text = "Next";
        nextBtn2.fill = true;
        submit.text = "Finish";
        submit.fill = true;
        cover.prompt = "Add Cover";

        pic.forEach((el) => el.prompt = "Add Photo");

        address.required = true;
        title.required = true;
        rent.required = true;
        description.required = true;
        propType.required = true;
        tenants.required = true;

        this.prevPropType = null;
        propType.subscribe("option-selected", (e) => {
            const keywords = this.getById("keywords");
            const selectedLabel = e.detail?.label;
            if (!selectedLabel || typeof keywords.addTag !== "function") return;
            const match = propType.list.find(opt => opt.label === selectedLabel);
            if (!match) return
            if (this.prevPropType && typeof keyword.removeTag === "function") {
                keywords.removeTag(this.prevPropType);
            }

            keywords.addTag(selectedLabel);
            this.prevPropType = match.value;
        })

        nextBtn.addEventListener("click", () => {
            if (this.validateStep1()) {
                step1.setAttribute("hidden", "");
                step3.setAttribute("hidden", "");
                step2.removeAttribute("hidden");
            }
        });

        nextBtn2.addEventListener("click", () => {
            if (this.validateStep2()) {
                step1.setAttribute("hidden", "");
                step2.setAttribute("hidden", "");
                step3.removeAttribute("hidden")
            }
        });

        backBtn2.addEventListener("click", () => {
            step2.setAttribute("hidden", "");
            step3.setAttribute("hidden", "");
            step1.removeAttribute("hidden")
        });

        backBtn3.addEventListener("click", () => {
            step3.setAttribute("hidden", "");
            step1.setAttribute("hidden", "");
            step2.removeAttribute("hidden")
        });

        submit.addEventListener("click", (e) => {
            const step1Valid = this.validateStep1();
            const step2Valid = this.validateStep2();
            const step3Valid = this.validateStep3();

            if (!step1Valid || !step2Valid || !step3Valid) e.preventDefault();
            else this.createProp()
        });

        const input = [address, title, rent, description, tenants, propType]
        input.forEach(inputs => inputs.addEventListener("input", () => this.clearError(inputs)));

        cover.subscribe("photo-uploaded", () => {
            if (cover.value) cover.classList.remove("error");
        });

        pic.forEach(picCard => {
            picCard.subscribe("photo-uploaded", () => {
                const box = picCard.query(".fileBox");
                if (picCard.value) box.classList.remove("error");
            });
        });
    }

    static { Comp.register(this); }
}