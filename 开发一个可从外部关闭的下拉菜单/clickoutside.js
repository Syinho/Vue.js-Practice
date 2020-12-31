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
        document.addEventListener('click', documentClick, false);
        el.__vueClickOutside__ = documentClick;
    },
    unbind: function (el, binding) {
        document.addEventListener('click', documentClick);
        delete el.__vueClickOutside__;
    }
})