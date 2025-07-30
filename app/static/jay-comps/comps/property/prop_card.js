import { Comp } from "jay-comp";

class PropCard extends Comp {
    read_ = false; title_; profile_; landlord_name_; price_; images_; email_;

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

    beforeRender() {
        if (!this.title_) this.title_ = "This is a title";
        if (!this.landlord_name_) this.landlord_name_ = "Josh Bassett";
        if (!this.images_) this.images_ = ["Profile/test@test.com/2025-07-19_test@test.com_pexels-lina-1661576.jpg"];
        if (!this.price_) this.price_ = 1000;
        if (!this.email_) this.email_ = "jb@vmi.tv";
    }

    createHTML() {
        const profile = this.profile_
            ? `"https://whondo.com/uploads?path=${this.profile_}`
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
                    <div class="card-buttons">
                        <comp-card-icon id="next"></comp-card-icon>
                        <comp-card-icon id="email"></comp-card-icon>
                    </div>
                </div>
            </div>
            <div class="details"></div>
        </div>
        `
    }

    createCSS() {
        return [
            {
                class: "container",
                position: "absolute",
                top: 0,
                left: 0,
                widthPercent: 100,
                heightVh: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: "translateY(100vh)",
                transition: "transform 0.4s ease",
            },
            {
                class: "in-view",
                transform: "translateY(0)"
            },
            {
                class: "out-view",
                transform: "translateY(-100vh)"
            },
            {
                class: "card",
                display: "flex",
                flexDirection: "column",
                width: 386,
                height: 685,
                borderRadius: 14,
                backgroundImageUrl: `https://whondo.com/uploads?path=${this.images_[0]}`,
                backgroundSize: "cover",
                media: {
                    maxWidthBp: 500,
                    widthPercent: 100,
                    heightVh: 100,
                    borderRadius: 0
                }
            },
            {
                class: "info",
                marginTop: "auto",
                boxSizing: "border-box",
                padding: [20, 20, 40, 20],
                borderRadius: [0, 0, 14, 14],
                colour: "white",
                widthPercent: 100,
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.90) 65.57%)",
                media: {
                    maxWidthBp: 600,
                    borderRadius: 0
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
                class: "card-buttons",
                display: "flex",
                boxSizing: "border-box",
                gap: 20,
                paddingTop: 20,
                media: {
                    maxWidthBp: 600,
                    paddingBottom: 100
                }
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

    afterRender() {
        const container = this.query(".container");
        const next = this.getById("next");
        const email = this.getById("email");

        requestAnimationFrame(() => {
            container.classList.add("in-view");
        });

        email.path = "mail.svg";
        email.addEventListener("click", () => {
            this.sendEmail(this.email_, this.landlord_name_, this.title_);
        });

        next.path = "close.svg";
        next.addEventListener("click", () => {
            container.classList.remove("in-view");
            container.classList.add("out-view");

            container.addEventListener("transitionend", () => {
                this.publish("card-dismiss");
            }, { once: true });
        });
    }


    static { Comp.register(this); }
}