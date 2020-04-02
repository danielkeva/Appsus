export default{
    template: `
        <div>
            <h3 class=title>{{info.title}}</h3>
            <p>{{info.txt}}</p>
        </div>
    `,
    props: ['info'],
    data() {
        return {
            txt: ''
        }
    }
}