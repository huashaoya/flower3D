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
   locked: boolean = false

   constructor(manager: Manager, target: Member) {
      super(null, null)
      this.camera = new THREE.PerspectiveCamera(75, manager.renderer.domElement.offsetWidth / manager.renderer.domElement.offsetHeight, 0.1, 1000)
      this.camera.position.z = 10
      this.target = target
      manager.cameraActiveIndex = (manager.cameras.push(this.camera) - 1)
      this.dom = manager.renderer.domElement
      this.dom.addEventListener('mousedown', this.boundOnMouseDown, false);
      document.addEventListener('pointerlockchange', this.onPointerlockChange, false);
   }

   update() {
      if (this.target.object3D) {
         const target = this.target.object3D.position
         this.camera.position.x = target.x + this.radius * Math.sin(this.theta * Math.PI / 180) * Math.cos(this.phi * Math.PI / 180);
         this.camera.position.y = target.y + this.radius * Math.sin(this.phi * Math.PI / 180);
         this.camera.position.z = target.z + this.radius * Math.cos(this.theta * Math.PI / 180) * Math.cos(this.phi * Math.PI / 180);
         this.camera.updateMatrix();
         this.camera.lookAt(new THREE.Vector3(target.x, target.y + 4, target.z));
      }
   }

   move(deltaX: number, deltaY: number) {
      this.theta -= deltaX * (0.25);
      this.theta %= 360;
      this.phi += deltaY * (0.25);
      this.phi = Math.min(85, Math.max(-85, this.phi));
   }

   boundOnMouseDown = (event: MouseEvent) => {
      if (this.locked == false) {
         this.dom.requestPointerLock()
      }

   }

   boundOnMouseMove = (event: MouseEvent) => {
      //console.log(this)
      if (this.locked) {
         this.move(event.movementX, event.movementY)
         //console.log(event)
      }

   }

   onPointerlockChange = (event: any) => {
      if (document.pointerLockElement == this.dom) {
         this.dom.addEventListener('mousemove', this.boundOnMouseMove, false);
         this.locked = true;
      } else {
         this.dom.removeEventListener('mousemove', this.boundOnMouseMove, false);
         this.locked = false;
      }
   }
}