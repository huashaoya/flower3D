import { basicProps } from "../basicProps"
import { IcolorfulProps } from "../interface/IcolorfulProps"
import { IphysicsProps } from "../interface/IphysicsProps"
import {objectToKV} from "../utils/objectToKV"

export const cubeProps={
    ...basicProps,
    ...IcolorfulProps,
    ...IphysicsProps,
    w:{
        type:Number,
        default:1
    },
    h:{
        type:Number,
        default:1
    },
    d:{
        type:Number,
        default:1
    },
}
export const cubePropsKV:Record<string,any>=objectToKV(cubeProps)
