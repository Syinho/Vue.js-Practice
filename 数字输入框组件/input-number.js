// 改写1：当输入框聚焦时，增加对键盘上下键的支持
// 改写2：增加一个控制步伐的prop-step，比如设置为10，点击加号按钮，一次增加10

Vue.component('input-number', {
    props: {
        value: {
            type: Number
        },
        max: {
            type: Number,
            dafault: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        propStep: {
            type: Number,
            default: 1
        }
    },
    template: `
    <div class="container">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">NUMBER:</span>
            </div>
            <input type="text" class="form-control" :value="currentValue" @change="handleChange" @keyup.up="handleUp" @keyup.down="handleDown">
            <input type="text" class="form-control" :value="step" @change="stepChange">
        </div>
        
        <button class="btn btn-danger col-3" @click="handleUp" :disabled="currentValue>=max">+</button>
        <button class="btn btn-primary col-3" @click="handleDown" :disabled="currentValue<=min">-</button>
    </div>
    `,
    data() {
        return {
            currentValue: this.value,
            step: this.propStep
        }
    },
    methods: {
        handleUp() {
            if (this.currentValue >= this.max) return;
            this.currentValue += this.step;
        },
        handleDown() {
            if (this.currentValue <= this.min) return;
            this.currentValue -= this.step;
        },
        isNum(val) {
            return /^\s*(-|\+)?((\b0\b)|([1-9]{1}\d*))(\.\d*[1-9]{1})?\s*$/.test(val + '');
        },
        handleChange(ev) {
            var val = ev.target.value.trim();
            if (this.isNum(val)) {
                this.currentValue = Number(val);
                if (val <= this.min) this.currentValue = this.min;
                if (val >= this.max) this.currentValue = this.max;
            } else {
                ev.target.value = this.currentValue;
            }
        },
        stepChange(ev) {
            var val = ev.target.value.trim();
            if (this.isNum(val)) {
                this.step = Number(val);
            } else {
                ev.target.value = this.step;
            }
        }
    },
    watch: {
        value: function (newVal) {
            this.currentValue = newVal;
            if (newVal >= this.max) this.currentValue = this.max;
            if (newVal <= this.min) this.currentValue = this.min;
        },
        propStep: function (newVal) {
            if (isNum(newVal)) this.step = newVal;
            if (!isNum(newVal)) this.step = 1;
        },
        currentValue: function (newVal) {
            // 通过handleChange进行改写
            this.$emit('input', newVal);
        }
    }
})