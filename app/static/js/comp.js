export class Comp extends HTMLElement {

    constructor() {
        super();
        
        this.compName_ = "Component Name";
        this.compHTML_ = "";
        this.compCSS_  = "";

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

    createTemplate(html, css) {
        return `
        ${html}
        <style>${css}</style>
        `
    }

    debugComponent() {
        console.log("DEBUG COMPONENT: " + this.compName + "\n")
        console.log(this.compName);
        console.log(this.compHTML);
        console.log(this.compCSS);
        console.log(this.compJS);
        console.log("\n");
    }

    renderComponent() {
        this.shadowRoot.innerHTML = this.createTemplate(this.compHTML_, this.compCSS_);
    }

    updateComponent(newHTML, newCSS) {
        this.compHTML_ = newHTML;
        this.compCSS_  = newCSS;
        this.renderComponent();
    }

}