import {eventBus} from '../services/event-bus.service.js'


export default{
   template: `
   <section class="user-msg">
       <div v-if="isShown" class="msg" :class="'msg-'+msg.type">
        <p>{{msg.txt}}</p>
       <router-link v-if="msg.link" :to="msg.link">Check it Out</router-link>
       </div>
   </section>
   `,
    data(){
        return {
            isShownSuccess:false,
            isShown:false,
            
            msg:{}
        }
    },
    created(){
        eventBus.$on('msg', (msg) => {
            this.msg = msg
            this.isShown = true
            setTimeout(() => {
                this.isShown = false
            }, 2000);
        })
    }
}