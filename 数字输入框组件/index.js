var app = new Vue({
    el: '#app',
    data: {
        value: 5,
        max: 20,
        min: 0,
        propStep: 2
    },
    watch: {
        value: function () {
            console.log(`根文件的value值被改写：${this.value}`);
        }
    }
});