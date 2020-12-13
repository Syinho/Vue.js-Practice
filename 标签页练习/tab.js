Vue.component('tabs', {
    props: {
        value: {
            type: [Number, String]
        }
    },
    data() {
        return {
            currentValue: this.value,
            // 用以保存根实例传入的默认选定值,
            titles: []
        }
    },
    template: `
    <div class="tabs">
        <div class="tabs-bar">
            <div v-for="(item,index) in titles" :class="getCls(item)" @click="handleChange(index)">
            {{item.title}}
            </div>
        </div>
        <div class="tabs-content">
            <slot></slot>
        </div>
    </div>
    `,
    methods: {
        getCls(item) {
            return ['tabs-tab', {
                'tabs-tab-active': item.code == this.currentValue
            }]
        },
        getTabs() {
            return this.$children.filter((item, index, arr) => {
                return item.$options.name === 'pane';
            });
        },
        updateNav() {
            // 代表pane的组件有变化，所有的
            this.titles = [];
            this.getTabs().forEach((item, index, arr) => {
                this.titles.push({
                    title: item.title,
                    code: item.code || index
                });
                if (!item.code) item.code = index;
                if (index === 0) {
                    if (!this.currentValue) {
                        this.currentValue = item.code;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus() {
            this.getTabs().forEach((item, index, arr) => {
                item.show = item.code == this.currentValue;
            });
        },
        handleChange(i) {
            var el = this.titles[i];
            var code = el.code;
            this.currentValue = code;
            this.$emit('input', code);
        }
    },
    watch: {
        value(newVal) {
            this.currentValue = newVal;
        },
        currentValue(newVal) {
            this.updateStatus();
        }
    }
})