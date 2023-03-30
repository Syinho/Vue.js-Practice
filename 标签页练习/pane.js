Vue.component('pane', {
    name: 'pane',
    template: `
    <div class="pane" v-show="show">
        <slot></slot>
    </div>`,
    data() {
        return {
            show: false
        }
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        name: {
            type: [String, Number]
        },
        closable: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        updateNav() {
            this.$parent.updateNav();
        }
    },
    created() {
        this.updateNav();
    },
    watch: {
        label(newVal) {
            this.updateNav();
        },
        closable(newVal) {
            this.updateNav();
            console.log(`closable被修改触发watch,当前值${this.closable}`);
        }
    }
})