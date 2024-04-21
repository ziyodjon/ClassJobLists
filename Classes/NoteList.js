import { Note } from "./Note.js";

export class NoteList{
    _notes = [];
    _key = null;
    constructor(container, key = null){
        this.container = container;
        this.list = document.createElement('div');
        this.list.classList.add('list-group');
        this._key = key;
        this.getFromLocalStorage();
        this.saveToLocalStorage();
        
        container.innerHTML = '';
        container.append(this.list);
    }

    getNewId(){
        return Date.now();
    }

    add(name,done = false){
        if(name && name.trim()){
            let newNote = new Note(this,name,done);
            newNote.id = this.getNewId();
            this._notes.push(newNote); 
        }

        this.saveToLocalStorage();
        this.checkEmpty();
        
    }

    removeList(value){
        // console.log(value.id);
        // console.log(this._notes);
        let note = value;
        let id = '';

        if(value instanceof Note){
            id = note.id;
        }
        
        for(let i = 0; this._notes.length > i; i++){
            
            if(this._notes[i].id == id){
                this._notes.splice(i,1);
                // console.log(this._notes[i].id);
                // console.log(id);
                this.checkEmpty();
        this.saveToLocalStorage();
            }
        }

        
        
        
    }

    checkEmpty(){
        if(this._notes.length == 0){

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

    saveToLocalStorage(){
        
        if(this._key){
            let saveLists = [];

            for (const note of this._notes) {
                saveLists.push({
                    id:note.id,
                    name:note.name,
                    done:note._done,
                });
            
                localStorage.setItem(this._key,JSON.stringify(saveLists));
            }
        }
    }

    getFromLocalStorage(){
        let startList = [];
        this._notes = [];
        this.list.innerHTML = '';

        if(this._key){
            let dataLS = localStorage.getItem(this._key);
            if(dataLS !== '' && dataLS !== null) startList = JSON.parse(dataLS);
        }

        if(startList.length > 0){
            
            for (const obj of startList) {
                let newNote = new Note(this, obj.name, obj.done);

                if(obj.id){
                    newNote.id = obj.id;
                }else{
                    newNote.id = getNewId();
                }

                this._notes.push(newNote);
            }
        }

        this.checkEmpty();
    }
}