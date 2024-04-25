import { ToDo } from './Classes/ToDo.js';



// let newNote = new Note(document.getElementById('app'),'Name of item', false);

// document.getElementById('action').addEventListener('click',function(){
//     new Note(document.getElementById('app'),'Name of item', false);
// });

let app = new ToDo(document.getElementById('app'));
app.addNewUser('Мои дела','my');
app.addNewUser('Дела Александра','alex');
app.addNewUser('Дела Андрея','andrew');
app.addNewUser('Дела Светы','light');

app.currentUser = 'my';

// document.getElementById('action').addEventListener('click',function(){
//     noteList.add(prompt('Type text to create note list:'),false);
// });