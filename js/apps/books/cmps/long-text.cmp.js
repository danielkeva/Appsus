export default {
    template:`
        <section class="long-text">
            <p>{{textToDisplay}}</p>
            <button v-if="isLongText" @click="toggelText">{{readBtnText}}</button> 
        </section>
        `,

    props: ['txt'],

    data(){
        return {
            readBtnText: 'Read more...',
            showAll: false,
            isLongText: true
        }
    },

    computed: {
        textToDisplay(){
            if(!this.showAll && this.txt.length >= 100) return this.txt.substring(0,100)+'...';
            return this.txt
        },
    },
    methods:{
        toggelText(){
            this.readBtnText = this.showAll ? 'Read more...': 'Read less'; 
            this.showAll = !this.showAll
        }
    },
    created(){
        this.isLongText = (this.txt.length > 100);
    }
}