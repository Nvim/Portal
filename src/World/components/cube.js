import { Mesh, MeshToonMaterial } from "three";
import { MeshBasicMaterial } from "three";
import { BoxGeometry } from "three";

function createCube() {
  const geometry = new BoxGeometry(2, 2, 2);
  const material = new MeshBasicMaterial();
  const material2 = new MeshToonMaterial();

  const cube = new Mesh(geometry, material);
  const cube2 = new Mesh(geometry, material2);

  return { cube, cube2 };
}

export { createCube };
