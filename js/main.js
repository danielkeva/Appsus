import { router } from './routers.js';

import { eventBus } from './services/event-bus.service.js'
import mainNav from './cmps/main-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
import userMsg from './cmps/user-msg.cmp.js';

new Vue({
  el: "#app",
  router,
  template: `
        <section class="appsus-app">
            <main-nav></main-nav>
            <user-msg></user-msg>
            <router-view></router-view>
            <app-footer></app-footer>
        </section>`,
  components: {
    mainNav,
    appFooter,
    userMsg
  }
});
