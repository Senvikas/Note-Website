console.log('you are in note.js');
showNotes();
 let addBtn=document.getElementById('addBtn');
 addBtn.addEventListener("click", function(e) {
    let addNoteTitle = document.getElementById("addNoteTitle");
    let addNoteTxt = document.getElementById("addNoteTxt");
    let notes = localStorage.getItem("myNotes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    notesObj.push(addNoteTitle.value);
    notesObj.push(addNoteTxt.value);
    localStorage.setItem("myNotes", JSON.stringify(notesObj));
    addNoteTitle.value = "";
    addNoteTxt.value = "";
    showNotes();
  });
  function showNotes() {
    let notes = localStorage.getItem("myNotes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {

        if(index%2==0){
            html += `
                      <div class="NoteCard mx-3 my-3" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">${element}</h5>
                          <p class="card-text">${notesObj[index+1]}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                      </div>
                      </div>
                      `;
        }
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}
function deleteNote(index) {
      let notes = localStorage.getItem("myNotes");
      if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
    
      notesObj.splice(index, 2);
      localStorage.setItem("myNotes", JSON.stringify(notesObj));
      showNotes();
}
searchNote=document.getElementById("searchNote");
searchNote.addEventListener("input",function(){
    InputVal=searchNote.value;
    // console.log(InputVal);
    let noteCards = document.getElementsByClassName('NoteCard');
    let flag=0;
    showNotes();
    // console.log(noteCards);
    Array.from(noteCards).forEach(function(element){
        let title=element.getElementsByTagName("h5")[0].innerText;
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(InputVal) || title.includes(InputVal) ){
            element.style.display = "block";
            flag=1;
        }
        else{
            element.style.display = "none";
        }
    })
    if(!flag){
      let notesElm = document.getElementById("notes");
      notesElm.innerHTML = `<h1>No Match </h1>`;
    }
})