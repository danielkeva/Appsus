import { eventBus } from "../../../services/event-bus.service.js"
import noteEdit from './note-edit.cmp.js'

export default{
    template:`
    <section class="note-actions-container">
        <div class="note-item-actions">
            <div @click="emitNoteSettings('pin')" title="Pin note" class="action fas fa-thumbtack"></div>
            <div @click="emitNoteSettings('mark')" title="Mark note" class="action fas fa-check"></div>
        
            <div class="fas fa-palette color-picker action">
                <div class="color-dropdown" >
                    <span v-for="color in colors" @click="noteChangeColor('change', $event)" :style="'background-color:' + color"></span>
                </div>
            </div>

            <div @click="openCloseEdit" title="Edit note" class="far fa-edit action"></div>
            <div @click="emitNoteSettings('clone')" title="Clone note" class="fas fa-clone action"></div>
            <div @click="onDeleteNote" title="Delete note" class="fas fa-trash-alt action"></div>
            <div @click="sendAsEmail" title="Send note" class="far fa-paper-plane action"></div>
        </div>
        <note-edit :note="note" v-if="isEdit" @chancel="openCloseEdit" @update="noteEdit" ></note-edit>
    </section>
    `,
    props:['note'],
    data(){
        return{
            isEdit: false,
            colors: [
                'rgb(255, 255, 255);',
                'rgb(255, 136, 136);',
                'rgb(255, 204, 136);',
                'rgb(255, 255, 136);',
                'rgb(204, 255, 153);',
                'rgb(170, 255, 238);',
                'rgb(136, 221, 255);',
                'rgb(136, 187, 255);',
                'rgb(221, 187, 255);',
                'rgb(221, 221, 221);',
            ]
        }
    },
    methods:{
        emitNoteSettings(action) {
            var setting = {action, note: this.note}
            eventBus.$emit('settings', setting) 
        },
        onDeleteNote(){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.emitNoteSettings('delete')
                    Swal.fire(
                        'Deleted!',
                        'Your note has been deleted.',
                        'success'
                    )
                }
            })
        },
        openCloseEdit(){
            this.isEdit = !this.isEdit
        },
        noteEdit(settings){
            this.openCloseEdit()
            eventBus.$emit('settings', settings)
        },
        noteChangeColor(action , ev){
            var color = ev.target.style.backgroundColor
            var setting = {action, note: this.note, color}
            eventBus.$emit('settings', setting)   
        },
        getTodoAsTxt(todos) {
            var todosStr = todos.map(todo => {
                return todo.txt + '\n'
            })
            return todosStr
        },
        sendAsEmail() {
            Swal.fire({
                title: 'Do you want to send this note by Email?',
                text: 'You will be moved to another page',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.value) {
                    var emailMsg = {
                        title: '',
                        txt: ''
                    }
                switch(this.note.type){

                    case 'noteImg':
                        emailMsg.txt = 'Check out that image! : ' + this.note.info.url
                        break;
                    case 'noteVideo':
                        emailMsg.txt = 'Check out that video! : ' + this.note.info.url
                        break;
                    case 'noteAudio':
                        emailMsg.txt = 'Check out that audio! : ' + this.note.info.url
                        break;
                    case 'noteText':
                        emailMsg.txt = this.note.info.txt
                        break;
                    case 'noteTodos':
                        emailMsg.txt = 'Todos : \n' + this.getTodoAsTxt(this.note.todos)
                }
                emailMsg.title = this.note.info.title
                this.$router.push({ path: '../email/new/', query: { title: emailMsg.title, txt: emailMsg.txt } })
                }
            })
        },
    },
    components: {
        noteEdit
    }
}
