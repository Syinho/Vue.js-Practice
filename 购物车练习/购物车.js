var app = new Vue({
    el: "#app",
    data: {
        list: [
            [{
                name: 'MI1s',
                price: 2589,
                count: 1,
                chk: false,
                category: "EP"
                // electronic products
            }, {
                name: 'iphone5',
                price: 5478,
                count: 1,
                chk: false,
                category: "EP"
            }, {
                name: 'MEI2',
                price: 2569,
                count: 1,
                chk: false,
                category: "EP"
            }],
            [{
                name: 'orange',
                price: 7,
                count: 1,
                chk: false,
                category: "fruit"
            }, {
                name: 'banana',
                price: 5,
                count: 1,
                chk: false,
                category: "fruit"
            }, {
                name: 'strawberry',
                price: 17,
                count: 1,
                chk: false,
                category: "fruit"
            }, {
                name: 'pear',
                price: 5.5,
                count: 1,
                chk: false,
                category: "fruit"
            }],
            [{
                name: 'towel',
                price: 25,
                count: 1,
                chk: false,
                category: "DN"
                // daily necessities
            }, {
                name: 'soap',
                price: 50,
                count: 1,
                chk: false,
                category: "DN"
            }, {
                name: 'shampoo',
                price: 177,
                count: 1,
                chk: false,
                category: "DN"
            }]
        ],
        count: 0
    },
    methods: {
        handleReduce(i, index) {
            if (this.list[i][index].count === 1) return;
            this.list[i][index].count--;
        },
        handleAdd(i, index) {
            this.list[i][index].count++;
        },
        handleRemove(i, index) {
            this.list[i].splice(index, 1);
            if (this.list[i].length == 0) {
                this.list.splice(i, 1);
            }
            console.log(this.list.length);
        },
        chkAll() {
            if (this.count % 2) {
                // 全选
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].forEach((item, index, arr) => {
                        item.chk = false;
                    });
                }
                this.count++;
            } else {
                for (let i = 0; i < this.list.length; i++) {
                    this.list[i].forEach((item, index, arr) => {
                        item.chk = true;
                    });
                }
                this.count++;
            }
            console.log(this.count);
        },
        changeChk(i, index) {
            this.list[i][index].chk = !this.list[i][index].chk;
        }
    },
    filters: {},
    directives: {},
    components: {},
    watch: {},
    computed: {
        totalPrice() {
            var arr = [];
            for (let i = 0; i < this.list.length; i++) {
                arr.push(this.list[i].filter((item, index, array) => {
                    return item.chk;
                }));
            }
            var sum = [];
            for (let i = 0; i < arr.length; i++) {
                sum.push(arr[i].reduce((acc, cur, idnex, arr) => {
                    return acc + cur.price * cur.count;
                }, 0));
            }
            var sums = sum.reduce((acc, cur, index, arr) => {
                return acc + cur;
            });
            return sums.toString().replace(/\B(?=(\d {3})+($|\.))/g, ',');
        },
        chkText() {
            console.log(this.count % 2);
            return this.count % 2 === 0 ? '一键全选' : '一键取消';
        }
    }
});