import noteText from './notes-type/note-text.cmp.js'
import noteImg from './notes-type/note-img.cmp.js'
import noteTodos from './notes-type/note-todos.cmp.js'
import noteActions from './note-actions.cmp.js'
import noteVideo from './notes-type/note-video.cmp.js'
import noteAudio from './notes-type/note-audio.cmp.js'


export default {
    template:`
        <div class="note" :style="note.style" :class="[isMark, isPinned]" >
            <component :class="note.type" :is="note.type" :info="note.info"></component>
            <note-actions :note="note"></note-actions>
        </div>
    `,
    props: ['note'],
    components:{
        noteText,
        noteImg,
        noteTodos,
        noteActions,
        noteVideo,
        noteAudio
    },
    computed:{
        isMark(){
           return (this.note.isMark)? 'mark': '';
        },
        isPinned(){
            return (this.note.isPinned)? 'fas fa-thumbtack' : '';
        },
       
    }
}



