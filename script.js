let titles = [];
let notes = []; 

let deletedTitles = []; 
let deletedNotes = []; 

load();


function render(){
    let content = document.getElementById('content');
    content.innerHTML = `
    <div class="input-section">
    <div class="notefield">
    <input type="text" placeholder="Titel" id="note-title"  class="d-none">
    <textarea placeholder="Notiz eingeben..." id="note-content" onclick="showTextarea()"></textarea>
    <button id="addbutton" class="d-none" onclick="addNote()">Notiz hinzufügen </button>
    </div>
    </div>
    `;

    for(let i = 0; i < titles.length; i++) {
      const title = titles[i];
      const note = notes[i]; 
      content.innerHTML += `
      <div class="note-section">
      <div class="notecard">
      <b>${title}</b><br>
      ${note}
      <button onclick="deleteNote()">Notiz löschen</button>
      </div>
      </div>
      `;
    }
}


function addNote(){
    let title = document.getElementById('note-title'); 
    let note = document.getElementById('note-content');

    titles.push(title.value); 
    notes.push(note.value);

    render(); 
    save();
}


function deleteNote(i){
    for (let i = 0; i < titles.length; i++) {
        deletedTitles.push(titles[i]); 
        deletedNotes.push(notes[i]);
        titles.splice(i, 1);
        notes.splice(i, 1);
    }
    render(); 
    save();
}

function save(){
    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);
    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);

}


function load(){
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');
    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }
}


function showTextarea(){
    document.getElementById('note-title').classList.remove('d-none');
    document.getElementById('addbutton').classList.remove('d-none');
}


