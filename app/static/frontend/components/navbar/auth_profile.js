import { Comp } from 'jay-comp';

class AuthProfile extends Comp {
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
        if (entry.error) return '<comp-nav-buttons></comp-nav-buttons>';
        return `<img class="profile" src="${entry.value}">`;
    }

    createCSS() {
        return [
            {
                width: "auto"
            }, {
                class: "profile",
                width: 45,
                height: 45,
                borderVar: "border",
                borderRadiusPercent: 50,
            }
        ];
    }

    afterRender() {
        const profile = this.query(".profile");
        if (profile) profile.addEventListener("click", () => window.location.assign("/profile"));
    }

    static { Comp.register(this); }
}
