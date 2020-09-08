var _a;
import Vue from 'vue';
var safeVar = {
    left: 'env(safe-area-inset-left)',
    rigth: 'env(safe-area-inset-right)',
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)'
};
var keys = {
    all: 'a',
    x: 'x',
    y: 'y',
    left: 'l',
    right: 'r',
    top: 't',
    bottom: 'b',
};
export default Vue.extend({
    name: "SafeArea",
    props: (_a = {
            tag: {
                type: String,
                default: 'div',
            }
        },
        _a[keys.all] = Boolean,
        _a[keys.x] = Boolean,
        _a[keys.y] = Boolean,
        _a[keys.top] = Boolean,
        _a[keys.bottom] = Boolean,
        _a[keys.left] = Boolean,
        _a[keys.right] = Boolean,
        _a),
    methods: {
        hasProp: function (name) {
            return this[name] === true;
        },
        getValues: function (prefix) {
            if (prefix === void 0) { prefix = ""; }
            prefix = prefix || "";
            var obj = {
                left: this.hasProp(prefix + keys.left),
                right: this.hasProp(prefix + keys.right),
                top: this.hasProp(prefix + keys.top),
                bottom: this.hasProp(prefix + keys.bottom),
            };
            if (this.hasProp(prefix + keys.x)) {
                Object.assign(obj, {
                    left: true,
                    right: true,
                });
            }
            if (this.hasProp(prefix + keys.y)) {
                Object.assign(obj, {
                    top: true,
                    bottom: true
                });
            }
            if (this.hasProp(prefix + keys.all)) {
                Object.assign(obj, {
                    left: true,
                    right: true,
                    top: true,
                    bottom: true
                });
            }
            return obj;
        },
        getStyles: function () {
            var obj = {
                borderStyle: 'solid',
                borderColor: 'transparent',
                borderWidth: '0'
            };
            var border = this.getValues();
            if (border.left)
                obj.borderLeftWidth = safeVar.left;
            if (border.right)
                obj.borderRightWidth = safeVar.rigth;
            if (border.top)
                obj.borderTopWidth = safeVar.top;
            if (border.bottom)
                obj.borderBottomWidth = safeVar.bottom;
            return obj;
        }
    },
    render: function (createElement, hack) {
        return createElement(this.tag, {
            style: this.getStyles()
        }, this.$slots.default);
    }
});
//# sourceMappingURL=index.js.map