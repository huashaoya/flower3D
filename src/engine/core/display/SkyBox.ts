import { Member } from "../Member";
import { Manager } from "../Manager";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

export class SkyBox extends Member {
    constructor(props: Record<string, any>, manager: Manager) {
        super(null, null)
        const rgbeLoader = new RGBELoader()
        rgbeLoader.loadAsync(props.src).then((texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            manager.scene.background = texture
            manager.scene.environment = texture
        })
    }

}