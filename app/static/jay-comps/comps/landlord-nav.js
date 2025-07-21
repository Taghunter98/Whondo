import { Navbar } from "./navbar.js";

export class LandlordNav extends Navbar{

    photo;

    set photo(v){ 
        this.photo_ = v;
        this.update();
    }

    get photo() { return this.photo_; }

    createHTML() {

        return /* html */ `
        <div id="navbar" class="container">
            <a><h3 class="logo">Whondo</h3></a>
            <ul class="links">
                <li class="link">About</li>
                <li class="link">Mission</li>
            </ul>
            <comp-icon class="menu" id="menu"></comp-icon>
            <div class="buttons">
                <p>Landlord Portal</p>
                <img src="https://www.pexels.com/photo/person-in-blue-denim-jacket-sitting-on-chair-while-writing-39866/" class="profile">
            </div>
        </div>

        <div id="tray" class="tray">
            <div class="header">
                <a><h3 class="logo">Whondo</h3></a>
                <comp-icon class="close" id="close"></comp-icon>
            </div>

            <ul class="linksTray">
                <li class="link">About</li>
                <li class="link">Misson</li>
            </ul>

            <div class="trayButtons">
                <comp-button id="registerMob"></comp-button>
                <comp-button id="loginMob"></comp-button>
            </div>
        </div>
        
        `;
    
    }

     /**
     * Function hides/shows the navbar on scroll.
     * 
     * The function takes the current Y position of the navbar and checks if the current pixel difference is greater than 20px.
     * If so then the top is increased to hide the element then the last Y position is updated to reflect the change.
     */
    navbarScroll() {
        const navbar = this.getById("navbar");
        const currentPos = window.scrollY;
        
        if (currentPos > this.lastScrollY && currentPos > 20) navbar.style.top = "-80px";
        else navbar.style.top = "0";
        
        this.lastScrollY = currentPos;
    }

    /**
     * Method offsets tray element by specified px.
     * 
     * @param {string} offset 
     */
    openMenu(offset) {
        const tray = this.getById("tray");
        tray.style.bottom = offset;
    }

    createCSS(){

        const base = super.createCSS();

        return [base,]
    }

    afterRender(){
        
        const menu = this.getById("menu");
        const close = this.getById("close");
    
        menu.path = "menu.svg";
        close.path = "close.svg";
    

        window.addEventListener("scroll", this.navbarScroll.bind(this));
        menu.addEventListener("click", () => this.openMenu("0"));
        close.addEventListener("click", () => this.openMenu("-500px"));
    } 
    

    static { super.register(this); }

}