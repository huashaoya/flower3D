import * as CANNON from 'cannon-es';

export class BoxCollider {
	public body: CANNON.Body;

	constructor(w: number, h: number, d: number) {
		const position = new CANNON.Vec3(0, 0, 0);
		const size = new CANNON.Vec3(w, h, d);

		let mat = new CANNON.Material('boxMat');
		let shape = new CANNON.Box(size);

		let physBox = new CANNON.Body({
			mass: 0,
			position: position,
			shape
		});

		physBox.material = mat;
		this.body = physBox;
	}
}