Vue.component('i-card', {
    name: 'card',
    template: `<div class="card">
        <div class="cardHeader">
            {{title}}
        </div>
        <div class="cardContent">
            <div v-for="(item,index) in list" v-show="list[0].type=='radio'">
                <label :for="'ra'+index">{{item.value}}</label>
                <input type="radio" :id="'ra'+index" :checked="item.checked" :name="item.name" @click="handleRadio($event,index)" :value="item.value">
            </div>
            <div v-for="(item,index) in list" v-show="list[0].type=='checkbox'">
                <label :for="'chkbox'+index">{{item.value}}</label>
                <input type="checkbox" :id="'chkbox'+index" :name="item.name" :checked="item.checked" @click="handleChkbox($event,index)" :value="item.value">
            </div>
            <div v-for="(item,index) in list" v-show="list[0].type=='textarea'">
                <textarea v-model="res.ta"></textarea>
            </div>
        </div>
        <div class="cardFooter">
            <slot></slot>
        </div>
    </div>`,
    props: {
        label: {
            type: String
        },
        page: {
            type: Number
        },
        copyList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {
            title: this.label,
            pn: this.page,
            list: this.copyList,
            // list是一个数组，每一项是对象
            // radio：包含type，value，checked，name
            // checkbox：包含type，value，checked，name
            res: {
                radio: '',
                chkbox: [],
                ta: ''
            }
            // list 里包含有多个对象，每个对象包含有 type，value，checked，name,length属性，其中length属性仅限于ta
        }
    },
    methods: {
        getCom() {
            return this.$children.filter((item, index, arr) => {
                return item.$options.name == 'btn'
            });
        },
        btnActive() {
            // 用于激活 下一页、重置、提交 按钮
            for (let i = 0; i < arguments.length; i++) {
                if (!this.getCom()[0].ableBtn.includes(arguments[i])) {
                    console.log(`btnAble数组不包含${arguments[i]},它被加入了btnAble数组`);
                    this.getCom()[0].ableBtn.push(arguments[i]);
                } else {
                    console.log(`btnAble数组包含${arguments[i]},它被忽略`);
                    continue;
                }
            }
        },
        btnPositive() {
            // 用于取消激活
            let ableList = this.getCom()[0].ableBtn;
            for (let i = 0; i < arguments.length; i++) {
                if (ableList.includes(arguments[i])) {
                    console.log(`btnAble数组包含${arguments[i]}，它被删除`);
                    ableList.forEach((item, index, arr) => {
                        if (item == arguments[i]) {
                            ableList.splice(index, 1);
                        }
                    })
                } else {
                    continue;
                }
            }
        },
        handleRadio(ev, i) {
            this.res.radio = ev.target.value;
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].checked = false;
            }
            this.list[i].checked = true;
        },
        handleChkbox(ev, i) {
            if (!this.res.chkbox.includes(ev.target.value)) {
                console.log(`判定复选框没有此例，为res.chkbox添加此例`);
                this.res.chkbox.push(ev.target.value);
                this.list[i].checked = true;
            } else if (this.res.chkbox.includes(ev.target.value)) {
                this.res.chkbox.splice(this.res.chkbox.indexOf(ev.target.value), 1);
                this.list[i].checked = false;
            }
        }
    },
    computed: {
        radio: function () {
            return this.res.radio;
        },
        chkbox: function () {
            return this.res.chkbox;
        },
        ta: function () {
            return this.res.ta;
        }
    },
    watch: {
        radio(newVal, oldVal) {
            // radio被改变只有两种情况，1.handleradio，点击单选按钮修改了值，此时值一定被修改 2.点击reset，radio会被修改为‘’
            this.$parent.result.radio = newVal;
            if (newVal == '') {
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].checked = false;
                }
                this.btnPositive('reset', 'next');
            } else {
                this.btnActive('reset', 'next');
            }
        },
        chkbox(newVal, oldVal) {
            // 1.重置按钮，chkbox被修改为[]
            // 2.点击事件
            this.$parent.result.chkbox = newVal;
            if (newVal.length == 1) {
                // 它可能是被增加到一，也可能是被减少到一
                this.btnActive('reset');
                this.btnPositive('next');
            } else if (newVal.length >= 2) {
                this.btnActive('reset', 'next');
            } else if (newVal.length == 0) {
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].checked = false;
                }
                this.btnPositive('reset', 'next');
            }
        },
        ta(newVal) {
            this.$parent.result.ta = newVal;
            if (this.res.ta.length > 0 && this.res.ta.length < 100) {
                this.btnActive('reset');
                this.btnPositive('submit');
            } else if (this.res.ta.length >= 100) {
                this.btnActive('reset', 'submit');
            } else if (this.res.ta.length == 0) {
                this.btnPositive('reset', 'submit');
            }
        }
    }
})