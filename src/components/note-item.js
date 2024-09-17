class NoteItem extends HTMLElement {
  set noteData(data) {
    this._data = data;
    this.render();
  }

  get noteData() {
    return this._data;
  }

  async archiveNote() {
    try {
      await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${this.noteData.id}/archive`,
        {
          method: "POST",
        },
      );
      this.dispatchEvent(
        new CustomEvent("note-updated", {
          bubbles: true,
        }),
      );
    } catch (error) {
      console.error("Failed to archive note:", error);
    }
  }

  async deleteNote() {
    try {
      await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${this.noteData.id}`,
        {
          method: "DELETE",
        },
      );
      this.dispatchEvent(
        new CustomEvent("note-updated", {
          bubbles: true,
        }),
      );
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  }

  render() {
    this.innerHTML = `
            <div class="note-item">
                <h2>${this.noteData.title}</h2>
                <p>${this.noteData.body}</p>
                <small>Created at: ${new Date(this.noteData.createdAt).toLocaleString()}</small>
                <button class="archive-btn">Archive</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
    this.style.cssText = `
            .note-item {
                background: #fff;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                margin-bottom: 1rem;
            }
            h2 {
                margin-bottom: 0.5rem;
                color: #004643;
            }
            p {
                margin-bottom: 0.5rem;
            }
            small {
                color: #666;
            }
            .archive-btn, .delete-btn {
                background: #004643;
                color: white;
                border: none;
                padding: 0.5rem;
                margin-right: 0.5rem;
                border-radius: 4px;
                cursor: pointer;
            }
            .archive-btn:hover, .delete-btn:hover {
                background: #003b3a;
            }
        `;

    this.querySelector(".archive-btn").addEventListener("click", () =>
      this.archiveNote(),
    );
    this.querySelector(".delete-btn").addEventListener("click", () =>
      this.deleteNote(),
    );
  }
}

customElements.define("note-item", NoteItem);
