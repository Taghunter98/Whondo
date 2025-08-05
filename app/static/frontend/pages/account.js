import { Comp } from "jay-comp";

export class Account extends Comp {

    createHTML() {
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

    createCSS() {
        return [
            {
                class: "background",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                background: "white",
                widthPercent: 100,
                boxSizing: "border-box",
                media: {
                    maxWidthBp: 600,
                    alignItems: "start"
                }
            },
            {
                class: "container",
                maxWidthPercent: 100,
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                marginTop: 100,
            },
            {
                class: "options",
                display: "flex",
                boxSizing: "border-box",
                maxWidthPercent: 100,
                flexDirection: "column",
                gap: 20,
                padding: [0, 20],
            }
        ]
    }

    showPopup(id, title, paragraph, buttonText = "OK") {
        const popup = this.getById(id);
        popup.title = title;
        popup.paragraph = paragraph;
        popup.text = buttonText;
        popup.style.display = "flex";
        const icon = popup.query(".icon");
        icon.style.display = "none";
    }

    async logout() {
        const res = await this.request("/logout", "GET");
        if (res.ok) {
            this.showPopup("logout", "Logout Successful", "You’ve been logged out.", "Back to Login");
            const popup = this.getById("logout");

            popup.subscribe("popup-button", () => { window.location.assign("/login"); }, { once: true });
        }
        else this.showPopup("logout", "Logout Failed", res.error || "Something went wrong.");
    }

    async deleteAccount() {
        const res = await this.request();
    }

    afterRender() {
        const banner = this.getById("banner");
        const updatePopup = this.getById("update");
        const passPopup = this.getById("pass");
        const option1 = this.getById("option1");
        const option2 = this.getById("option2");

        banner.title = "My Account";
        banner.btnText1 = "Delete Account";
        banner.btnText2 = "Logout";
        option1.title = "Update Account";
        option2.title = "Change Password";


        this.subscribe("password-back", () => {
            passPopup.style.display = "none";

        });

        option1.subscribe("option-clicked", () => {
            updatePopup.style.display = "block";
        })

        option2.subscribe("option-clicked", () => {
            passPopup.style.display = "block";
        })

        this.subscribe("password-changed", () => {
            this.showPopup("changePass", "Password Updated", "Your password has been changed successfully!");
            const popup = this.getById("changePass");
            popup.subscribe("popup-button", () => { window.location.assign("/"); }, { once: true });

        });

        this.subscribe("update-back", () => {
            updatePopup.style.display = "none";
        });

        this.subscribe("updated", () => {
            this.showPopup("update", "Profile Updated", "Your profile has been updated successfully");
            const popup = this.query("#profile");
            popup.subscribe("popup-button", () => { window.location.assign("/"); }, { once: true });
        });

        this.subscribe("btn1-click", () => {
            this.deleteAccount()
        })

        this.subscribe("btn2-click", () => {
            this.logout();
        })
    }

    static { Comp.register(this); }

}