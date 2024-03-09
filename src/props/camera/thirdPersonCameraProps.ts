import { objectToKV } from "../utils/objectToKV"

export const thirdPersonCameraProps = {
    locked: {
        type: Boolean,
        default: false,
    },
    offsetY:{
        type:Number,
        default:0
    },
    distance:{
        type:Number,
        default:2
    }
}

export const thirdPersonCameraPropsKV: Record<string, any> = objectToKV(thirdPersonCameraProps)