import { usePhysics } from "../World";
import { usePhysicsObjects } from "../World";

export class PhysicsObject {
  constructor(mesh, rigidBody, collider) {
    this.mesh = mesh;
    this.rigidBody = rigidBody;
    this.collider = collider;
    this.autoAnimate = true;
  }

  tick() {
    if (this.autoAnimate) {
      this.mesh.position.copy(this.collider.translation());
      this.mesh.quaternion.copy(this.collider.rotation());
    }
  }
}

export function addPhysics(
  mesh,
  colliderSettings, // attributes depending on the collider type
  rigidBodyType = "dynamic",
  colliderType = "cuboid",
  autoAnimate = true,
) {
  const { rapier, world } = usePhysics();
  const physicsObjects = usePhysicsObjects();
  const rigidBodyDesc = rapier.RigidBodyDesc[rigidBodyType]();
  rigidBodyDesc.setTranslation(
    mesh.position.x,
    mesh.position.y,
    mesh.position.z,
  );
  const rigidBody = world.createRigidBody(rigidBodyDesc);

  // TODO: add more shapes
  let colliderDesc;
  switch (colliderType) {
    case "cuboid":
      {
        const { width, height, depth } = colliderSettings;
        colliderDesc = rapier.ColliderDesc.cuboid(width, height, depth);
      }
      break;
    case "ball":
      {
        const radius = colliderSettings[0];
        console.log("radius: ", radius);
        colliderDesc = rapier.ColliderDesc.ball(radius);
      }
      break;
    // TODO: make default trimesh
    default:
      colliderDesc = rapier.ColliderDesc.cuboid(0.5, 0.5, 0.5);
      break;
  }
  if (!colliderDesc) {
    console.error("Collider Mesh Error: convex mesh creation failed.");
  }
  const collider = world.createCollider(colliderDesc, rigidBody);

  const object = new PhysicsObject(mesh, rigidBody, collider, autoAnimate);
  console.log(object);
  physicsObjects.push(object);
  return object;
}
