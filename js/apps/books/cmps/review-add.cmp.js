import { bookService } from '../services/book.service.js'
import { eventBus } from '../services/event-bus.service.js'

import starRating from './star-rating.cmp.js'

export default {
  template: `
    <section class="review-container">
        <h1>Reviews</h1>
        <div class="review-content-container">
            <form class="review-form" @submit.prevent="saveReview">
            <star-rating v-model.number="review.rate" :star-size="20"></star-rating>
            <input v-model="review.date" required type="date" class="date-review" />
            <textarea v-model="review.text" class="review-text" cols="30" rows="5" placeholder="Write your review"></textarea>
            <button>Save Review</button>
            </form>
            <ul class="review-list" v-if="book"> 
                <li class="review-content" v-if="book.reviews.length" v-for="(review, idx) in book.reviews">
                    <button @click="deleteReview(idx)">X</button>
                    <p class="review-name">Name: {{review.name}}</p>
                    
                    <star-rating :read-only="true" v-model="review.rate" :star-size="20"></star-rating>
                    <p class="review-text">Review: "{{review.text}}"</p>
                    <p class="review-date">Date: {{review.date}}</p>
                </li>
            </ul>
        </div>
    </section>
    `,
  components:{
    'star-rating': starRating,
},
  data() {
    return {
      bookId: this.$route.params.bookId,
      book: null,
      review: {
        name: 'Books Reader',
        rate: null,
        date: null,
        text: null
      }
    }
  },

  created() {
    this.getCurrBook()
  },
  watch: {
    '$route.params.bookId'() {
      this.bookId = this.$route.params.bookId
      this.getCurrBook()
    }
  },

  methods: {
    saveReview() {
      bookService.addReview(this.book, this.review)
      eventBus.$emit('msg', { txt: 'Added A Review', type: 'success' })
    },
    deleteReview(idx) {
      bookService.deleteReview(this.book, idx)
      eventBus.$emit('msg', { txt: 'Deleteing A Review', type: 'success' })
    },
    getCurrBook() {
      bookService.getBookById(this.bookId).then(book => (this.book = book))
    }
  }
}
