import { Comp } from "jay-comp";

export class AccountMana extends Comp {

    createHTML(){
        return  /* html */`
        <comp-popup id="logout" style="display: none"></comp-popup>
        <comp-popup id="profile" style="display: none"></comp-popup>
        <comp-popup id="changePass" style="display: none"></comp-popup>
        <comp-update-profile id="update" style="display: none"></comp-update-profile>
        <comp-change-pass id="pass" style="display: none"></comp-change-pass>
        <comp-navbar></comp-navbar>
        <div class="background">
            <div class="container">
                <comp-banner id="banner"></comp-banner>
                <div class="options">
                    <comp-profile-option id="option1"></comp-profile-option>
                    <comp-profile-option id="option2"></comp-profile-option>
                </div>
            </div>
        </div>
        `;
    }

    createCSS(){
        return[
            { class: "background",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                background: "white",
                maxWidthPercent: 100,
                height: "100vh",
                boxSizing: "border-box" 
            },
            { class: "container",
                maxWidthPercent: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                marginTop: 100,
                gap:20,

            },
            {class: "options",
                display: "flex",
                maxWidthPercent: 100,
                flexDirection: "column",
                height: 224,
                gap: 20,
                media: {
                    maxWidthBp: 600,
                    justifyContent: "centre",
                    alignItems: "centre",
                }

            }
        ]
    }

    showPopup(id, title, paragraph, buttonText = "OK") {
        const popup = this.getById(id);
        popup.title = title;
        popup.paragraph = paragraph;
        popup.text = buttonText;
        popup.style.display = "flex";
    }

    async logout() {
        const res = await this.request("/logout", "GET");
        if (res.ok) {
            this.showPopup("logout", "Logout Successful", "You’ve been logged out.", "Back to Login");
            const popup = this.getById("logout");
            const icon = popup.query(".icon");
            const btn = popup.query(".btn");
            icon.style.display = "none";
            btn.style.width = "125px"
            popup.addEventListener("popup-button", () => { window.location.assign("/login"); }, { once: true });
        } else {
            this.showPopup("logout", "Logout Failed", res.error || "Something went wrong.");
        }
    }

    async deleteAccount(){
        const res = await this.request();
    }



    afterRender(){

        const banner = this.getById("banner");
        banner.title = "My Account";
        banner.btnText1 = "Delete Account";
        banner.btnText2 = "Logout";

        const btn1 = banner.query("comp-button.btn1");
        btn1.variant = 2;

        const btn2 = banner.query("comp-button.btn2");
        btn2.variant = 1;
        
        //setting options
        const option1 = this.getById("option1");
        option1.title = "Update Account";
        option1.subTitle = "Update your account information.";
        const icon1 = option1.query(".iconBtn");
        icon1.addEventListener("click", () => {
            update.style.display = "block";
        })

        const option2 = this.getById("option2");
        option2.title = "Change Password";
        option2.subTitle = "Update your password.";
        const icon2 = option2.query(".iconBtn");
        icon2.addEventListener("click", () => {
            pass.style.display = "block";
        })

        //update popup
        const update = this.getById("update");
        update.title = "Update Account";
        const name = update.query("#name");
        name.label = "Name";
        name.prompt = "Enter name"

        const surname = update.query("#surname");
        surname.label = "surname";
        surname.prompt = "Enter surname"

        const bio = update.query("#bio");
        bio.label = "Bio";
        bio.prompt = "Tell us more about you..."

        const pic = update.query("#picture");
        pic.label = "Profile picture";
        pic.prompt = "Upload photo";

        const back = update.query(".back");
        back.text = "Back";
        back.variant = 2;
        back.fill = true;

        update.addEventListener("popup-back", () => {
            update.style.display = "none";
        });

        const submit = update.query(".submit");
        submit.text = "Save";
        submit.fill = true;

        //password options
        const pass = this.getById("pass")
        pass.title = "Change Password";

        const current = pass.query("#current");
        current.label = "Current Password";
        current.prompt = "Enter current password";
        current.required = true;

        const newPass = pass.query("#new");
        newPass.label = "New Password";
        newPass.prompt = "Enter new password";
        newPass.enableEntropy = true;
        newPass.required = true;

        const confirm = pass.query("#confirm");
        confirm.label = "Confirm New Password";
        confirm.prompt = "Enter new password again";
        confirm.required = true;
        
        const backBtn = pass.query("#back");
        backBtn.text = "Back";
        backBtn.variant = 2;
        backBtn.fill = true;

        const save = pass.query("#submit");
        save.text = "Save";
        save.fill = true;

        pass.addEventListener("popup-back", () => {
            pass.style.display = "none";
            const current = pass.query("#current");
            const newPass = pass.query("#new");
            const confirm = pass.query("#confirm")
            current.query(".inputValue").value = "";
            current.query(".inputValue").classList.remove("error")
            newPass.query(".inputValue").value = "";
            newPass.query(".inputValue").classList.remove("error");
            newPass.query(".hint").style.display = "none";
            confirm.query(".inputValue").value = "";
            confirm.query(".inputValue").classList.remove("error")
            
        });

        btn1.addEventListener("btn1-click", () => {
            this.deleteAccount()
        })

        btn2.addEventListener("btn2-click", () => {
            this.logout();
        })

        
    }

    static { Comp.register(this); }

}