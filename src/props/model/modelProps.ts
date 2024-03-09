import { basicProps } from "../basicProps"
import {IloaderProps} from "../interface/IloaderProps"
import { objectToKV } from "../utils/objectToKV"

export const modelProps = {
    ...basicProps,
    ...IloaderProps,
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
    type:{
        type: String,
        default: "none",
    },
    colliderMeshVisible:{
        type: Boolean,
        default: false,
    },
}

export const modelPropsKV:Record<string,any>=objectToKV(modelProps)