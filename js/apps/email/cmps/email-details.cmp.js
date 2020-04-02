import { emailService } from '../services/email.service.js'

export default {
    template: `
        <section class="email-details" v-if="currEmail">
            <div class="email-det-subject">{{currEmail.subject}}</div>
            <div class="from-det">From: {{currEmail.from}} <span>{{formattedDate}}</span></div>
            <div class="email-body-det">{{currEmail.body}}</div>
            
        </section>
    `,
    data() {
        return {
            currEmail: null,
        }
    },computed:{
        formattedDate() {
            return moment(this.currEmail.sentAt).calendar()
          }
    },
    created() {
        this.getCurrEmail()
    },
    watch: {
        '$route'() {
            this.getCurrEmail()
        }
    },
    methods: {
        getCurrEmail() {
            const emailId = this.$route.params.id
            emailService.getEmailById(emailId)
                .then(email => {
                    this.currEmail = email
                })
        }
    }
}