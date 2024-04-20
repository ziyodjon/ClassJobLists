import { Note } from "./Note.js";

export class NoteList{
    _note = [];
    constructor(container){
        this.container = container;
        this.list = document.createElement('div');
        this.list.classList.add('list-group');
        this.checkEmpty();
        container.innerHTML = '';
        container.append(this.list);
        
    }

    add(name,done = false){
        if(name && name.trim()){
            let newNote = new Note(this,name,done);
            newNote.id = Date.now();
            this._note.push(newNote); 
        }

        this.checkEmpty();
    }

    removeList(value){
        let note = value;
        let id = '';

        if(value instanceof Note){
            id = note.id;
        }

        for(let i = 0; this._note.length > i; i++){
            if(this._note[i].id === id){
                this._note.splice(i,1);
            }
        }

        this.checkEmpty();
    }

    checkEmpty(){
        if(this._note.length == 0){

            this.empty = document.createElement('div');

            this.empty.classList.add(
                'd-flex',
                'list-group-item',
                'justify-content-center',
                'align-items-center',
                'text-secondary',
                'bg-light',
                'p-5'
            );

            this.empty.innerHTML = `<h4>List is empty</h4>`;
            this.list.append(this.empty);
        }else{
            if(this.empty){
                this.empty.remove();
            }
        }
    }
}