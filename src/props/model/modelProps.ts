import { basicProps } from "../basicProps"
import { objectToKV } from "../utils/objectToKV"

export const modelProps = {
    ...basicProps,
    src: {
        type: String,
        default: "",
    }
}

export const modelPropsKV:Record<string,any>=objectToKV(modelProps)