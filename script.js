let titles = [];
let notes = [];

let deletedTitles = [];
let deletedNotes = [];


function init(){
  load();
  loadDeletedNotes();
  render();
  
}


function render() {
  let content = document.getElementById("content");
  
  content.innerHTML = `
    <div class="input-section">
    <div class="notefield">
    <input type="text" placeholder="Titel" id="note-title"  class="d-none">
    <textarea placeholder="Notiz eingeben..." id="note-content" onclick="showTextarea()"></textarea>
    <button id="addbutton" class="d-none" onclick="addNote()">Notiz hinzufügen </button>
    </div>
    </div>
    <div class="notes-container">
    <div class="note-section" id="noteSection">
    </div>
    <div class="deletedNoteSection d-none" id="deletedNoteSection">
    </div>
    </div>
    `;

    noteSection.innerHTML = '';

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    const note = notes[i];
    let noteSection = document.getElementById('noteSection');
    noteSection.innerHTML += `
      <div class="notecard" id="addNotecard">
      <b>${title}</b><br>
      ${note}
      <button onclick="deleteNote(${i})">Notiz löschen</button>
      </div>
      `;
  }
  renderDeletedNotes();
}


function showTextarea() {
  let showTitle = document.getElementById("note-title"); // greift auf die ID 'note-title' zu
  let showButton = document.getElementById("addbutton"); // greift auf die ID 'addbuton' zu

  showTitle.classList.remove("d-none"); // Entfernt die CSS-Klasse 'd-none' und zeigt das Eingabefeld 'Titel' an
  showButton.classList.remove("d-none"); // Entfernt die CSS-Klasse 'd-none' und zeigt den Button 'Notiz hinzufügen' an
}


function addNote() {
  let title = document.getElementById("note-title");
  let note = document.getElementById("note-content");
  if(title.value === '' || note.value === '') {
    noteSection.innerHTML = `
    <div>
    <p class="empty-notes">Bitte keine leeren Notizen erstellen!</p>
    </div>
    `;
  } else {
  titles.push(title.value);
  notes.push(note.value);
  save();
  render();
  }
}


function deleteNote(i) {
  deletedTitles.push(titles[i]); // verschiebt die gespeicherte Notiz in den Array 'deletedTitles'
  deletedNotes.push(notes[i]); // verschiebt die gespeicherte Notiz in den Array 'deletedNotes'
  titles.splice(i, 1);
  notes.splice(i, 1);
  save();
  saveDeletedNotes();
  render();
}


function save() {
  let titlesAsText = JSON.stringify(titles);
  localStorage.setItem("titles", titlesAsText);
  let notesAsText = JSON.stringify(notes);
  localStorage.setItem("notes", notesAsText);
}


function load() {
  let titlesAsText = localStorage.getItem("titles");
  let notesAsText = localStorage.getItem("notes");
  if (titlesAsText && notesAsText) {
    titles = JSON.parse(titlesAsText);
    notes = JSON.parse(notesAsText);
  }
}


function renderDeletedNotes() {
  loadDeletedNotes();
  let trashContent = document.getElementById("deletedNoteSection");
  trashContent.innerHTML = "";

  for (let i = 0; i < deletedTitles.length; i++) {
    const title = deletedTitles[i];
    const note = deletedNotes[i];
    trashContent.innerHTML += `
      <div class="notecard deletedNotecard">
      <b>${title}</b><br>
      ${note}
      <button onclick="restore(${i})">Wiederherstellen</button>
      <button onclick="deleteComplete(${i})">Endgültig löschen</button>
      </div>
    `;
  }
}


function showDeletedNotes(){
  document.getElementById('deletedNoteSection').classList.remove('d-none');
  document.getElementById('noteSection').classList.add('d-none');
}


function showAddedNotes(){
  document.getElementById('noteSection').classList.remove('d-none');
  document.getElementById('deletedNoteSection').classList.add('d-none');
}
function saveDeletedNotes(){
  let deletedTitlesAsText = JSON.stringify(deletedTitles);
  localStorage.setItem("deletedTitles", deletedTitlesAsText);
  let deletedNotesAsText = JSON.stringify(deletedNotes);
  localStorage.setItem("deletedNotes", deletedNotesAsText);
}


function loadDeletedNotes(){
  let deletedTitlesAsText = localStorage.getItem("deletedTitles");
  let deletedNotesAsText = localStorage.getItem("deletedNotes");
  if (deletedTitlesAsText && deletedNotesAsText) {
    deletedTitles = JSON.parse(deletedTitlesAsText);
    deletedNotes = JSON.parse(deletedNotesAsText);
}
}


function restore(i){
  titles.push(deletedTitles[i]); 
  notes.push(deletedNotes[i]); 
  deletedTitles.splice(i, 1);
  deletedNotes.splice(i, 1);
  save();
  saveDeletedNotes();
  render();
}


function deleteComplete(i) {
  deletedTitles.splice(i, 1);
  deletedNotes.splice(i, 1);
  save();
  saveDeletedNotes();
  render();
  showDeletedNotes();
}


