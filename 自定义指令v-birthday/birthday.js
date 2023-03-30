Vue.directive('birthday', {

    bind: function (el, binding) {
        let y, m, d;
        let date = binding.value;
        let reg = /\b(\d{4})\b\S{1}\b(\d+)\b\S{1}\b(\d+)\b\S*/g;
        if (reg.test(date)) {
            y = RegExp.$1;
            m = RegExp.$2;
            d = RegExp.$3;
        }
        console.log(`${y}-${m}-${d}`);

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

        function getYMD(y, m, d) {
            const date = new Date();
            const y_now = date.getFullYear();
            const m_now = date.getMonth() + 1;
            const d_now = date.getDate();
            console.log('y_now:' + y_now + ';mnow:' + m_now + ';dnow:' + d_now);
            let _year, _month, _date;

            function chk(y) {
                if ((/0|(\d+00)/.test(y) && y % 400 == 0) || ((/(\d*[1-9]{1}$)|(\d+[1-9]{1}0$)/).test(y) && y % 4 == 0)) {
                    return true; // 闰年
                } else {
                    return false; // 平年
                }
            }
            // 2021.1.5 1996.10.17
            if (m_now < m) {
                // 2020.3 1978 4
                // 2020-1978-1=41
                console.log('判断现在月份比出生月份小');
                _year = y_now - y - 1; //24
                console.log(`_year:${_year}`);
                if (d_now < d && m_now == 3) {
                    console.log('判断现在日期比出生日期小且现在月份是三月');
                    // 2020.3.5 1978.4.15
                    // 2+12-3-1=10
                    // 
                    _month = m_now + 12 - m - 1; //2
                    if (chk(y_now)) {
                        console.log('判断为闰年');
                        _date = 29 - d + d_now;
                    } else {
                        console.log('判断为平年');
                        _date = 28 - d + d_now;
                    }
                } else if (d_now < d && m_now != 3) {
                    console.log('判断现在日期比出生日期小，且现在月份不是三月');
                    _month = m_now + 12 - m - 1;
                    // 2020.4.5  1978.8.12
                    // 2020-1978-1=41;
                    // 4+12-8-1=7;
                    console.log(`mnow-1:${m_now-1}`);
                    if ([0, 1, 3, 5, 7, 8, 10].indexOf(m_now - 1) != -1) {
                        console.log('判断加上月份后是大月');
                        _date = 31 - d + d_now;
                    } else if ([4, 6, 9, 11].indexOf(m_now - 1) != -1) {
                        console.log('判断加上月份后是小月，不包括二月');
                        _date = 30 - d + d_now;
                    }
                } else {
                    // 2020.5.7 1978.8.5
                    console.log(`判断dnow比d大`);
                    _month = m_now + 12 - m;
                    console.log(`_month:${_month}`);
                    _date = d_now - d;
                    console.log(`_date:${_date}`);
                }
            } else {
                _year = y_now - y;
                _month = m_now - m;
                _date = d_now - d;
                if (d_now < d) {
                    _month -= 1;
                    if (_month == -1) {
                        _month = 11;
                        _year -= 1;
                    }
                    if ([0, 1, 3, 5, 7, 8, 10].indexOf(m_now - 1) != -1) {
                        console.log('判断加上月份后是大月');
                        _date = 31 - d + d_now;
                    } else if ([4, 6, 9, 11].indexOf(m_now - 1) != -1) {
                        console.log('判断加上月份后是小月，不包括二月');
                        _date = 30 - d + d_now;
                    }
                }
            }
            return `您已出生${_year}年${_month}个月${_date}天`;
        }

        el.__getTime__ = getTime;
        el.getYMD = getYMD;
        if (binding.modifiers.details) {
            el.innerText = el.getYMD(y, m, d);
        } else {
            el.innerText = el.__getTime__(y, m, d);
        }
    },
    update: function (el, binding) {
        let y, m, d;
        let date = binding.value;
        let reg = /\b(\d{4})\b\S{1}\b(\d+)\b\S{1}\b(\d+)\b\S*/g;
        if (reg.test(date)) {
            y = RegExp.$1;
            m = RegExp.$2;
            d = RegExp.$3;
            console.log(`${y}-${m}-${d}`);
        } else {
            console.log('传入字符串不符合格式');
            return;
        }

        if (binding.modifiers.details) {
            el.innerText = el.getYMD(y, m, d);
        } else {
            el.innerText = el.__getTime__(y, m, d);
        }
    },
    unbind: function (el, binding) {
        delete el.__getTime__;
        delete el.getYMD;
    }
})