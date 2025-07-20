import { Navbar } from "./navbar";

export class LandlordNav extends Navbar{

    createHTML() {

        return /* html */ `
        <div id="navbar" class="container">
            <a><h3 class="logo">Whondo</h3></a>
            <ul class="links">
                <li class="link">About</li>
                <li class="link">Landlord Portal</li>
                <li class="link">GitHub</li>
            </ul>
            <comp-icon class="menu" id="menu"></comp-icon>
            <div class="buttons">
                <comp-button id="register"></comp-button>
                <comp-button id="login"></comp-button>
            </div>
        </div>

        <div id="tray" class="tray">
            <div class="header">
                <a><h3 class="logo">Whondo</h3></a>
                <comp-icon class="close" id="close"></comp-icon>
            </div>

            <ul class="linksTray">
                <li class="link">About</li>
                <li class="link">Landlord Portal</li>
                <li class="link">GitHub</li>
            </ul>

            <div class="trayButtons">
                <comp-button id="registerMob"></comp-button>
                <comp-button id="loginMob"></comp-button>
            </div>
        </div>
        
        `;
    
    }

    createCSS(){

        const base = super.createCSS();

        return [base,]
    }

    static { super.register(this); }

}