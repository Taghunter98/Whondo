import { Comp } from "jay-comp";

class PropCard extends Comp {
    read_ = false;
    title_; profile_; landlord_name_; price_; images_; email_; description_;
    keywords_; matched_;

    set read(v) {
        this.read_ = v;
    }
    set title(v) {
        this.title_ = v;
        this.update();
    }
    set profile(v) {
        this.profile_ = v;
        this.update();
    }
    set landlord_name(v) {
        this.landlord_name_ = v;
        this.update();
    }
    set price(v) {
        this.price_ = v;
        this.update();
    }
    set images(v) {
        this.images_ = v;
        this.update();
    }
    set email(v) {
        this.email_ = v;
        this.update();
    }
    set description(v) {
        this.description_ = v;
        this.update();
    }
    set keywords(v) {
        this.keywords_ = v;
        this.update();
    }
    set matched(v) {
        this.matched_ = v;
        this.update();
    }

    beforeRender() {
        if (!this.title_) this.title_ = "This is a title";
        if (!this.landlord_name_) this.landlord_name_ = "Josh Bassett";
        if (!this.images_) this.images_ = ["Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg"];
        if (!this.price_) this.price_ = 1000;
        if (!this.email_) this.email_ = "jb@vmi.tv";
        if (!this.description_) this.description_ = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        if (!this.keywords_) this.keywords_ = [];
        if (!this.matched_) this.matched_ = [];
    }

    createHTML() {
        const profile = this.profile_
            ? `"https://whondo.com/uploads?path=${this.profile_}"`
            : "https://whondo.com/static/icons/Profile.png";

        return /*html*/`
        <div class="container">

            <div class="card">
                <div class="info">
                    <h5 style="font-weight: bold; font-size: 24px">${this.title_}</h5>
                    <!-- Add check for default later -->
                    <div class="card-elements">
                        <div class="landlord">
                            <img class="profile" src="${profile}">
                            <p>${this.landlord_name_}</p>
                        </div>
                        <h6 style="font-weight: bold">£${this.price_}</h6>
                    </div>
                </div>
            </div>
            <div class="details">
                <h4 style="font-weight: bold;">${this.title_}</h4>
                    <div class="card-elements">
                    <div class="landlord">
                        <img class="profile" src="${profile}">
                        <p>${this.landlord_name_}</p>
                    </div>
                    <h6 style="font-weight: bold">£${this.price_}</h6>
                </div>
                <div class="description">
                    <p>${this.description_}</p>
                </div>
                <p>Images</p>
                <div class="images"></div>
                <p>Keywords</p>
                <div class="keywords"></div>
                <div class="card-buttons">
                    <comp-button id="email-desk" style="padding-top: 20px"></comp-button>
                </div>
            </div>
        </div>
        <div class="details-mob">
            <div class="mob-header">
                <h5 style="font-weight: bold;">${this.title_}</h5>
                <comp-close-icon id="close"></comp-close-icon>
            </div>
            <div class="card-elements">
            <div class="landlord">
                <img class="profile" src="${profile}">
                <p>${this.landlord_name_}</p>
            </div>
            <h6 style="font-weight: bold">£${this.price_}</h6>
            </div>
            <div class="description">
                <p>${this.description_}</p>
            </div>
            <p>Images</p>
            <div id="mob-images" class="images"></div>
            <p>Keywords</p>
            <div id="mob-keywords" class="keywords"></div>
            <div class="card-buttons">
                <comp-button id="email" style="padding-top: 20px"></comp-button>
            </div>
        </div>
        `
    }

    createCSS() {
        return [
            {
                class: "container",
                maxWidth: "100%",
                display: "flex",
                transition: "transform 0.4s ease-in-out, opacity 0.4s ease-in-out",
                media: {
                    maxWidthBp: 600,
                    width: "100vw",
                    padding: 0
                }
            },
            {
                class: "card",
                display: "flex",
                aspectRatio: "9 / 16",
                flexDirection: "column",
                backgroundVar: "black100",
                maxHeight: 570,
                borderRadius: 14,
                backgroundImageUrl: `https://whondo.com/uploads?path=${this.images_[0]}`, backgroundSize: "cover",
                transition: "transform 0.2s ease-in-out",
                willChange: "transform",
                cursor: "pointer",
                media: {
                    maxWidthBp: 600,
                    width: "100vw",
                    height: "100dvh",
                    maxHeight: "none",
                    aspectRatio: "none",
                    borderRadius: 0
                }
            },
            {
                class: "card",
                pseudoClass: "hover",
                transform: "scale(0.95)",
            },
            {
                class: "details",
                visibility: "hidden",
                width: 0,
                maxWidth: 500,
                opacity: 0,
                maxHeight: 570,
                overflow: "scroll",
                transform: "translateY(20px)",
                transition: "opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease",
                padding: [0, 20, 0, 20],
                media: {
                    maxWidthBp: 600,
                    display: "none"
                }
            },
            {
                class: "show-details",
                visibility: "visible",
                widthPercent: 100,
                opacity: 1,
                transform: "translateY(0)"
            },
            {
                class: "info",
                marginTop: "auto",
                boxSizing: "border-box",
                padding: [20, 20, 40, 20],
                borderRadius: [0, 0, 14, 14],
                colour: "white",
                widthPercent: 100,
                borderBottom: 50,
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.90) 65.57%)",
                media: {
                    maxWidthBp: 600,
                    borderRadius: 0,
                    paddingBottom: 120
                }
            },
            {
                class: "card-elements",
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 15
            },
            {
                class: "landlord",
                display: "flex",
                alignItems: "centre",
                widthPercent: 100,
                gap: 10
            },
            {
                class: "profile",
                width: 40,
                height: 40,
                borderVar: "border",
                background: "white",
                borderRadiusPercent: 50,
            },
            {
                class: "description",
                display: "flex",
                padding: 10,
                backgroundVar: "black10",
                borderVar: "border",
                borderRadius: 8,
                marginTop: 20
            },
            {
                class: "images",
                display: "flex",
                gap: 10,
                overflow: "scroll",
                paddingTop: 5
            },
            {
                class: "keywords",
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                paddingTop: 5
            },
            {
                class: "details-mob",
                position: "fixed",
                left: 0,
                right: 0,
                bottom: "-100%",
                widthPercent: 100,
                borderRadius: [14, 14, 0, 0],
                height: "auto",
                overflow: "scroll",
                maxHeightVh: 70,
                background: "white",
                padding: [20, 20],
                boxSizing: "border-box",
                opacity: 0,
                zIndex: 1000,
                transition: "bottom 0.4s ease, opacity 0.4s ease"
            },
            {
                class: "mobile-view",
                bottom: 0,
                opacity: 1
            },
            {
                class: "mobile-view",
                left: 0,
                width: "auto",
                opacity: 1,
                zIndex: 1000
            },
            {
                class: "mob-header",
                display: "flex",
                justifyContent: "space-between",
                gap: 10
            }
        ]
    }

    sendEmail(email, landlord, title) {
        const to = encodeURIComponent(email);
        const subject = encodeURIComponent("Regarding your property listing");
        const body = encodeURIComponent(
            `Hi ${landlord},\n\n` +
            `I’m interested in your property titled "${title}".\n` +
            `Could you tell me more about availability?\n\n` +
            `Thanks,\n[Your Name]`
        );

        const mailtoURL = `mailto:${to}?subject=${subject}&body=${body}`;
        window.open(mailtoURL, '_blank');
    }

    createImage(path) {
        const img = document.createElement("comp-image");
        img.path = path;
        return img;
    };

    createChip(value) {
        const chip = document.createElement("comp-chip");
        chip.text = value;
        if (this.matched_.includes(value)) chip.matched = true;
        return chip;
    }

    afterRender() {
        const card = this.query(".card");
        const email = this.getById("email");
        const emailDesk = this.getById("email-desk");
        const images = this.query(".images");
        const mobImages = this.query("#mob-images");
        const kws = this.query(".keywords");
        const mobKws = this.query("#mob-keywords");
        const modal = this.query(".details-mob");
        const close = this.query("#close");

        email.text = "Email Landlord";
        emailDesk.text = "Email Landlord";

        this.images_.forEach(i => images.appendChild(this.createImage(i)));
        this.images_.forEach(i => mobImages.appendChild(this.createImage(i)));
        this.keywords_.forEach(i => kws.appendChild(this.createChip(i)));
        this.keywords_.forEach(i => mobKws.appendChild(this.createChip(i)));

        card.addEventListener("click", () => {
            const details = this.query(".details");
            if (screen.width <= 600) modal.classList.add("mobile-view");
            else if (details.classList.contains("show-details")) details.classList.remove("show-details");
            else details.classList.add("show-details");
        });

        close.addEventListener("click", () => modal.classList.remove("mobile-view"));

        email.addEventListener("click", () => {
            this.sendEmail(this.email_, this.landlord_name_, this.title_);
        });

        emailDesk.addEventListener("click", () => {
            this.sendEmail(this.email_, this.landlord_name_, this.title_);
        });
    }

    static { Comp.register(this); }
}