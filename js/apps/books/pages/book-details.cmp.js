import { bookService } from '../services/book.service.js'
import longText from '../cmps/long-text.cmp.js'
import reviewAdd from '../cmps/review-add.cmp.js'


export default {
    template:`
        <section class="book-details" v-if="book">
            <h1>Book details</h1>
            <div class="book-details-container">
                <div class="images"> 
                    <img class="book-img" :src="book.thumbnail" />
                    <img class="sale" v-if="onSale" src="./img/sale Sign.gif" />
                </div>
                <div class="book-details">
                    <p class="subtitle">Book Subtitle: {{book.subtitle}}</p>
                    <p class="publish-date">{{bookPublishedDate}}</p>
                    <p class="price" :class="classPrice">Price: {{currPrice}}</p>
                    <p class="lang"> Language: {{book.language}}</p>
                    <p class="author">Author: {{currAuthors}}</p>
                    <p class="">Categories: {{currCategories}}</p>
                    <long-text :txt="book.description"></long-text>
                </div>
            </div>
            <div v-if="nextPrevBookIds">
                <router-link :to="nextPrevBookIds.prevId">PREV</router-link>
                <router-link :to="nextPrevBookIds.nextId">NEXT</router-link>
            </div>

            <review-add></review-add>
        </section>
        `,
    data(){
        return {
            book: null,
            nextPrevBookIds : null
        }
    },
    created(){
        this.getCurrBook()
    },
    computed: {
        pageCount() {
            var count = this.book.pageCount
            return (count > 500) ? 'Long reading' : (count > 200) ? 'Decent Reading' : 'Light Reading';
        },
        bookPublishedDate() {
            var yearPassed = new Date().getFullYear() - this.book.publishedDate;
            var text = (yearPassed > 10) ? 'Veteran Book' : 'New!';
            return `Publish at: ${this.book.publishedDate} - ${text}`
        },
        classPrice() {
            return (this.book.listPrice.amount > 150) ? 'red' : (this.book.listPrice.amount < 20) ? 'green' : '';
        },
        currPrice() {
            var currency = this.book.listPrice.currencyCode
            var curr = (currency === 'USD') ? '$' : (currency === 'ILS') ? '₪' : '€';
            return this.book.listPrice.amount + curr;
        },
        currCategories() {
            return this.book.categories.join(', ')
        },
        currAuthors() {
            return this.book.authors.join(', ')
        },
        onSale() {
            return this.book.listPrice.isOnSale;
        }
    },
    watch: {
        '$route'(){
            this.getCurrBook()
        }
    },
    methods:{
        getCurrBook(){
            const bookId = this.$route.params.bookId
            bookService.getBookById(bookId)
                .then(book => {
                    this.book = book
                    this.nextPrevBookIds = bookService.getNextPrevBookIds(bookId);  
                })
        }
    },
    components:{
        'long-text': longText,
        'review-add':reviewAdd
    }
}