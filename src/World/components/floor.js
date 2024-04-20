import { Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

function createFloor() {
  const width = 80;
  const length = 80;

  const geometry = new PlaneGeometry(width, length, 512, 512);
  const material = new MeshStandardMaterial({ color: 0x00ff00 });
  const floor = new Mesh(geometry, material);

  floor.rotation.x = -Math.PI / 2;

  return floor;
}

export { createFloor };
