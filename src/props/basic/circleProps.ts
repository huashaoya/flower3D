import { basicProps } from "../basicProps"
import { IcolorfulProps } from "../interface/IcolorfulProps"
import { IphysicsProps } from "../interface/IphysicsProps"
import {objectToKV} from "../utils/objectToKV"

export const circleProps={
    ...basicProps,
    ...IcolorfulProps,
    ...IphysicsProps,
    r:{
        type:Number,
        default:1
    }
}
export const circlePropsKV:Record<string,any>=objectToKV(circleProps)
