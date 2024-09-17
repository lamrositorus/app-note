// components/note-form.js

class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <form  id="add-note-form">
                <div class="note-form-group">
                    <label for="note-title">Title:</label>
                    <input type="text" id="note-title" required>
                </div>
                <div class="note-form-group">
                    <label for="note-body">Body:</label>
                    <textarea id="note-body" rows="4" required></textarea>
                </div>
                <button id='btnSubmit' type="submit">Add Note</button>
            </form>
        `;
    this.style.cssText = `
            form {
                margin: 1rem 0;
            }
            .note-form-group {
                margin-bottom: 1rem;
            }
            label {
                display: block;
                margin-bottom: 0.5rem;
            }
            input, textarea {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            button {
                background: #004643;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 4px;
                cursor: pointer;
            }
            button:hover {
                background: #003b3a;
            }
        `;

    this.querySelector("#add-note-form").addEventListener("submit", (event) => {
      event.preventDefault();
      this.dispatchEvent(
        new CustomEvent("add-note", {
          bubbles: true,
          composed: true,
        }),
      );
    });

    this.querySelector("#note-title").addEventListener("input", () => {
      this.checkValidity();
    });

    this.querySelector("#note-body").addEventListener("input", () => {
      this.checkValidity();
    });
  }

  checkValidity() {
    const title = this.querySelector("#note-title");
    const body = this.querySelector("#note-body");
    const button = this.querySelector("button");

    button.disabled = !title.validity.valid || !body.validity.valid;
  }
}

customElements.define("note-form", NoteForm);
