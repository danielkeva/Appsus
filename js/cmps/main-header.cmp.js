import { eventBus } from '../services/event-bus.service.js'

export default {
  template: `
    <header class="main-header" >
    <div v-show="isMenuOpen" @click="toggleMenu" class="screen"></div>
    <router-link class="active" to="/" exact><h1 class="logo">Apps<span>u</span>s</h1></router-link>

      
        <div @click="toggleMenu" class="menu-btn" :class="toggleNav">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
            </div>
            <!-- @click="toggleMenu" -->
        <nav class="main-nav" :class="openMenu">
      
  
            <router-link to="/" exact>Home</router-link>
            <router-link to="/books">Miss Book</router-link>
            <router-link to="/email/list" >Mister Email</router-link>
            <router-link to="/missKeep">Miss Keep</router-link>
            <router-link to="/about">About</router-link>
           
        </nav>
    </header>
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
    toggleScreen() {
      return { 'screen-open': this.isMenuOpen }
    },
    openMenu() {
      return { 'menu-open': this.isMenuOpen }
    },
    
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    }
  }
}
