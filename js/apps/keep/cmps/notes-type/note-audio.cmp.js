export default {
    template: `
    <div>
        <h3 class=title>{{info.title}}</h3>
        <audio controls class="audio-container">
            <source :src="info.url" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio> 
    </div>
    `,
    props: ['info'],
}

