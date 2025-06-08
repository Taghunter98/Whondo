export class Comp extends HTMLElement {

    constructor(compName, compHTML, compCSS) {
        super();
        this.compName_ = compName;
        this.compHTML_ = compHTML;
        this.compCSS   = compCSS;
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

    render() {
        return  `
        ${this.compHTML_}
        <style>${this.compCSS}</style>
        `
    }
}