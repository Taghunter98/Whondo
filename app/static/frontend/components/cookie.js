import { Comp } from "jay-comp";

export class CookieBanner extends Comp {

    slideUP( y = 20 ){

        return /* css */`
            @keyframes slideUp {

                0% {
                    opacity: 0;
                    transform: translateX(-50%) translateY(${y}px);
                }

                100% {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        `;
    
    }

    slideDown ( y = 20 ) {

        return /* css */`
            @keyframes slideDown {

                0%{ 
                    opacity: 1;
                     transform: translateX(-50%) translateY(0);
                }

                100% {
                    opacity: 0;
                    transform: translateX(-50%) translateY(${y}px)
                }
            }
        `;
    
    }


    createHTML(){

        return /* html */ `
            <div class="banner">
                <div class="content">
                    <h4 class="title">Allow Cookies</h4>
                    <p class="message">
                        This website uses cookies for better user experience and tracking, click allow to concent to our use of cookies
                    </p>
                </div>
                <div class="action">
                    <comp-button class="btn" id="reject">Reject</comp-button>
                    <comp-button class="btn" id="accept">Accept</comp-button>
                </div>
            </div>
        `;
    
    }


    createCSS(){

        const effect    = this.slideUP(20);
        const slideDown = this.slideDown(20);

        //PC query
        const banner = {
            class: "banner",
            position: "fixed",
            display: "flex",
            flexDirection: "row",
            bottom: "20px",
            leftPercent: 50,
            transform: "translateX(-50%)",
            maxWidthPercent: 100,
            widthPercent: 90,
            background: "white",
            borderRadius: "12px",
            boxShadow: [9, 8, 20, "var(--black100)"],
            padding: "16px",
            gap: "12px",
            zIndex: 1000,
            justifyContent: "space-between",
            alignItems: "centre",
            animation: "slideUp 0.5s ease",
            media:{ 
                maxWidthBp: 600,
                class: "banner",
                display: "flex",
                flexDirection: "column",
                texAlign: "center",
                alignItems: "stretch"
            }
        }

        const content = {
            class: "content",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            flex: 1,
            
        }

        const title = {
            class: "title",
            fontWeight: "bold",
            fontSize: "1rem",
            margin: 0,
        }

        const message = {
            class: "message",
            fontSize: "0.85 rem",
            margin: 0,
            colour: "black80",
        }

        const action = {
            class: "action",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 20,
            media: {
                maxWidthBp: 600,
                class: "action",
                justifyContent: "centre",
                flexDirection: "row"
            }
        }

        const btn = {
            class: "btn",
            fontSize: "0.9rem",
            width: "auto",
            boxSizing: "border-box",
            media: {
                maxWidthBp: 600,
                class: "btn",
                flex: 1,
            }
            
        }

        return [banner, content, title, message, action, btn, effect, slideDown];

    }

    afterRender(){

        function getCookie(name) {

            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        
        }

        const rejectBtn = this.shadowRoot.getElementById("reject");
        const acceptBtn = this.shadowRoot.getElementById("accept");
        const banner    = this.shadowRoot.querySelector(".banner");

        rejectBtn.text    = "Reject";
        rejectBtn.variant = 2;
        rejectBtn.fill = true;
        acceptBtn.text    = "Accept";
        acceptBtn.variant = 1;
        acceptBtn.fill = true

        const consent = getCookie("cookieConsent");
        if ( consent === "accepted" || consent === "rejected") {

            banner.style.display = "none";

        }

        rejectBtn.addEventListener("click", () => {
            
            document.cookie = "cookieConsent=rejected; path=/; max-age=31536000";

            document.cookie = "uID=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            banner.style.animation = "slideDown 0.5s ease";
            banner.addEventListener("animationend", () => {

                banner.style.display = "none";
            
            }, {once: true} );
            
        });

        acceptBtn.addEventListener("click", () => {
            
            document.cookie = "cookieConsent=accepted; path=/; max-age=31536000";

            banner.style.animation = "slideDown 0.5s ease";
            banner.addEventListener("animationend", () => {

                banner.style.display = "none";
            
            }, {once:true});

        });
    
    }

    static { Comp.register(this); }

}