// components/app-header.js

class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <header>
                <h1>Notes App</h1>
            </header>
        `;
    this.style.cssText = `
            header {
                background: #004643;
                color: #f9bc60;
                padding: 1rem;
                text-align: center;
            }
        `;
  }
}

customElements.define("app-header", AppHeader);
