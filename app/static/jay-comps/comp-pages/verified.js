import { Comp } from 'jay-comp';

export class Verified extends Comp {

    name_ = "Verified";
       
    createHTML() {

        return /* html */`
        <div class="background">
            
            <div class="container">
                <!-- <svg class="icon" xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="currentColor"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                <h3 class="head">Verified!</h3>
                <p class="describe">Welcome {{ email }}!<br>Your account has now been verified.</p> -->
                <comp-dialog id="describe"></comp-dialog>

            </div>
        </div>
        `;
    
    }

    createCSS() {
        
        const effect = this.effect.slideUp(20);
        const prop   = this.effect.prop("slideUp", .5);

        const background = this.css({
            class: "background",
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            widthPercent: 100,
            alignItems: "centre",
            background: "black10",
            justifyContent: "centre",
            overflow: "hidden",
            media: {
                breakpoint: 600,
                padding: 20,
                width: "auto"
            }
        });

        const container = this.css({
            class: "container",
            display: "flex",
            background: "white",
            animation: prop,
            width: "auto",
        });

        
        return /* css */`
        ${effect}
        ${background}
        ${container}
        
        `;
        
    
    }

    hook() {
        
        const describe = this.shadowRoot.getElementById("describe");
        const btn      = this.shadowRoot.getElementById('btn');
        const email    = this.getAttribute("email") || "User";

        const template  = `Welcome {{ email }}!<br>Your account has now been verified.`;
        const finalText = template.replace(/{{\s*email\s*}}/g, email);

        describe.svgIcon   = `xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="currentColor"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/`;
        describe.title     = "Verified!";
        describe.paragraph = finalText;
    
        btn.buttonText = "Continue";
        
    } 
    
    static {Comp.register(this);}

}