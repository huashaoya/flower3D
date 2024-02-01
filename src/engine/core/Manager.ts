import { Member } from "./Member"

export class Manager{
    members:Member[]
    constructor(){
        this.members=[]
    }
    update(){
        this.members.forEach(item=>{
            item.updateFromPhysics()
        })
    }
}