Vue.component('tabs', {
    template: `
    <div class="tabs">
        <div class="tabs-bar">
            <div v-for="(item,index) in navList" :class="getCls(item)" :style="getSty(index)" @click="handleChange(item)">
                <p>{{item.label}}</p>
                <button class="btn" @click.stop="handleHide(item,index)" v-show="item.closable">
                    <div></div>
                    <div></div>
                </button>
            </div>
        </div>
        <div class="tabs-content">
            <slot></slot>
        </div>
    </div>
    `,
    props: {
        value: {
            type: [String, Number]
        }
    },
    data() {
        return {
            currentValue: this.value,
            navList: [],
            win_width: {
                type: Number
            },
            win_height: {
                type: Number
            },
            tabs_tab_height: {
                type: Number
            },
            hideArr: []
        }
    },
    methods: {
        getCls(item) {
            return ['tabs-tab', {
                'tabs-tab-active': item.name == this.currentValue
            }, {
                'tabs-hide': this.hideArr.indexOf(item.label) != -1
            }];
        },
        getSty(i) {
            return [{
                top: `${i * this.tabs_tab_height}px`
            }, {
                height: `${this.tabs_tab_height}px`
            },{
                lineHeight:`${this.tabs_tab_height}px`
            }]
        },
        getTabs() {
            return this.$children.filter((item, index, arr) => {
                return item.$options.name == 'pane'
            });
        },
        updateNav() {
            this.navList = [];
            this.getTabs().forEach((item, index, arr) => {
                if (!item.name) {
                    item.name = index;
                    if (index == 0) {
                        this.currentValue = index;
                    }
                }
                this.navList.push({
                    label: item.label,
                    name: item.name,
                    closable: item.closable
                });
            });
            for (let i = 0; i < this.navList.length; i++) {
                console.group('navList第${i}份:');
                console.log('label:' + this.navList[i].label);
                console.log('name:' + this.navList[i].name);
                console.log('closable:' + this.navList[i].closable);
                console.groupEnd();
            }
            this.updateContent();
        },
        updateContent() {
            this.getTabs().forEach((item, index, arr) => {
                item.show = item.name == this.currentValue ? true : false
            });
        },
        handleChange(item) {
            this.currentValue = item.name;
            this.$emit('input', item.name);
        },
        handleHide(item, i) {
            if (this.navList[i].name == this.currentValue) {
                setTimeout(() => {
                    this.navList.splice(i, 1);
                }, 1000);
                if (this.navList.length != 0) {
                    if (i != this.navList.length) {
                        this.currentValue = this.navList[i].name;
                    } else if (i == this.navList.length) {
                        this.currentValue = this.navList[i - 1].name;
                    }
                } else {
                    this.currentValue = '';
                }
            } else {
                setTimeout(() => {
                    this.navList.splice(i, 1);
                }, 1000);
            }
            this.hideArr.push(item.label);
        },
        viewWidth() {
            return window.innerWidth || document.documentElement.clientWidth;
        },
        viewHeight() {
            return window.innerHeight || document.documentElement.clientHeight;
        },
        tabsHeight() {
            return this.viewHeight() / this.getTabs().length;
        },
        updateWindow() {
            this.win_width = this.viewWidth();
            this.win_height = this.viewHeight();
            this.tabs_tab_height = this.tabsHeight();
        }
    },
    watch: {
        value(newVal) {
            this.currentValue = newVal;
        },
        currentValue(newVal) {
            this.updateContent();
        },
        hideArr(newVal) {
            let timer = setTimeout(() => {
                this.tabs_tab_height = this.viewHeight() / (this.getTabs().length - this.hideArr.length);
            }, 1000);
        }
    },
    mounted() {
        this.updateWindow();
        window.onresize = () => {
            this.updateWindow();
        };

    }
})