import { emailService } from '../services/email.service.js'
import {eventBus} from '../../../services/event-bus.service.js'

export default {
  template: `
        <section class="email-compose">
        <div class="email-compose-header">New Message</div>
            <form class="email-form" @submit.prevent="sendEmail">
                <input type="text" placeholder="To:"/>
                <input type="text" class="subject-input" v-model="email.subject" placeholder="Subject" required/>
                <textarea class="email-body-input" v-model="email.body"></textarea>
                <div class="compose-btns">
                <button class="compose-send-btn">Send</button>
                <button @click.prevent="saveDraft" class="compose-draft-btn">Draft</button>
                </div>
            </form>
        </section>
    `,
  data() {
    return {
      email: { subject: null, body: null }
    }
  },
  created() {
    this.loadEmail()
    this.loadNote()
  },
  methods: {
    sendEmail() {
      emailService.saveEmail(this.email, true).then(() => {
          this.$router.push('/email/list')
          
          const msg = {
              txt: `The email succefully sent`,
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
    },
    saveDraft() {
      emailService.saveEmail(this.email, false).then(() => {
        this.$router.push('/email/list/draft')
      })
    },
    loadNote() {
      const loadedNote = this.$route.query
      this.email.subject = loadedNote.title
      this.email.body = loadedNote.txt
    },
    loadEmail() {
      const emailId = this.$route.params.id
      if (emailId) {
        emailService.getEmailById(emailId).then(email => {
          const emailCopy = JSON.parse(JSON.stringify(email))
          this.email = emailCopy
          this.email.subject = 'Re:'.concat(this.email.subject)
        })
      }
    }
  },
  watch: {
    '$route.params.id'() {
      this.loadEmail()
    }
  }
}
