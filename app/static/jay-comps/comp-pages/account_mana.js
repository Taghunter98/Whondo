import { Comp } from "jay-comp";

export class AccountMana extends Comp {

    createHTML(){
        return  /* html */`
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

    afterRender(){

        const banner = this.getById("banner");
        banner.title = "My Account";
        banner.btnText1 = "Delete Account";
        banner.btnText2 = "Logout";

        const btn1 = banner.query("comp-button.btn1");
        btn1.variant = 2;

        const btn2 = banner.query("comp-button.btn2");
        btn2.variant = 1;
        

        const option1 = this.getById("option1");
        option1.title = "Update Account";
        option1.subTitle = "Update your account information.";

        const option2 = this.getById("option2");
        option2.title = "Change Password";
        option2.subTitle = "Update your password.";
    }

    static { Comp.register(this); }

}