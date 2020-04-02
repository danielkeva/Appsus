import { noteService } from "../services/note-service.js";
import {eventBus} from '../../../services/event-bus.service.js';

export default {
  template: `
    <section class="note-add">
      <form class="add-input" @submit="addNote">
        <input ref="title" type="text" placeholder="Enter title..." v-model="newTitle" required>
        <input ref="content" type="text" :placeholder="placeholder" v-model="noteContent" required>
        <button>Save</button>
      </form>

      <form class="add-button-container">
        <input id="txt" type="radio" value="noteText" v-model="addNewType">
        <label for="txt" class="fas fa-font fa-2x add-btn"></label>
        <input id="img" type="radio" value="noteImg" v-model="addNewType">
        <label for="img" class="fas fa-image fa-2x add-btn"></label>
        <input id="video" type="radio" value="noteVideo" v-model="addNewType">
        <label for="video" class="fab fa-youtube fa-2x add-btn"></label>
        <input id="audio" type="radio" value="noteAudio" v-model="addNewType">
        <label for="audio" class="fas fa-volume-up fa-2x add-btn"></label>
        <input id="todo" type="radio" value="noteTodos" v-model="addNewType">
        <label for="todo" class="fas fa-list-ul fa-2x add-btn"></label>
      </form>
      
    </section>
    `,
  data() {
    return {
      addNewType: "noteText",
      placeholder: "Enter your text...",
      newTitle: '',
      noteContent: '',
    };
  },
  watch:{
    addNewType(){
      this.getPlaceHolder()
    }
  },
  methods: {
    getPlaceHolder(){
        switch(this.addNewType){
            case 'noteText':
                this.placeholder = 'Enter your text...'
                break;
            case 'noteTodos':
                this.placeholder = 'Enter comma separated list...'
                break;
            case 'noteImg':
                this.placeholder = 'Enter image URL...'
                break;
            case 'noteAudio':
                this.placeholder = 'Enter Audio URL...'
                break;
            case 'noteVideo':
                this.placeholder = 'Enter video URL...'
        }
    },
    addNote(){
        this.$refs.title.value = ''
        this.$refs.content.value = ''

        var value = {
          title: this.newTitle,
          content: this.noteContent
        }
        if(!value.title || !value.content) return;
        noteService.addNewNote(value, this.addNewType)
          .then(note => {
              this.$emit('addNewNote', note)
              const msg = {
                  txt: `The note succefully add`,
                  type: 'success'
              }
              eventBus.$emit('show-msg', msg);
          })
          .catch(err => {
              const msg = {
                  txt: `There was a problem ${err}`,
                  type: 'error'
              }
              eventBus.$emit('show-msg', msg);
          })

        }
    }
};
