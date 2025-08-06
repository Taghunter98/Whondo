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
    }

    static { Comp.register(this); }
}
