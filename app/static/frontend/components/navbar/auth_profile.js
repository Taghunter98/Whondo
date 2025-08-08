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
            }, 
            { class: "profile",
                width: 45,
                height: 45,
                borderVar: "border",
                borderRadiusPercent: 50,
                cursor: "pointer",
                transition: ["all", "0.3s" ,"ease"],
                boxShadow: [0, "2px", "4px", "rgba(0, 0, 0, 0.1)"],
            },
            { class: "profile", pseudoClass: "hover",
                colourVar: "black100",
                transform: "scale(1.05)",
                boxShadow: [0, 0, "8px", "rgba(0, 0, 0, 0.2)"],
            },
            { class: "profile", pseudoClass: "active",
                transform: "scale(0.95)",
                boxShadow: [0, 0, "8px", "rgba(0, 0, 0, 0.1)"],
            },
        ];
    }

    afterRender() {
        const profile = this.query(".profile");
        if (profile) profile.addEventListener("click", () => window.location.assign("/profile"));
    }

    static { Comp.register(this); }
}
