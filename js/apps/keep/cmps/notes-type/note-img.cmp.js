export default {
    template: `
    <div class="img-container">
        <h3 class=title>{{info.title}}</h3>
        <img :src="info.url" />
    </div>
    `,
    props: ['info'],
}