
export default {
    template: `
    <section class="note-filter">
        <div class="filter-inputs">
            <input class="title-search" type="text" v-model="filterBy.title" placeholder="Search by title...">
            <v-select class="filter-options" multiple v-model="filterBy.type" :options="['Text','Image','Video','Audio', 'List']" /> </v-select>
        </div>
    </section>`,
    data() {
        return {
            filterBy: {
                type: [],
                title:''
            },
        }
    },
    watch: {
        filterBy: {
            handler() {
                this.emitFilter();
            },
            deep: true
        } 
     },
    methods:{
        emitFilter() {
            this.$emit('set-filter', this.filterBy)
        }
    },
    components:{
        'v-select': VueSelect.VueSelect
    },
    
}

