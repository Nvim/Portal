import { createCamera } from "./components/camera.js";
import { createMeshGroup } from "./components/meshGroup.js";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/renderer";
import { createLights } from "./components/lights.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { createControls } from "./systems/orbitControls.js";
import { createFloor } from "./components/floor.js";
import { KeyDisplay } from "./systems/KeyDisplay.js";
import { createFPSControls } from "./systems/fpsControls.js";
import { FpsCamera } from "./components/FpsCamera.js";

class World {
  #fpsCamera;
  #scene;
  #renderer;
  #loop;

  constructor(container) {
    let camera = createCamera();
    this.#scene = createScene();
    this.#renderer = createRenderer();
    this.#fpsCamera = new FpsCamera(camera, this.#renderer);
    this.#loop = new Loop(this.#fpsCamera.camera, this.#scene, this.#renderer);
    container.append(this.#renderer.domElement);

    const floor = createFloor();
    const meshGroup = createMeshGroup();
    const { light, ambientLight } = createLights();
    // const controls = createControls(this.#camera, this.#renderer.domElement);
    // const controls = createFPSControls(
    //   this.#fpsCamera.camera,
    //   this.#renderer.domElement,
    // );
    // const keyDisplay = new KeyDisplay();
    // keyDisplay.listen();

    this.#loop.updatables.push(this.#fpsCamera);

    this.#scene.add(meshGroup, ambientLight);

    const resizer = new Resizer(
      container,
      this.#fpsCamera.camera,
      this.#renderer,
    );
    resizer.onResize = () => {
      controls.handleResize;
    };
  }

  render() {
    this.#renderer.render(this.#scene, this.#fpsCamera.camera);
  }

  start() {
    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }
}

export { World };
