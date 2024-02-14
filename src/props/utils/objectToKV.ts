//将vue组价props对象在装换成kv型对象

export function objectToKV(obj:Record<string,any>){
    let KV={}
    for (let key in obj) {
        KV[key]=obj[key].default
      }
    return KV
}