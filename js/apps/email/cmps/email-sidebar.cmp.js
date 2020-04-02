export default {
  template: `
        <section class=email-sidebar-container>
          <div v-show="isMenuOpen" @click="toggleMenu" class="email-screen"></div>
          
          <div @click="toggleMenu" class="open-sidebar-btn fas fa-chevron-circle-right" :class="toggleNav">
                <!-- <div class="email-bar1"></div>
                <div class="email-bar2"></div>
                <div class="email-bar3"></div> -->
            </div>
        <div class="email-sidebar" :class="openSidebar">    
             <router-link class="newEmail-link" :to="'/email/new'" exact>New Email</router-link>    
             <router-link :to="'/email/list'" exact>Inbox</router-link>
             <router-link :to="'/email/list/'+'sent'">Sent</router-link>
             <router-link :to="'/email/list/'+'starred'">Starred</router-link>
             <router-link :to="'/email/list/'+'draft'">Draft</router-link>
      </div>   
    </section>
        
    `,
  data() {
    return {
      isMenuOpen: false
    }
  },
  computed: {
    toggleNav() {
      return { change: this.isMenuOpen }
    },
    openSidebar() {
      return { 'sidebar-open': this.isMenuOpen }
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
