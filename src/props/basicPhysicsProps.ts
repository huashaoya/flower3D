import { basicProps } from "./basicProps"
import {objectToKV} from "./utils/objectToKV"

export const basicPhysicsProps={
    ...basicProps,
    mass:{
        type:Number,
        default:1
    }
}
export const basicPhysicsPropsKV:Record<string,any>=objectToKV(basicPhysicsProps)
