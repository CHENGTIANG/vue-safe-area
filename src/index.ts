import Vue, { VNode, CreateElement, RenderContext } from 'vue';
const safeVar = {
    left: 'env(safe-area-inset-left)',
    rigth: 'env(safe-area-inset-right)',
    top: 'env(safe-area-inset-top)',
    bottom: 'env(safe-area-inset-bottom)'
}
const keys = {
    all: 'a',
    x: 'x',
    y: 'y',
    left: 'l',
    right: 'r',
    top: 't',
    bottom: 'b',
}

type Direction = {
    left: Boolean,
    right: Boolean,
    top: Boolean,
    bottom: Boolean
}

export default Vue.extend({
    name: "SafeArea",
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        [keys.all]: Boolean,
        [keys.x]: Boolean,
        [keys.y]: Boolean,
        [keys.top]: Boolean,
        [keys.bottom]: Boolean,
        [keys.left]: Boolean,
        [keys.right]: Boolean,
    },
    methods: {
        hasProp(name: string) {
            return (this as any)[name] === true
        },
        getValues(prefix: string = "") {
            prefix = prefix || ""
            const obj: Direction = {
                left: this.hasProp(prefix + keys.left),
                right: this.hasProp(prefix + keys.right),
                top: this.hasProp(prefix + keys.top),
                bottom: this.hasProp(prefix + keys.bottom),
            }
            if (this.hasProp(prefix + keys.x)) {
                Object.assign(obj, {
                    left: true,
                    right: true,
                })
            }
            if (this.hasProp(prefix + keys.y)) {
                Object.assign(obj, {
                    top: true,
                    bottom: true
                })
            }
            if (this.hasProp(prefix + keys.all)) {
                Object.assign(obj, {
                    left: true,
                    right: true,
                    top: true,
                    bottom: true
                })
            }
            return obj
        },
        getStyles() {
            const obj: any = {
                borderStyle: 'solid',
                borderColor: 'transparent',
                borderWidth: '0'
            }
            const border = this.getValues()
            if (border.left) obj.borderLeftWidth = safeVar.left
            if (border.right) obj.borderRightWidth = safeVar.rigth
            if (border.top) obj.borderTopWidth = safeVar.top
            if (border.bottom) obj.borderBottomWidth = safeVar.bottom
            return obj
        }
    },
    render(createElement: CreateElement, hack: RenderContext): VNode {
        return createElement(this.tag, {
            style: this.getStyles()
        }, this.$slots.default);
    }
});