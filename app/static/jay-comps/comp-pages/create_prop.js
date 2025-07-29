import { Comp } from 'jay-comp';

export class CreateProp extends Comp {
    createHTML() {
        return /* html */ `
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
                            <p class="text">Let’s create a beautiful advert, tell us about your home!</p>

                            <div class="input">
                                <comp-address id="address" name="address" ></comp-address>
                                <comp-input id="title" name="title"></comp-input>
                                <div class="wrapper">
                                    <comp-input id="rent" name="rent"></comp-input>
                                    <p class="unit">p/m</p>
                                </div>
                                <comp-input id="tenants" name="tennants"></comp-input>
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
                                <p class="text">The best adverts have great pictures, we recommend at least 8 to properly show off your home! Be mindful our users mostly use mobile! So we advise taking pictures in profile.</p>
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
                            <p class="text">Whondo works with a prompting system that uses keywords to help your property be noticed. We want to show your advert to as many people as possible, so add some keywords!</p>
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
                <img class="image" src="https://images.pexels.com/photos/4569340/pexels-photo-4569340.jpeg">
            </div>
        </div>
        `;

    }

    createCSS() {

        return [
            {
                class: "background",
                widthPercent: 100,
                heightVh: 100,
                backgroundVar: "black100",
                overflow: "hidden",
                media: {
                    maxWidthBp: 600,
                    height: 1000
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
                heightVh: 100,
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
                padding: [20, 0, 20, 0],
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
        const address = this.getById("address");
        const title = this.getById("title");
        const rent = this.getById("rent");
        const description = this.getById("description");

        const inputs = [address, title, rent, description];
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
        if (uploadedPics.length < 3) {

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

        if (result.ok) this.update("<comp-published></comp-published>")
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
        const keyword = this.getById("keywords");
        const backBtn = this.getById("backBtn");
        const backBtn2 = this.getById("backBtn2");
        const backBtn3 = this.getById("backBtn3");
        const nextBtn = this.getById("nextBtn");
        const nextBtn2 = this.getById("nextBtn2");
        const submit = this.getById("submit");
        const cover = this.getById("cover");
        const pic = this.queryAll(".pic")

        address.label = "Address";
        address.prompt = "Enter your postcode";
        title.label = "Title";
        title.prompt = "10 Downing Street...";
        rent.label = "Rent";
        rent.prompt = "Enter a price...";
        tenants.label = "Tenants";
        tenants.prompt = "Enter number of current tenants..."

        description.label = "Property description";
        description.prompt = "Tell us about your home, be descriptive!";
        keyword.label = "Add keyword";
        keyword.prompt = "Choose 10 keywords..."
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
        cover.prompt = "Add Cover";

        pic.forEach((el) => el.prompt = "Add Photo");

        address.required = true;
        title.required = true;
        rent.required = true;
        description.required = true;

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

        const input = [address, title, rent, description,]
        input.forEach(inputs => inputs.addEventListener("input", () => this.clearError(inputs)));

        cover.addEventListener("photo-uploaded", () => {
            if (cover.value) cover.classList.remove("error");
        });

        pic.forEach(picCard => {
            picCard.addEventListener("photo-uploaded", () => {
                const box = picCard.query(".fileBox");
                if (picCard.value) box.classList.remove("error");
            });
        });
    }

    static { Comp.register(this); }
}