import { Member } from "../Member";
import { Manager } from "../Manager";
import * as THREE from "three";

export class ThirdPersonCamera extends Member {
   target: Member
   camera: THREE.PerspectiveCamera
   theta: number = 180
   phi: number = 40
   radius: number = 20
   dom: HTMLCanvasElement
   mouseLocked: boolean = false
   locked: boolean = false
   offsetY: number = 0
   sensitivity = {
      x: 0.25,
      y: 0.25
   }
   constructor(manager: Manager, target: Member) {
      super(null, null)
      this.camera = new THREE.PerspectiveCamera(75, manager.renderer.domElement.offsetWidth / manager.renderer.domElement.offsetHeight, 0.1, 1000)
      this.camera.position.z = 10
      this.target = target
      manager.cameraActiveIndex = (manager.cameras.push(this.camera) - 1)
      this.dom = manager.renderer.domElement
      this.dom.addEventListener('mousedown', this.boundOnMouseDown, false);
      document.addEventListener('pointerlockchange', this.onPointerlockChange, false);
      this.setters = {
         ...this.setters,
         locked: this.setLocked,
         offsetY: this.setOffsetY,
         distance: this.setDistance
      }
   }

   update() {
      if (this.target.object3D) {
         const target = this.target.object3D.position
         const rotation = this.target.object3D.rotation
         this.camera.position.x = target.x + this.radius * Math.sin(this.theta * Math.PI / 180) * Math.cos(this.phi * Math.PI / 180);
         this.camera.position.y = target.y + this.radius * Math.sin(this.phi * Math.PI / 180);
         this.camera.position.z = target.z + this.radius * Math.cos(this.theta * Math.PI / 180) * Math.cos(this.phi * Math.PI / 180);
         this.camera.updateMatrix();
         this.camera.lookAt(new THREE.Vector3(target.x, target.y + this.offsetY, target.z));
         if (this.locked) {
            // 计算目标角度
            let targetTheta = (this.theta - 180) / 180 * Math.PI;
            const delta = targetTheta - this.target.object3D.rotation.y

            let circle = Math.trunc(delta / (Math.PI * 2))

            this.theta -= circle * 360
            targetTheta -= circle * 2 * Math.PI
            
            if (Math.abs(delta % (Math.PI * 2)) > Math.PI) {
               this.theta -= 360
               targetTheta -= 2 * Math.PI
            }

            const lerpedTheta = THREE.MathUtils.lerp(this.target.object3D.rotation.y, targetTheta, 0.1);
            this.target.object3D.rotation.set(rotation.x, lerpedTheta, rotation.z);
         }
      }
   }

   move(deltaX: number, deltaY: number) {
      this.theta -= deltaX * this.sensitivity.x;
      //this.theta %= 360;
      this.phi += deltaY * this.sensitivity.y;
      this.phi = Math.min(75, Math.max(-75, this.phi));
   }

   boundOnMouseDown = () => {
      if (this.mouseLocked == false) {
         this.dom.requestPointerLock()
      }

   }

   boundOnMouseMove = (event: MouseEvent) => {
      //console.log(this)
      if (this.mouseLocked) {
         this.move(event.movementX, event.movementY)
         //console.log(event)
      }

   }

   onPointerlockChange = () => {
      if (document.pointerLockElement == this.dom) {
         this.dom.addEventListener('mousemove', this.boundOnMouseMove, false);
         this.mouseLocked = true;
      } else {
         this.dom.removeEventListener('mousemove', this.boundOnMouseMove, false);
         this.mouseLocked = false;
      }
   }

   setLocked(value: boolean) {
      this.locked = value
   }
   setOffsetY(value: number) {
      this.offsetY = value
   }
   setDistance(value: number) {
      this.radius = value
   }
}