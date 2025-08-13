import { Comp } from "jay-comp";

export class PicBanner extends Comp {
    btnText_;

    set btnText(v) {
        this.btnText_ = v;
        this.update();
    }

    get btnText() {
        return this.btnText_;
    }

    async fetchProfile() {
        const { ok, data, error } = await this.request(
            "https://whondo.com/verify/me",
            "GET"
        );

        if (!ok) throw new Error(error);

        return {
            name: data.name || "there",
            pic: data.profilePicture
                ? `https://whondo.com/uploads?path=${data.profilePicture}`
                : "https://whondo.com/static/icons/Profile.png",
        };
    }

    createHTML() {
        const entry = this.fetchOnce("profilePic", () => this.fetchProfile());
        return /* html */ `
        <div class="banner">
            <div class="content">
                <img class="profile" src="${
                    entry.value?.pic ??
                    "https://whondo.com/static/icons/Profile.png"
                }">
                <h4 class="title">Hi ${entry.value?.name ?? "there"}!</h4>
            </div>
            <div class="action">
                <comp-button class="btn"></comp-button>
            </div>
        </div>
        `;
    }

    createCSS() {
        return [
            {
                class: "banner",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "centre",
                flexDirection: "row",
                maxWidthPercent: 100,
                background: "white",
                borderRadius: 12,
                padding: 20,
                gap: 12,
                boxSizing: "border-box",
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column",
                    gap: 16,
                    alignItems: "start",
                },
            },
            {
                class: "content",
                flex: 1,
                display: "flex",
                alignItems: "centre",
                justifyContent: "flex-start",
                gap: 20,
                media: {
                    maxWidthBp: 600,
                    justifyContent: "centre",
                },
            },
            { class: "title", fontWeight: "bold" },
            {
                class: "action",
                display: "flex",
                gap: 12,
                media: {
                    maxWidthBp: 600,
                    widthPercent: 100,
                },
            },
            {
                class: "profile",
                width: 50,
                height: 50,
                borderVar: "border",
                borderRadiusPercent: 50,
            },
        ];
    }

    afterRender() {
        const btn = this.query(".btn");

        btn.text = this.btnText_;

        btn.addEventListener("click", () => btn.publish("btn-click"));
    }

    static {
        Comp.register(this);
    }
}
