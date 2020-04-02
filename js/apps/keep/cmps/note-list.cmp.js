
import notePreview from './note-preview.cmp.js'


export default{
    template: `
        <section class="note-list">
        <h1>Pinned Notes</h1>
        <div ref="noteGrid" class="note-pin-container note-grid">
            <note-preview v-for="(note , idx) in notes" :note="note" v-if="note.isPinned" :key="note.id"></note-preview>
        </div>
        <h1>Other Notes</h1>
        <div ref="noteGrid" class="other-note-container note-grid">  
            <note-preview v-for="(note , idx) in notes" :note="note" v-if="!note.isPinned" :key="note.id"></note-preview>
        </div>
        </section>
    `,
    props: ['notes'],
    created(){
        setTimeout(this.resizeAllGridItems, 200);
    },
    watch:{
        notes(){
            this.resizeAllGridItems()
        }
    },
    methods:{
        resizeGridItem(item) {
            var grid = this.$refs.noteGrid
            var rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
            var rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
            var rowSpan = Math.ceil((item.offsetHeight + rowGap) / (rowHeight + rowGap));
            item.style.gridRowEnd = "span " + rowSpan;
        },
        resizeAllGridItems() {
            var allItems = document.querySelectorAll(".note");
            for (var x = 0; x < allItems.length; x++) {
            this.resizeGridItem(allItems[x]);
            }
        },
    },
    components:{
        notePreview
    },
}






