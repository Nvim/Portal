import {
  Mesh,
  Group,
  MathUtils,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshToonMaterial,
  OctahedronGeometry,
  MeshStandardMaterial,
  BoxGeometry,
  SphereGeometry,
} from "three";

function createMeshGroup() {
  const geometry = new SphereGeometry(0.5, 16, 16);
  const material = new MeshStandardMaterial({ color: "indigo" });
  const group = new Group();

  const radiansPerSec = MathUtils.degToRad(30);

  const protoSphere = new Mesh(geometry, material);

  for (let i = 0; i < 1; i += 0.01) {
    const sphere = protoSphere.clone();

    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);
    sphere.position.z -= -i * 5;
    sphere.scale.multiplyScalar(0.01 + i);

    group.add(sphere);
  }
  group.scale.multiplyScalar(2);

  group.tick = (delta) => {
    group.rotation.z -= delta * radiansPerSec;
  };
  return group;
}

export { createMeshGroup };
