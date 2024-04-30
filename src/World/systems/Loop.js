import { Clock } from "three";
import { usePhysics } from "../World.js";

// module scope
const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;

    /* Objects we want to update on every frame/tick
     * They must have a .tick() method */
    this.updatables = [];
  }

  // updates every updatable, ran every frame
  tick() {
    // time between last 2 frames:
    const delta = clock.getDelta();
    const { rapier, world } = usePhysics();
    world.step();
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }

  // create animation loop
  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick();
      this.renderer.render(this.scene, this.camera);
    });
  }

  // remove animation loop
  stop() {
    this.renderer.setAnimationLoop(null);
  }
}

export { Loop };
