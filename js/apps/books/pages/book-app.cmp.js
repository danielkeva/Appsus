import { bookService } from '../services/book.service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
import bookList from '../cmps/book-list.cmp.js'


export default {
    template: `
        <section class="book-app">
        <book-filter v-if="!isBookDetails" @set-filter="setFilter"></book-filter>
        <book-list v-if="!isBookDetails" :books="booksToShow" @selected="selectBook"></book-list>
        </section>
        `,

    data() {
        return {
            books: [],
            filterBy: null,
            isBookDetails: false,
            selectedBook: null
        }
    },

    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            return this.books.filter(book => {
                if (this.filterBy.title) {
                    return book.title.includes(this.filterBy.title)
                } else {
                    return (book.listPrice.amount > this.filterBy.fromPrice &&
                        book.listPrice.amount < this.filterBy.toPrice)
                }
            });
        },
    },
    created() {
        bookService.query()
            .then(res => this.books = res)
    },
    methods: {
        selectBook(id) {
            this.isBookDetails = !this.isBookDetails
            bookService.getBookById(id)
                .then(book => {
                    this.selectedBook = book
                })
        },
        closeDetails() {
            this.isBookDetails = !this.isBookDetails
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        },
    },
    components:{
        'book-filter':bookFilter,
        'book-list':bookList,
    }

}
