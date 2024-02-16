import { Ref, inject, provide, ref, toRaw, watch, watchEffect } from 'vue';

export default function useChange(props: any, oldProps: any, member: any,manager:any) {
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

    const memberRef = ref(member)
    provide("parent", memberRef)

    const parentRef = inject<Ref|undefined>("parent", undefined)
    watchEffect(() => {
        if(parentRef){
            toRaw(parentRef?.value)?.add(member)
        }else{
            manager.members.push(member)
            if(member.object3D){
                 manager.scene.add(member.object3D)
            }   
        }
    })
}
