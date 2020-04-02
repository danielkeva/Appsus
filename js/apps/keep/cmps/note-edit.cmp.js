export default{
    template:`
    <section class="note-edit">
        <input type="text" v-model="val" :placeholder="placeholder">
        <button @click="emitChancel" class="chancel">Chancel</button>
        <button @click="emitUpdate" class="update">Update</button>
    </section>
    `,
    props: ['note'],
   data(){
       return{
            placeholder: '',
            val: ''
       }
   },
   created(){
    this.getPlaceHolder()
   
   },

   methods:{
        emitUpdate() {
            this.$emit('update', {action:'edit', note:this.note, val: this.val})
        },
        emitChancel(){
            this.$emit('chancel',this.note)
        },
        getPlaceHolder(){
            switch(this.note.type){
                case 'noteText':
                    this.placeholder = this.note.info.txt
                    break;
                case 'noteTodos':
                    this.placeholder = this.getTodos()
                    break;
                case 'noteAudio':
                case 'noteImg':
                case 'noteVideo':
                    this.placeholder = this.note.info.url
            }
        },
        getTodos(){
            var arrTodos = this.note.info.todos.map(todo => todo.txt)
            var todos = arrTodos.join(',')
            return todos;
        }
   }
   
}
