import { Comp } from "jay-comp";

export class NavButtons extends Comp {
    createHTML() {
        return /*html*/`
        <div class="buttons">
            <comp-button id="register"></comp-button>
            <comp-button id="login"></comp-button>
        </div>
        `
    }

    createCSS() {
        return {
            class: "buttons",
            display: "flex",
            width: "auto",
            gap: 20
        };
    }

    afterRender() {
        const register = this.getById("register");
        const login = this.getById("login");

        register.text = "Register";
        register.variant = 2;
        login.text = "login";

        register.addEventListener("click", () =>
            window.location.assign("/register"));

        login.addEventListener("click", () =>
            window.location.assign("/login"));
    }

    static { Comp.register(this); }
}