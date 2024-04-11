import { Mesh, MeshToonMaterial } from "three";
import { MeshBasicMaterial } from "three";
import { MeshStandardMaterial } from "three";
import { BoxGeometry } from "three";

function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshToonMaterial({ color: "purple" });
  const material2 = new MeshStandardMaterial({ color: "orange" });

  const cube = new Mesh(geometry, material);
  const cube2 = new Mesh(geometry, material2);

  cube.rotation.set(-0.5, -0.1, 0.8);

  return { cube, cube2 };
}

export { createCube };
