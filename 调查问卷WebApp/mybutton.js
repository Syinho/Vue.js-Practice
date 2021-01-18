Vue.component('btn', {
    // 第一页只显示重置与下一页
    // 第二页显示重置，上一页，下一页
    // 最后一页显示上一页，下一页，提交
    name: 'btn',
    template: `
    <div class="btnGroup" >
        <button @click="handleBtn($event)" :disabled="isAble('submit')" v-show="isShow('submit')" value="submit">提交</button>
        <button @click="handleBtn($event)" :disabled="isAble('reset')" v-show="isShow('reset')"  value="reset">重置</button>
        <button @click="handleBtn($event)" :disabled="isAble('previous')" v-show="isShow('previous')"  value="previous">上一页</button>
        <button @click="handleBtn($event)" :disabled="isAble('next')" v-show="isShow('next')"  value="next">下一页</button>
    </div>
    `,
    props: {
        pageNum: {
            type: Number
            // 第几页？0,1,2
        },
        pages: {
            type: Number
            // 一共有多少页
        }
    },
    data() {
        return {
            showBtn: [],
            ableBtn: []
        }
    },
    methods: {
        getELs(ev) {
            const el = ev.target;
            const btnList = Array.prototype.filter.call(el.parentNode.childNodes, (item, index, arr) => {
                return item.nodeType == 1;
            });
            return btnList;
        },
        handleBtn(ev) {
            this.$emit('on-click', ev.target.value, this.pageNum);
            // 传递‘on-click’事件，传递当前点击的btn的value值
        },
        isAble(val) {
            return !this.ableBtn.includes(val);
        },
        isShow(val) {
            return this.showBtn.includes(val);
        }
    },
    created() {
        if (this.pageNum == 0 && this.pages > 1) {
            this.showBtn.push('reset', 'next');
            // 第一页存在 重置 下一页
            // 输入前第一页全部不可用
        } else if (this.pageNum > 0 && this.pageNum != this.pages - 1) {
            // 中间页存在 上一页 下一页 重置
            // 只有上一页可用
            this.showBtn.push('reset', 'previous', 'next');
            this.ableBtn.push('previous');
        } else if (this.pageNum == this.pages - 1) {
            // 最后一页存在 上一页 重置 提交
            // 键入前只有 上一页 可用
            this.showBtn.push('previous', 'reset', 'submit');
            this.ableBtn.push('previous');
        }
    }
});

// 决定btn组件的模板、根据传入的页码（pageNum）和页数（pages）决定按钮的初始加载时的显示与可用