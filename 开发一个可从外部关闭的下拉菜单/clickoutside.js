Vue.directive('clickoutside', {
    bind: function (el, binding) {
        function documentClick(e) {
            if (el.contains(e.target)) {
                return;
            }
            if (binding.expression) {
                binding.value();
                // 调用binding.value；也就是调用handleSwitch函数，隐藏下拉菜单
            }
        }

        function debounce(fn, delay) {
            let timer = null;
            return function (event) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    fn(event);
                }, delay);
            }
        }
        // 因为当按下键的时候，如果按住不放会不停触发keydown事件与keypress事件，所以为此给予其设计了一个防抖函数，keydown事件必须间隔500ms才能继续调用事件处理程序

        function keyESCDown(e) {
            console.log(e.keyCode);
            if (e.keyCode == 27) {
                binding.value();
            }
        }

        el.addEventListener('keydown', debounce(keyESCDown, 500), false);
        document.addEventListener('click', documentClick, false);
        el.__vueClickOutside__ = documentClick;
    },
    unbind: function (el, binding) {
        document.addEventListener('click', documentClick);
        delete el.__vueClickOutside__;
    }
});

// 添加对esc的支持