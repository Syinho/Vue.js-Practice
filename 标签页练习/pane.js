Vue.component('pane', {
    name: 'pane',
    template: `
    <div class="pane" v-show="show">
        <slot></slot>
    </div>
    `,
    props: {
        title: {
            type: String
        },
        code: {
            type: [String, Number]
        }
    },
    data() {
        return {
            show: true
        }
    },
    methods: {
        updateNav() {
            this.$parent.updateNav();
        }
    },
    watch: {
        title(newVal) {
            this.updateNav();
        }
    },
    mounted() {
        this.updateNav();
    }
})