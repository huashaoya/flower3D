import { BufferAttribute, BufferGeometry, Mesh, Object3D, Quaternion, Vector3 } from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
const _v1 = new Vector3();
const _v2 = new Vector3();
const _q1 = new Quaternion();

/**
* Returns a single geometry for the given object. If the object is compound,
* its geometries are automatically merged. Bake world scale into each
* geometry, because we can't easily apply that to the cannonjs shapes later.
*/
export function getGeometry(object: Object3D): BufferGeometry | null {
	const meshes = getMeshes(object);
	if (meshes.length === 0) return null;

	// Single mesh. Return, preserving original type.
	if (meshes.length === 1) {
		return normalizeGeometry(meshes[0]);
	}
	// Multiple meshes. Merge and return.
	let mesh: Mesh | undefined;
	const geometries: BufferGeometry[] = [];
	while ((mesh = meshes.pop())) {
		//geometries.push(simplifyGeometry(normalizeGeometry(mesh)));
		geometries.push(normalizeGeometry(mesh));
	}

	return mergeBufferGeometries(geometries);
}
function normalizeGeometry(mesh: Mesh): BufferGeometry {
	// 克隆原始几何体以保留原始数据
	const geometry: BufferGeometry = mesh.geometry.clone();

	// 确保几何体使用的是BufferGeometry
	if (!geometry.isBufferGeometry) {
		console.error('Geometry is not a BufferGeometry.');
		return geometry;
	}

	// 更新世界矩阵
	//mesh.updateMatrixWorld();
	// 获取顶点位置属性
	const positionAttribute = geometry.attributes.position;
	const positionArray = positionAttribute.array;

	// 创建一个新的浮点数组来存储变换后的顶点位置
	const transformedPositionArray = new Float32Array(positionArray.length);

	// 临时向量用于存储和变换每个顶点位置
	const vertex = new Vector3();

	// 遍历每个顶点，应用变换
	for (let i = 0; i < positionArray.length; i += 3) {
		vertex.set(positionArray[i], positionArray[i + 1], positionArray[i + 2]);
		// 应用mesh的世界矩阵变换到顶点

		vertex.applyMatrix4(mesh.matrixWorld);
		transformedPositionArray[i] = vertex.x;
		transformedPositionArray[i + 1] = vertex.y;
		transformedPositionArray[i + 2] = vertex.z;
	}

	// 使用变换后的顶点位置更新几何体
	geometry.setAttribute('position', new BufferAttribute(transformedPositionArray, 3));
	
	return geometry;
}
/**
 * Greatly simplified version of BufferGeometryUtils.mergeBufferGeometries.
 * Because we only care about the vertex positions, and not the indices or
 * other attributes, we throw everything else away.
 */
function mergeBufferGeometries(geometries:BufferGeometry[]) {
	return BufferGeometryUtils.mergeGeometries(geometries, false);
}
export function getVertices(geometry: BufferGeometry): Float32Array {
	const position = geometry.attributes.position;
	const vertices = new Float32Array(position.count * 3);
	for (let i = 0; i < position.count; i++) {
		vertices[i * 3] = position.getX(i);
		vertices[i * 3 + 1] = position.getY(i);
		vertices[i * 3 + 2] = position.getZ(i);
	}
	return vertices;
}

/**
* Returns a flat array of THREE.Mesh instances from the given object. If
* nested transformations are found, they are applied to child meshes
* as mesh.userData.matrix, so that each mesh has its position/rotation/scale
* independently of all of its parents except the top-level object.
*/
function getMeshes(object: Object3D): Mesh[] {
	const meshes: Mesh[] = [];
	object.traverse(function (o) {
		if ((o as Mesh).isMesh) {
			meshes.push(o as Mesh);
		}
	});
	return meshes;
}

export function getComponent(v: Vector3, component: string): number {
	switch (component) {
		case 'x': return v.x;
		case 'y': return v.y;
		case 'z': return v.z;
	}
	throw new Error(`Unexpected component ${component}`);
}

/**
* Modified version of BufferGeometryUtils.mergeVertices, ignoring vertex
* attributes other than position.
*
* @param {THREE.BufferGeometry} geometry
* @param {number} tolerance
* @return {THREE.BufferGeometry>}
*/
function simplifyGeometry(geometry: BufferGeometry, tolerance = 1e-4): BufferGeometry {

	tolerance = Math.max(tolerance, Number.EPSILON);

	// Generate an index buffer if the geometry doesn't have one, or optimize it
	// if it's already available.
	const hashToIndex: { [key: string]: number } = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute('position');
	const vertexCount = indices ? indices.count : positions.count;

	// Next value for triangle indices.
	let nextIndex = 0;

	const newIndices = [];
	const newPositions = [];

	// Convert the error tolerance to an amount of decimal places to truncate to.
	const decimalShift = Math.log10(1 / tolerance);
	const shiftMultiplier = Math.pow(10, decimalShift);

	for (let i = 0; i < vertexCount; i++) {

		const index = indices ? indices.getX(i) : i;

		// Generate a hash for the vertex attributes at the current index 'i'.
		let hash = '';

		// Double tilde truncates the decimal value.
		hash += `${~ ~(positions.getX(index) * shiftMultiplier)},`;
		hash += `${~ ~(positions.getY(index) * shiftMultiplier)},`;
		hash += `${~ ~(positions.getZ(index) * shiftMultiplier)},`;

		// Add another reference to the vertex if it's already
		// used by another index.
		if (hash in hashToIndex) {

			newIndices.push(hashToIndex[hash]);

		} else {

			newPositions.push(positions.getX(index));
			newPositions.push(positions.getY(index));
			newPositions.push(positions.getZ(index));

			hashToIndex[hash] = nextIndex;
			newIndices.push(nextIndex);
			nextIndex++;

		}

	}

	// Construct merged BufferGeometry.

	const positionAttribute = new BufferAttribute(
		new Float32Array(newPositions),
		positions.itemSize,
		positions.normalized
	);

	const result = new BufferGeometry();
	result.setAttribute('position', positionAttribute);
	result.setIndex(newIndices);

	return result;

}
