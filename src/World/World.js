import { createCamera } from "./components/camera.js";
import { createMeshGroup } from "./components/meshGroup.js";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/renderer";
import { createLights } from "./components/lights.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { createControls } from "./systems/controls.js";

class World {
  #camera;
  #scene;
  #renderer;
  #loop;

  constructor(container) {
    this.#camera = createCamera();
    this.#scene = createScene();
    this.#renderer = createRenderer();
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer);
    container.append(this.#renderer.domElement);

    const meshGroup = createMeshGroup();
    const { light, ambientLight } = createLights();
    const controls = createControls(this.#camera, this.#renderer.domElement);

    this.#loop.updatables.push(controls);
    this.#loop.updatables.push(meshGroup);

    this.#scene.add(meshGroup, ambientLight);

    const resizer = new Resizer(container, this.#camera, this.#renderer);
  }

  render() {
    this.#renderer.render(this.#scene, this.#camera);
  }

  start() {
    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }
}

export { World };
