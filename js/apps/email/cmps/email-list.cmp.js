import emailPreview from './email-preview.cmp.js'
// @click.native="markRead(email)"
export default {
  template: `
        
         <div class="email-list">
            <template v-for="email in emails">
              <router-link :to="'/email/'+email.id">  
              
                  <email-preview :email="email" @contextmenu.prevent></email-preview>
              </router-link> 
            </template>
        </div>
    
    `,
  props: ['emails'],
  components: {
    emailPreview
  },
}
