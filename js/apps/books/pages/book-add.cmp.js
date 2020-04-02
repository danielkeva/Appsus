import { bookService } from "../services/book.service.js";
import { eventBus } from "../services/event-bus.service.js";

import bookList from "../cmps/book-list.cmp.js";

export default {
  template: `
    <section class="add-book-container">
        <form @submit.prevent="getGoogleBooks(value)">
        <input type="text" placeholder="Search for book..." v-model="value">
        </form>
        <book-list :books="googleBooks"></book-list>
        
    </section>
    `,

  created() {
    this.addBook();
  },

  data() {
    return {
      googleBooks: null,
      value: ""
    };
  },
  methods: {
    getGoogleBooks(value) {
      bookService.getGBooks(value).then(books => (this.googleBooks = books));
    },
    addBook() {
      eventBus.$on("addGBook", googleBook => {
        bookService.addGoogleBook(googleBook);
        eventBus.$emit("msg", {
          txt: "book Added",
          type: "success",
          link: "/books/" + googleBook.id
        });
      });
    }
  },
  components: {
    "book-list": bookList
  }
};
