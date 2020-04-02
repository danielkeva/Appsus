
import emailSidebar from './cmps/email-sidebar.cmp.js'

export default {
    template: `
        <section class="email-main">
        <email-sidebar></email-sidebar>
        <router-view></router-view>
        </section>`,
    components: {
        emailSidebar
    }
}