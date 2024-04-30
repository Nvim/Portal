import { DoubleSide, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { addPhysics } from "./physics";

const floorWidth = 50;
const floorLength = 50;

function createFloorMesh() {
  const geometry = new PlaneGeometry(floorWidth, floorLength);
  const material = new MeshStandardMaterial({
    color: "gray",
    side: DoubleSide,
  });
  const floorMesh = new Mesh(geometry, material);
  floorMesh.rotation.x = -Math.PI / 2;

  return floorMesh;
}

function createFloor() {
  const floorMesh = createFloorMesh();
  const floorObject = addPhysics(
    floorMesh,
    {
      width: floorWidth,
      height: 0.01,
      depth: floorLength,
    },
    "fixed",
    "cuboid",
    true,
  );

  return floorObject;
}

export { createFloor };
