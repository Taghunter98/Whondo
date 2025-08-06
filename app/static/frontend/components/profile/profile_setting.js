import { Comp } from 'jay-comp';

class ProfileSetting extends Comp {
    async fetchProfile() {
        const { ok, data, error } = await this.request(
            "https://whondo.com/verify/me",
            "GET"
        );

        if (!ok) throw new Error(error);

        const pic = data.profilePicture;
        return pic
            ? `https://whondo.com/uploads?path=${pic}`
            : "https://whondo.com/static/icons/Profile.png";
    }

    createHTML() {
        const entry = this.fetchOnce("profilePic", () => this.fetchProfile());
        return `
        <div class="container">
            <img class="profile" src="${entry.value}">
            <div>
            <comp-button class="upload" style="display: block"></comp-button>
            <comp-button class="back" style="display: none"></comp-button>
            </div>
        </div>
        `;
    }

    createCSS() {
        return [
            {
                width: "auto"
            }, {
                class: "profile",
                width: 85,
                height: 85,
                borderVar: "border",
                borderRadiusPercent: 50,
            },
            {
                class: "container",
                display: "flex",
                flexDirection: "column",
                justifyContent: "centre",
                alignItems: "centre",
                width: "auto",
                gap: 10,
            },
        ];
    }

    afterRender() {   
        const update = this.query(".upload");
        const back = this.query(".back");

        update.text = "Edit Picture";
        back.text = "Back to Profile"

        update.addEventListener("click", () => {
            this.publish("edit");
            update.style.display = "none";
            back.style.display = "block";
        });

        back.addEventListener("click", () => {
            this.publish("edit-profile");
            back.style.display = "none";
            update.style.display = "block";
        });
    }

    static { Comp.register(this); }
}
