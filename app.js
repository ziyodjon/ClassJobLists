import { Note } from './Classes/Note.js';
import { NoteList } from './Classes/NoteList.js';



// let newNote = new Note(document.getElementById('app'),'Name of item', false);

// document.getElementById('action').addEventListener('click',function(){
//     new Note(document.getElementById('app'),'Name of item', false);
// });

let noteList = new NoteList(document.getElementById('app'));

document.getElementById('action').addEventListener('click',function(){
    noteList.add(prompt('Type text to create note list:'));
});