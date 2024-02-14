import { ref, toRaw, watch, watchEffect } from 'vue';

export default function useColorSync(props: any, oldProps: any, member: any) {
    const changedProperties = ref<String[]>([]);
    let changedProps: String[] = [];
    for (const prop in toRaw(props)) {
        if (props[prop] != oldProps.value[prop]) {
            changedProps.push(prop);
        }
    }
    changedProperties.value = changedProps;

    watch(() => props, (newStyle) => {
        changedProps = []
        for (const prop in newStyle) {
            if (newStyle[prop] != oldProps.value[prop]) {
                changedProps.push(prop);
            }
        }
        changedProperties.value = changedProps;
    }, { deep: true });

    watchEffect(() => {
        oldProps.value = JSON.parse(JSON.stringify(props));
        for (const key of toRaw(changedProperties.value)) {
            member.change(key, toRaw(oldProps.value)[key.toString()]);
        }
    });
}
