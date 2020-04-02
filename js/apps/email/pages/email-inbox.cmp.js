import { emailService } from '../services/email.service.js'
import { noteService } from '../../keep/services/note-service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailList from '../cmps/email-list.cmp.js'

export default {
  template: `
          <section class="email-inbox">
              <email-filter @set-sort="setSort" @set-filter="setFilter"></email-filter> 
              <email-list :emails="emailsToShow"  @deleteClicked="deleteEmail"></email-list>
          </section>
    `,
  components: {
    emailList,
    emailFilter
    
  },
  data() {
    return {
      emails: [],
      filterBy: null,
      mailbox: null,
      sortBy: null
    }
  },
  computed: {
    emailsToShow() {
      var mailboxEmails
      if (!this.mailbox) {
        mailboxEmails = this.emails.filter(email => !email.isDraft)
      } else {
        mailboxEmails = this.emails.filter(email => {
          if (this.mailbox === 'starred') return email.isStarred
          if (this.mailbox === 'draft') return email.isDraft
          if (this.mailbox === 'sent') return email.isSent
        })
      }
      if (!this.filterBy) return mailboxEmails
      var regex = new RegExp(`${this.filterBy.text}`, 'i')
      var filteredEmails = mailboxEmails.filter(email => {
        return (
          (regex.test(email.subject) ||
            regex.test(email.from) ||
            regex.test(email.body)) &&
          (this.filterBy.read === 'All' ? email : this.filterBy.read === 'Read' ? email.isRead : !email.isRead))})
      return filteredEmails
    }
  },
  watch: {
    '$route.params.filter'() {
      const mailbox = this.$route.params.filter
      this.setMailbox(mailbox)
    }
  },
  created() {
    this.getEmails()
    eventBus.$on('starred', email => this.starEmail(email))
    eventBus.$on('delete', emailId => this.deleteEmail(emailId))
    eventBus.$on('saveNote', noteContent => noteService.addNewNote(noteContent))

    eventBus.$on('emailClicked', currEmail => {
      emailService.updateIsRead(currEmail.email, currEmail.toggleMark)
    })
    const mailbox = this.$route.params.filter
    if (mailbox) {
      this.setMailbox(mailbox)
    }
  },

  destroyed() {
    eventBus.$off('delete')
    eventBus.$off('emailClicked')
    eventBus.$off('starred')
  },
  methods: {
    getEmails() {
      emailService.getEmails().then(emails => {
        this.emails = emails
      })
    },
    setSort(sortBy) {
      if (!sortBy) return
      if (sortBy === 'title') {
        this.emails.sort((a, b) => {
          var titleA = a.subject.toUpperCase()
          var titleB = b.subject.toUpperCase()
          return titleA < titleB ? -1 : titleA > titleB ? 1 : 0
        })
      } else {
        this.emails.sort((a, b) => {
          return b.sentAt - a.sentAt
        })
      }
    },

    deleteEmail(emailId) {
      emailService.deleteEmail(emailId).then(idx => {
        this.emails.splice(idx, 1)
      })
    },
    starEmail(email) {
      emailService.starEmail(email)
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
    setMailbox(mailbox) {
      this.mailbox = mailbox
    }
  }
}
