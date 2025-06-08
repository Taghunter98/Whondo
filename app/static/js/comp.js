export class Comp extends HTMLElement {

    constructor() {
        super();
        
        this.compName_ = "Component Name";
        this.compHTML_ = "<p>Add HTML here</p>";
        this.compCSS_  = "p {color: red}";

        this.attachShadow({ mode: "open"});
    }

    set compName(name) {
        this.name = name;
    }

    set compHTML(html) {
        this.compHTML_ = html;
    }

    set compCSS(css) {
        this.compCSS_ = css;
    }

    get compName() {
        return this.compName_;
    }

    get compHTML() {
        return this.compHTML_;
    }

    get compCSS() {
        return this.compCSS_;
    }

    debugComponent() {
        console.log("DEBUG COMPONENT: " + this.compName + "\n")
        console.log(this.compName);
        console.log(this.compHTML);
        console.log(this.compCSS);
        console.log(this.compJS);
        console.log("\n");
    }

    render() {
        return  `
        ${this.compHTML_}
        <style>${this.compCSS_}</style>
        `
    }

}