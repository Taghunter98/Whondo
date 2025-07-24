import { Comp } from "jay-comp";

export class Profile extends Comp {
    image_;

    async beforeRender() {
        const resp = await this.request("https://whondo.com/verify/me", "GET");

        this.image_ = resp.ok ? 
        `https://whondo.com/uploads?path=${resp.data.profilePicture}` :
        "static/icons/Profile.png";
    }

    createHTML() {
        return /*html*/`<img class="profile" src="${this.image_}">`
    }

    createCSS() {
        return { class: "profile",
            width: 45,
            height: 45
        };
    }

    static { Comp.register(this); }
}