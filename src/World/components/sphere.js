import { Mesh, MeshStandardMaterial, SphereGeometry } from "three";
import { addPhysics } from "./physics";

function createSphereMesh() {
  const geometry = new SphereGeometry(0.5, 16, 16);
  const material = new MeshStandardMaterial({
    color: "purple",
  });
  const sphereMesh = new Mesh(geometry, material);
  sphereMesh.translateY(10);

  return sphereMesh;
}

function createSphere() {
  const sphereMesh = createSphereMesh();
  const sphereObject = addPhysics(sphereMesh, [0.5], "dynamic", "ball", true);

  return sphereObject;
}

export { createSphere };
