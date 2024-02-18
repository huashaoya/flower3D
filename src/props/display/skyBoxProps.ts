import { basicProps } from "../basicProps"
import {IloaderProps} from "../interface/IloaderProps"
import { objectToKV } from "../utils/objectToKV"

export const skyBoxProps = {
    ...basicProps,
    ...IloaderProps,
}

export const skyBoxPropsKV:Record<string,any>=objectToKV(skyBoxProps)