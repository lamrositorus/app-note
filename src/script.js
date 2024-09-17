// Impor custom elements
import "./components/app-header.js";
import "./components/note-form.js";
import "./components/note-item.js";
import "./components/loading-indicator.js"; // Pastikan file ini ada dan terdaftar
import "./style.css";
import Swal from "sweetalert2";
import { gsap } from "gsap";
import AOS from "aos";
import "aos/dist/aos.css"; // Pastikan Anda mengimpor AOS dan CSS-nya

document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notes-list");
  const archivedContainer = document.getElementById("archived-container");
  const addNoteForm = document.querySelector("form");
  const noteTitleInput = addNoteForm
    ? addNoteForm.querySelector("#note-title")
    : null;
  const noteBodyInput = addNoteForm
    ? addNoteForm.querySelector("#note-body")
    : null;
  const loadingIndicator = document.getElementById("loading-indicator"); // Gunakan ID atau class yang spesifik
  const header = document.querySelector("header");
  const noteForm = document.querySelector("note-form");
  if (
    !notesList ||
    !addNoteForm ||
    !noteTitleInput ||
    !noteBodyInput ||
    !archivedContainer ||
    !loadingIndicator
  ) {
    Swal.fire({
      title: "Error!",
      text: "One or more required elements are missing.",
      icon: "error",
      confirmButtonText: "OK",
    });
    console.error("One or more required elements are missing from the DOM.");
    return;
  }

  const url = "https://notes-api.dicoding.dev/v2/notes";

  if (header) {
    gsap.from(header, { duration: 1, y: -100, opacity: 0, ease: "bounce" });
  }
  if (noteForm) {
    gsap.from(noteForm, { duration: 1, y: -100, opacity: 0, ease: "bounce" });
  }

  const showArchivedBtn = document.createElement("button");
  showArchivedBtn.id = "show-archived";
  showArchivedBtn.textContent = "Show Archived Notes";
  archivedContainer.appendChild(showArchivedBtn);

  const archivedNotesList = document.createElement("ul");
  archivedNotesList.id = "archived-notes-list";
  archivedNotesList.classList.add("hidden");
  archivedContainer.appendChild(archivedNotesList);

  function showLoading() {
    loadingIndicator.style.display = "block";
  }

  function hideLoading() {
    loadingIndicator.style.display = "none";
  }

  async function fetchNotes() {
    showLoading();
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch notes. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return [];
    } finally {
      hideLoading();
    }
  }

  async function fetchArchivedNotes() {
    showLoading();
    try {
      const response = await fetch(`${url}/archived`);
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Failed to fetch archived notes:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to fetch archived notes.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return [];
    } finally {
      hideLoading();
    }
  }

  async function renderNotes() {
    notesList.innerHTML = "";
    const notesData = await fetchNotes();
    notesData.forEach((note) => {
      const noteItem = document.createElement("li");
      noteItem.classList.add("note-item");

      // Tambahkan animasi AOS
      noteItem.setAttribute("data-aos", "fade-up");

      noteItem.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <p><small>${new Date(note.createdAt).toLocaleString()}</small></p>
        <button class="archive-btn" data-id="${note.id}">Archive</button>
        <button class="delete-btn" data-id="${note.id}">Delete</button>
      `;
      notesList.appendChild(noteItem);
    });

    // Inisialisasi ulang AOS setelah elemen baru dimasukkan
    AOS.refresh();

    document.querySelectorAll(".archive-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const noteId = button.getAttribute("data-id");
        archiveNote(noteId);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const noteId = button.getAttribute("data-id");
        deleteNote(noteId);
      });
    });
  }

  async function renderArchivedNotes() {
    archivedNotesList.innerHTML = "";
    const archivedNotesData = await fetchArchivedNotes();
    archivedNotesData.forEach((note) => {
      const noteItem = document.createElement("li");
      noteItem.classList.add("note-item");

      // Tambahkan animasi AOS
      noteItem.setAttribute("data-aos", "fade-right");

      noteItem.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.body}</p>
        <p><small>${new Date(note.createdAt).toLocaleString()}</small></p>
        <div class="btnShow">
          <button class="unarchive-btn" data-id="${note.id}">Unarchive</button>
          <button class="delete-btn" data-id="${note.id}">Delete</button>
        </div>
      `;
      archivedNotesList.appendChild(noteItem);
    });

    // Inisialisasi ulang AOS
    AOS.refresh();

    document.querySelectorAll(".unarchive-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const noteId = button.getAttribute("data-id");
        unarchiveNote(noteId);
      });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const noteId = button.getAttribute("data-id");
        deleteNote(noteId);
      });
    });
  }

  async function addNote() {
    const title = noteTitleInput.value.trim();
    const body = noteBodyInput.value.trim();

    if (title && body) {
      showLoading();
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, body }),
        });
        const result = await response.json();
        if (result.status === "success") {
          await renderNotes();
          noteTitleInput.value = "";
          noteBodyInput.value = "";
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Note added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Failed to add note:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to add note. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        hideLoading();
      }
    }
  }

  async function deleteNote(noteId) {
    showLoading();
    try {
      const response = await fetch(`${url}/${noteId}`, { method: "DELETE" });
      const result = await response.json();
      if (result.status === "success") {
        await renderNotes();
        await renderArchivedNotes();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete note.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      hideLoading();
    }
  }

  async function archiveNote(noteId) {
    showLoading();
    try {
      const response = await fetch(`${url}/${noteId}/archive`, {
        method: "POST",
      });
      const result = await response.json();
      if (result.status === "success") {
        await renderNotes();
        await renderArchivedNotes();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note archived successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to archive note:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to archive note.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      hideLoading();
    }
  }

  async function unarchiveNote(noteId) {
    showLoading();
    try {
      const response = await fetch(`${url}/${noteId}/unarchive`, {
        method: "POST",
      });
      const result = await response.json();
      if (result.status === "success") {
        await renderNotes();
        await renderArchivedNotes();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Note unarchived successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to unarchive note:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to unarchive note.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      hideLoading();
    }
  }

  addNoteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addNote();
  });

  showArchivedBtn.addEventListener("click", () => {
    archivedNotesList.classList.toggle("hidden");
    if (!archivedNotesList.classList.contains("hidden")) {
      renderArchivedNotes();
      showArchivedBtn.textContent = "Hide Archived Notes";
    } else {
      showArchivedBtn.textContent = "Show Archived Notes";
    }
  });

  renderNotes();
});
