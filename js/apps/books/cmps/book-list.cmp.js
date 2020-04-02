import bookPreview from "./book-preview.cmp.js";

export default {
  template: `
    <section class="books-list">
        <book-preview v-for="(book , idx) in books" :book="book" :key="book.id"></book-preview>
    </section>`,
  props: ["books"],
  components: {
    "book-preview": bookPreview
  }
};
