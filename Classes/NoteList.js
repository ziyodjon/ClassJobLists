import { Note } from "./Note.js";

export class NoteList{
    _note = [];
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
            this._note.push(newNote); 
        }

        this.checkEmpty();
        this.saveToLocalStorage();
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
        this.saveToLocalStorage();
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

    saveToLocalStorage(){
        if(this._key){
            let saveLists = [];
            console.log(this._note);
            for (const note of this._note) {
                console.log(note);
                saveLists.push({
                    id:note.id,
                    name:note.name,
                    done:false,
                });
            
                localStorage.setItem(this._key,JSON.stringify(saveLists));
            }
        }
    }

    getFromLocalStorage(){
        let startList = [];
        this._note = [];
        this.list.innerHTML = '';

        if(this._key){
            let dataLS = localStorage.getItem(this._key);
            if(dataLS !== '' && dataLS !== null) startList = JSON.parse(dataLS);
        }

        if(startList.length > 0){
            for (const obj of startList) {
                let newNote = new Note(this, obj.name);

                if(obj.id){
                    newNote.id = obj.id;
                }else{
                    newNote.id = getNewId();
                }

                this._note.push(newNote);
            }
        }

        this.checkEmpty();
    }
}