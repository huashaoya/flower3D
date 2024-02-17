import { objectToKV } from "../utils/objectToKV"

export const thirdPersonCameraProps = {
    locked: {
        type: Boolean,
        default: false,
    }
}

export const thirdPersonCameraPropsKV: Record<string, any> = objectToKV(thirdPersonCameraProps)