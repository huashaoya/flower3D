import { Manager } from "./core/Manager";

//全局管理对象构建器
export class ManagerBuilder{
    private static managers=new Map<number, Manager>()

    //根据id返回全局管理对象
    static getManager(id:number){
        let manager=this.managers.get(id)
        if(!manager){
            manager=new Manager()
            this.managers.set(id,manager)
        }
        return manager
    }
}