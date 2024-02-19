import { IcolorfulProps } from "../interface/IcolorfulProps"
import { basicProps } from "../basicProps"
import { objectToKV } from "../utils/objectToKV"

export const lightProps = {
    ...basicProps,
    ...IcolorfulProps,
    intensity: {
        type: Number,
        default: 0.5,
    }
}

export const lightPropsKV:Record<string,any>=objectToKV(lightProps)