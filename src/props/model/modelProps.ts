import { basicProps } from "../basicProps"
import { objectToKV } from "../utils/objectToKV"

export const modelProps = {
    ...basicProps,
    src: {
        type: String,
        default: "",
    },
    animations: {
        type: Object,
        default: {},
    },
    animation: {
        type: String,
        default: "",
    },
    animationIndex: {
        type: Number,
        default: -1,
    },
}

export const modelPropsKV:Record<string,any>=objectToKV(modelProps)