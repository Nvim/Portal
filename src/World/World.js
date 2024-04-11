import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/renderer";
import { createLights } from "./components/lights.js";
import { Resizer } from "./systems/Resizer.js";

class World {
  #camera;
  #scene;
  #renderer;

  constructor(container) {
    this.#camera = createCamera();
    this.#scene = createScene();
    this.#renderer = createRenderer();
    container.append(this.#renderer.domElement);

    const cubes = createCube();
    this.#scene.add(cubes.cube);
    this.#scene.add(cubes.cube2);
    cubes.cube2.position.set(0, 2, 0);
    cubes.cube2.scale.set(0.5, 0.5, 0.5);

    const light = createLights();
    this.#scene.add(light);

    const resizer = new Resizer(container, this.#camera, this.#renderer);
  }

  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }
}

export { World };
