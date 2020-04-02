export default {
    template: `
    <div class="video-container">
        <h3 class=title>{{info.title}}</h3>
        <iframe :src="info.url"></iframe>
    </div>
    `,
    props: ['info'],
}
