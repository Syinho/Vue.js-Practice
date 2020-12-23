Vue.component('tabs', {
    template: `
    <div class="tabs">
        <div class="tabs-bar">
            <div v-for="(item,index) in navList" :class="getCls(item)" @click="handleChange(item)">
                <p>{{item.label}}</p>
                <button class="btn" @click.stop="handleHide(index)" v-show="item.closable">
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
            // 1.created阶段直接赋值
            // 2.@click更改赋值
            // 3.destroy更改赋值
            navList: []
        }
    },
    methods: {
        getCls(item) {
            return ['tabs-tab', {
                'tabs-tab-active': item.name == this.currentValue
            }];
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

            /* --------------------分割线-------------------- */

            console.group('当前navList值');
            for (let i = 0; i < this.navList.length; i++) {
                console.log(`label:${this.navList[i].label}`);
                console.log(`name:${this.navList[i].name}`);
                console.log(`colsable:${this.navList[i].closable}`);
            }
            console.groupEnd();
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
        handleHide(i) {
            if (this.navList[i].name == this.currentValue) {
                // 判断删除的是否是当前项
                this.navList.splice(i, 1);
                if (this.navList.length != 0) {
                    // 判断删除是是否是最后一项
                    if (i != this.navList.length) {
                        // 不是最后一项,直接跳到下一项
                        this.currentValue = this.navList[i].name;
                    } else if (i == this.navList.length) {
                        // 是最后一项
                        this.currentValue = this.navList[i - 1].name;
                    }
                } else {
                    // 是最后一项，空白
                    this.currentValue = '';
                }
            } else {
                // 不是当前项，只需修改tabBar即可
                this.navList.splice(i, 1);
            }

            console.group('当前navList');
            for (let i = 0; i < this.navList.length; i++) {
                console.log(`name:${this.navList[i].name}`);
                console.log(`label:${this.navList[i].label}`);
            }
            console.groupEnd();
            // 直接删除navList的这一项，后面的补上前面的

            // 如果删除的不是当前项，维持当前项不变
            // 如果删除的是当前项，判断是否是最后一项
        }
    },
    watch: {
        value(newVal) {
            this.currentValue = newVal;
        },
        currentValue(newVal) {
            this.updateContent();
        }
    }
})