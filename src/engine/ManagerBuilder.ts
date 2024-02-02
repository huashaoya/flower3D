import { Manager } from "./core/Manager";

export class ManagerBuilder{
    static managers=new Map()
    static getManager(id:Number){
        let manager=this.managers.get(id)
        if(!manager){
            manager=new Manager()
            this.managers.set(id,manager)
        }
        return manager
    }
}