let Time = {
    // 获取当前时间戳
    getUnix: function () {
        return new Date().getTime();
    },
    // 获取今天零时零分零秒的时间戳
    getTodayUnix: function () {
        return Date.UTC(2020, 11, 31, 0, 0, 0);
    },
    // 获取今年1月1日0时0分0秒的时间戳
    getYearUnix: function () {
        return Date.UTC(2020, 0, 1, 0, 0, 0);
    },
    // 获取标准年月日
    getStandradDate: function () {
        let date = new Date();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let year = date.getFullYear();
        return `${year}-${month}-${day}`;
    },
    // 转换时间
    getFormatTime: function (timeStamp) {
        let now = this.getUnix();
        let timer = (now - timeStamp) / 1000; //获取结果以秒为单位
        return () => {
            let resArr = [{
                res: timer <= 0,
                tips: '以前'
            }, {
                res: timer < 3600 && res > 0,
                tips: Math.floor(timer / 60) + '分钟前'
            }, {
                res: timer >= 3600 && timer / 3600 < 24,
                tips: Math.floor(timer / 3600) + '小时前'
            }, {
                res: timer / 3600 >= 24 && timer < 3600 * 24 * 7,
                tips: Math.floor(timer / (3600 * 24)) + '天前'
            }, {
                res: timer >= 3600 * 24 * 7,
                tips: Time.getStandradDate()
            }];
            let res = resArr.filter((item, index, arr) => {
                if (item.res) {
                    return true;
                }
            });
            return res[0].tips;
        }
        // 拒绝写巨多的ifelse
    }
};

Vue.directive('time', {
    bind: function (el, binding) {
        el.innerHTML = Time.getFormatTime(binding.value)();
        el.__timeout__ = setInterval(() => {
            el.innerHTML = Time.getFormatTime(binding.value)()
        }, 60000);
    },
    unbind: function (el, bindingh) {
        clearInterval(el.__timeout__);
        delete el.__timeout__;
    }
})