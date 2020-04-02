import { eventBus } from "../services/event-bus.service.js";

export default {
  template: `
        <div class="book-preview">
            <router-link v-if="isDetailsPage" :to="'/books/'+book.id">
                <img class="book-img" :src="book.thumbnail" />
            </router-link>
        
            <template v-else>
                <img class="book-img" :src="book.thumbnail" />
                <button @click="addGoogleBook">+</button>
            </template>
            
            <p class="book-title">{{book.title}}</p>
            <p class="book-price">{{currPrice}}</p>
            <!-- <img class="saleImg" v-if="onSale" src="./img/sale Sign.gif" /> -->
        </div>
    `,
  data() {
    return {
      isDetailsPage: false
    };
  },

  props: ["book"],

  created() {
    this.isDetails();
  },

  computed: {
    currPrice() {
      var currency = this.book.listPrice.currencyCode;
      var curr = currency === "USD" ? "$" : currency === "ILS" ? "₪" : "€";
      return this.book.listPrice.amount + curr;
    },
    onSale() {
      return this.book.listPrice.isOnSale;
    }
  },
  methods: {
    isDetails() {
      this.isDetailsPage = this.$route.path !== "/books/add";
    },
    addGoogleBook() {
      eventBus.$emit("addGBook", this.book);
    }
  }
};
