import { ref, watch } from 'vue';

export default function useColorSync(props: any,oldProps:any) {
    // 使用 ref 创建一个响应式对象，用于存储变化的属性

    const changedProperties = ref<String[]>([]);

    // 使用 watch 监听 cubeStyle 对象的变化
    watch(() => props, (newStyle, old) => {
        const changedProps = [];
        // 检查属性变化
        for (const prop in newStyle) {
            if (newStyle[prop] != oldProps[prop]) {
                changedProps.push(prop);
            }
        }

        // 将变化的属性数组存储到 changedProperties 中
        changedProperties.value = changedProps;
    }, { deep: true }); // 使用 deep 选项深度监听对象属性的变化

    // 返回响应式对象和其他数据
    return changedProperties;

}
