Vue.component('input-number', {
    props: {
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        }
    },
    template: `
    <div class="container">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">NUM:</span>
            </div>
            <input type="text" class="form-control" :value="currentValue" @change="handleChange">
        </div>
        <button class="btn btn-danger col-3" :disabled="currentValue>=max" @click="handleUp">+</button>
        <button class="btn btn-primary col-3" :disabled="currentValue<=min" @click="handleDown">-</button>
    </div>`,
    data() {
        return {
            currentValue: this.value
        }
    },
    methods: {
        handleUp() {
            if (this.currentValue >= this.max) return;
            this.currentValue++;
        },
        handleDown() {
            if (this.currentValue <= this.min) return;
            this.currentValue--;
        },
        isNum(val) {
            return /(-|\+)?((\b0\b)|([1-9]{1}\d*))(\.\d*[1-9]{1})?/.test(val + '');
        },
        handleChange(ev) {
            var val = ev.target.value;
            if (this.isNum(val)) {
                val = Number(val);
                if (val <= this.min) {
                    this.currentValue = this.min;
                } else if (val >= this.max) {
                    this.currentValue = this.max;
                } else {
                    this.currentValue = val;
                }
            } else {
                ev.target.value = this.currentValue;
            }
        }
    },
    watch: {
        value(newVal) {
            if (this.isNum(newVal)) {
                if (newVal >= this.max) this.currentValue = this.max;
                if (newVal <= this.min) this.currentValue = this.min;
                this.currentValue = newVal;
            }
        },
        currentValue(newVal) {
            this.$emit('input', newVal);
        }
    }
});