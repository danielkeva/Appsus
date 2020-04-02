export default {
  template: `
    <section class="book-filter">
        <div class="filter-inputs">
            <input type="text" placeholder="Start typing book name.." v-model="filterBy.title" @input="emitFilter"/>
            <span>Price from: {{filterBy.fromPrice}}</span>
            <input type="range" class="price-from" v-model="filterBy.fromPrice" name="from" min="0" max="500" @input="emitFilter" />
            <span>Price to: {{filterBy.toPrice}}</span>
            <input type="range" class="price-to" v-model="filterBy.toPrice" name="to" min="500" max="1000" @input="emitFilter" />
        </div>
    </section>`,
  data() {
    return {
      filterBy: { title: "", fromPrice: 0, toPrice: 500 }
    };
  },
  methods: {
    emitFilter() {
      this.$emit("set-filter", this.filterBy);
    }
  }
};
