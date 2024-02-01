import * as CANNON from 'cannon-es'

 const world=new CANNON.World()
 world.gravity.set(0, -9.8, 0)
 export default world