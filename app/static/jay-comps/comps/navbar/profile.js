import { Comp } from "jay-comp";

export class Profile extends Comp {
    image_; fetched = false;
    
    beforeRender() {
        if (!this.fetched) {
            this.fetched = true;
            this.getProfile().then(img => {
                this.image_ = img;
                this.update();        
            });
        }
    }
    
    async getProfile() {
        const {ok, data} = await this.request("/verify/me", "GET");
        return ok && data.profilePicture ?
            `https://whondo.com/uploads?path=${data.profilePicture}` : "static/icons/Profile.png";
    }
  
    createHTML() {
        return /*html*/`<img class="profile" src="${this.image_}">`;
    }

  createCSS() { 
    return { class: "profile", width: 45, height: 45 }; }

  static { Comp.register(this); }
}
