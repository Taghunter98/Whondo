import { Comp } from "jay-comp";

export class Footer extends Comp {
    
    createHTML(){
        return /*html*/`
            <div class="background">
                <div class="container">
                    <h2 class="logo">Whondo</h2>
                    <div class="link-wrapper">
                        <a href="/" class="link">About</a>
                        <a href="https://github.com/Taghunter98/Whondo" class="link">Github</a>
                        <a href="/advertise" class="link">Advertise Your Home</a>
                        <a href="/" class="link">Terms of Service</a>
                        <a href="/" class="link">Privacy Policy</a>
                        <a href="/" class="link">Sitemap</a>
                    </div>
                    <div class="copy">Copyright Whondo 2025. All rights reserved</div>
                </div>
            </div>
        
        `;

    }

    createCSS(){
        return [
            { class: "background",
                display: "flex",
                colour: "white",
                padding: [40,40],
                justifyContent: "centre",
                backgroundVar: "black100",
                position: "relative",
                media:{
                    maxWidthBp: 600,
                    padding: [20,20],
                }

            },
            { class: "container",
                display: "flex",
                flexDirection: "column",
                alignItems: "centre",
                justifyContent: "centre",
                widthPercent: 100,
                maxWidth: 1200,
                gap:20,
            },
            { class: "logo",
                fontSize: 32,
                fontWeight: "bold",
                margin: 0
            },
            { class: "link-wrapper",
                display: "flex",
                justifyContent: "centre",
                gap: 20,
                fontSize: 16,
                media: {
                    maxWidthBp: 600,
                    flexDirection: "column",
                    height: 300,
                    gap: 15,
                }
            },
            { class: "link",
                colour: "white",
                textDecoration: "none",
                display: "flex",
                justifyContent: "centre",
                alignSelf: "centre",
                textAlign: "centre",
                padding: [8,10],
                borderRadius: 8,
                borderVar: "borderBlack",

            },
            {class: "link", pseudoClass: "hover",
                colourVar: "black100",
                backgroundVar: "white"
            },
            {
                class: "link", pseudoClass: "active",
                backgroundVar: "black20",
                transform: "scale(0.95)",
            },
            { class: "copy",
                fontSize: 12,
                colour: "white",
                marginTop: 20

            }
        ];
    }

    static { Comp.register(this); }
}