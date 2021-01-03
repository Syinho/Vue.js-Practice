function getTime(y, m, d) {
    let Time = {
        // 获取此刻的时间戳
        getNow: function () {
            return Date.now();
        },
        // 获取出生日期的时间戳
        getBir: function () {
            return Date.UTC(`${y}`, `${m-1}`, `${d}`)
        },
        // 获取转换时间的时间戳
        dateFormat: function () {
            let dif = this.getNow() - this.getBir();
            return Math.floor(dif / 1000 / 60 / 60 / 24) + '天';
        }
    }
    return Time.dateFormat();
}
Vue.directive('birthday', {

    bind: function (el, binding) {
        let y, m, d;
        let date = binding.value;
        let reg = /(\d{4})\S+(\d{1,2})\S+(\d{1,2})\S*/g;
        if (reg.test(date)) {
            y = RegExp.$1;
            m = RegExp.$2;
            d = RegExp.$3;
        }
        el.__getTime__ = getTime;
        el.innerText = el.__getTime__(y, m, d);
    },
    update: function (el, binding) {
        let y, m, d;
        let date = binding.value;
        let reg = /(\d{4})\S+(\d{1,2})\S+(\d{1,2})\S*/g;
        if (reg.test(date)) {
            y = RegExp.$1;
            m = RegExp.$2;
            d = RegExp.$3;
        } else {
            console.log('传入字符串不符合格式');
            return;
        }
        el.innerText = el.__getTime__(y, m, d);
    },
    unbind: function (el, binding) {
        delete el.__getTime__;
    }
})