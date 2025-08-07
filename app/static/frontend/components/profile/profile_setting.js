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

    get file(){
        return this.selectedFile || null;
    }

    createHTML() {
        const entry = this.fetchOnce("profilePic", () => this.fetchProfile());
        return `
        <div class="container">
            <img class="profile" src="${entry.value}">
            <input class="inputValue fileInput" type="file" accept="image/png, image/jpeg, image/jpg" hidden />
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
                cursor: "pointer",
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

    resetPreview(){
        const img = this.query(".profile");
        img.src = this.originalURL;
        this.selectedFile = null;
    }   

    afterRender() {   
        const img = this.query(".profile");
        const input = this.query(".fileInput");

        this.originalURL = img.src;

        img.addEventListener("click", () =>  input.click());

        input.addEventListener("change", () => {
            const file = input.files?.[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            img.src = url;

            this.selectedFile = file;
        });

    }

    static { Comp.register(this); }
}
