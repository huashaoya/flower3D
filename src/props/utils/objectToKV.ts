import { basicProps } from "../basicProps"

export function objectToKV(obj:typeof basicProps){
    let KV={}
    for (let key in obj) {
        KV[key]=obj[key].default
      }
    return KV
}