import {utilService} from '../../../services/util.service.js'
import {storageService} from '../../../services/storage.service.js'
import noteTextCmp from '../cmps/notes-type/note-text.cmp.js';


const NOTE_KEY = 'note';

const notesDB = [ 
    {
        type: "noteText",
        id: utilService.makeId(),
        isPinned: true,
        isMark: false,
        info: {
            title: 'my text',
            txt: "Fullstack Me Baby!" 
        },
        style: { 
            backgroundColor: "#ffffff"
        } 
    }, 
    {
        type: "noteImg",
        id: utilService.makeId(),
        isPinned: true,
        isMark: false,
        info: {
            title: "After the sprint",
            url: "https://yesno.wtf/assets/yes/6-304e564038051dab8a5aa43156cdc20d.gif"
        },
        style: { 
            backgroundColor: "#ffffff"
        } 
    },
    {
        type: "noteTodos",
        id: utilService.makeId(),
        isPinned: true,
        isMark: false,
        info: {
            title: "Things to do:",
            todos: [
                { txt: "Do that", doneAt: null ,isDone: false},
                { txt: "Do this", doneAt: 187111111, isDone: false }
            ]
        },
        style: { 
            backgroundColor: "#ffffff"
        }  
    },
    {
        type: "noteVideo",
        id: utilService.makeId(),
        isPinned: false,
        isMark: true,
        info: {
            title: "B.B.King",
            url: "https://www.youtube.com/embed/Y57kLy1vV1c"
            
        },
        style: { 
            backgroundColor: "#ffffff"
        }  
    },
    {
        type: "noteAudio",
        id: utilService.makeId(),
        isPinned: true,
        isMark: true,
        info: {
            title: "audio in note",
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        },
        style: { 
            backgroundColor: "#ffffff"
        }  
    },
    {
        type: "noteImg",
        id: utilService.makeId(),
        isPinned: true,
        isMark: false,
        info: {
            title: "yes image",
            url: "https://yesno.wtf/assets/yes/2-5df1b403f2654fa77559af1bf2332d7a.gif"
        },
        style: { 
            backgroundColor: "#ffffff"
        } 
    },
    
];

export const noteService = {
    getNotes,
    setNote,
    replaceNote,
    addNewNote,
    sendNote
}

function getNotes() {
    var notes = storageService.load(NOTE_KEY);
    if (notes) return Promise.resolve(notes);
    notes = notesDB;
    storageService.store(NOTE_KEY, notes)
    return Promise.resolve(notes);
}

function setNote(settings){
    switch(settings.action){
        case 'pin':
            pinNote(settings.note)
            break;
        case 'mark':
            markNote(settings.note)
            break;
        case 'change':
            changeColorNote(settings.note, settings.color)
            break;
        case 'edit':
            editNote(settings)
            break;
        case 'clone':
            cloneNote(settings.note)
            break;
        case 'delete':
            deleteNote(settings.note)
            break;
    }
    return Promise.resolve()
}

function pinNote(note){
    note.isPinned = !note.isPinned
    replaceNote(note)  
}

function markNote(note){
    note.isMark = !note.isMark
    replaceNote(note)
}

function changeColorNote(note, color){
    note.style.backgroundColor = color;
    replaceNote(note);
}

function editNote(settings){
    switch(settings.note.type){
        case 'noteText':
            settings.note.info.txt = settings.val
            break;
        case 'noteTodos':    
        var todos = settings.val.split(',')
        todos.forEach((todo, idx) => {
            if(!settings.note.info.todos[idx]) settings.note.info.todos[idx] = {txt: ''}
            settings.note.info.todos[idx].txt = todo
        })
        break;
        case 'noteImg':
            settings.note.info.url = settings.val
            break;
        case 'noteAudio':
            settings.note.info.url = settings.val
            break;
        case 'noteVideo':
            var id = _getYoutubeVidId(settings.val)
            settings.note.info.url = `https://www.youtube.com/embed/${id}`
            break;
    }
    replaceNote(settings.note)
}

function cloneNote(currNote){
    var note = currNote
    var notes = storageService.load(NOTE_KEY);
    var idx = notes.findIndex(note => note.id === currNote.id)
    note.id = utilService.makeId()
    notes.splice(idx+1, 0, note)
    storageService.store(NOTE_KEY, notes)
}

function deleteNote(currNote){
    var notes = storageService.load(NOTE_KEY);
    var idx = notes.findIndex(note => note.id === currNote.id)
    notes.splice(idx, 1)
    storageService.store(NOTE_KEY, notes)
}

function replaceNote(currNote){
    var notes = storageService.load(NOTE_KEY);
    var idx = notes.findIndex(note => note.id === currNote.id)
    notes.splice(idx, 1, currNote)
    storageService.store(NOTE_KEY, notes)
}

function addNewNote(value, type = 'noteText'){
    var info = {}
    switch(type){
        case 'noteVideo':
            var id = _getYoutubeVidId(value.content)
            info = {
                title: value.title,
                url: 'https://www.youtube.com/embed/'+ id
            }
            break;
        case 'noteImg':
            info = {
                title: value.title,
                url: value.content
            }
            break;
        case 'noteAudio':
            info = {
                title: value.title,
                url: value.content
            }
            break;
        case 'noteTodos':
            info = {
                title: value.title,
                todos: _addTodos(value.content)
            }
            break;
        case 'noteText':
            info = {
                title: value.title,
                txt: value.content
            }
    }   
    var note = {
        type,
        id: utilService.makeId(),
        isPinned: false,
        isMark: false,
        info,
        style: { 
            backgroundColor: "#ffffff"
        } 
    }
    var notes = storageService.load(NOTE_KEY);
    notes.unshift(note)
    storageService.store(NOTE_KEY, notes)
    return Promise.resolve(note);
}

function _addTodos(value){
    var values = value.split(',')
    var todos = values.map(value => {
        return { 
            txt: value,
            doneAt: new Date().getTime()
        }
    })
    return todos; 
}

function sendNote(value){
    router.push({path:`/email/new/${value}`})
}

function _getYoutubeVidId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : '';
}