import { Comp } from "jay-comp";

class Spinner extends Comp {
    createHTML() {
        return `<div class="spinner"></div>`;
    }

    createCSS() {
        return [
            { class: "spinner",
                width: 24,
                height: 24,
                border: "3px solid var(--black80)",
                borderTop: "3px solid var(--black10)",
                borderRadius: "50%",
                animation: "spinner 0.8s linear infinite"
            },
            {
                keyframes: { name: "spinner",
                    "0%": {transform: "rotate(0deg)"},
                    "100%": {transform: "rotate(360deg)"}
                }
            }
        ];
    }

    static { Comp.register(this); }
}