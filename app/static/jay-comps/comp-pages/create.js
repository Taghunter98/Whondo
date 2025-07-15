import { Comp } from "jay-comp";

export class Create extends Comp {
    

    createHTML() {

        return /* html */`
        <comp-navbar></comp-navbar>
        <div class="background">
            <div class="container">
                <comp-dialog id="describe"></comp-dialog>
            </div>
        </div>
        `;
    
    }

    createCSS() {

        const effect = this.effect.slideUp(20);
        const prop   = this.effect.prop("slideUp", .5);

        const background = {
            class: "background",
            display: "flex",
            flexDirection: "column",
            widthPercent: 100,
            heightVh: 100,
            justifyContent: "centre",
            alignItems: "centre",
            backgroundVar: "black10",
            overflow: "hidden",
        };

        const container = {
            class: "container",
            background: "white",
            animation: prop, 
            width: "auto",        
        };

        return [effect, background, container];
         
    
    }

    afterRender() {

        const dialogBox = this.getById("describe");

        customElements.whenDefined('comp-dialog').then(() => {

            requestAnimationFrame(() => {

                dialogBox.showButton();

                dialogBox.title     = "Email Verification";
                dialogBox.paragraph = "We have sent you an email with a verification link.<br>If you do not receive an email, please check your spam.";
                dialogBox.svgIcon   = ` xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="currentColor"><path d="m734-164-42-42 73-74H584v-60h181l-73-74 42-42 146 146-146 146ZM140-280q-24.75 0-42.37-17.63Q80-315.25 80-340v-440q0-24.75 17.63-42.38Q115.25-840 140-840h560q24.75 0 42.38 17.62Q760-804.75 760-780v232q-7.5-1-15-1.5t-15-.5q-8 0-15 .5t-15 1.5v-185L416-532 140-732v392h351q-1 8-1 13.5v13.75q0 8.25.5 16.5T493-280H140Zm36-500 240 174 246-174H176Zm-36 440v-440 440Z"/`;
            
            });
        
        });

    }

    static { Comp.register(this); }

}

