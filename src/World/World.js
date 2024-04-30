import { createCamera } from "./components/camera.js";
import { createMeshGroup } from "./components/meshGroup.js";
import { createScene } from "./components/scene";
import { createRenderer } from "./systems/renderer";
import { createLights } from "./components/lights.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";
import { createFloor } from "./components/floor.js";
import { KeyDisplay } from "./systems/KeyDisplay.js";
import { FpsCamera } from "./components/FpsCamera.js";
import { createSphere } from "./components/sphere.js";
import { getRapier } from "./components/initRapier.js";

export let usePhysics = () => {};
export let usePhysicsObjects = () => {};

class World {
  #fpsCamera;
  #scene;
  #renderer;
  #loop;
  #rapier;
  #physicsObjects = [];
  #physicsWorld;

  constructor(container) {
    let camera = createCamera();
    this.#scene = createScene();
    this.#renderer = createRenderer();
    this.#fpsCamera = new FpsCamera(camera, this.#renderer);
    this.#loop = new Loop(this.#fpsCamera.camera, this.#scene, this.#renderer);
    container.append(this.#renderer.domElement);

    this.#loop.updatables.push(this.#fpsCamera);
    // const meshGroup = createMeshGroup();
    // const keyDisplay = new KeyDisplay();
    // keyDisplay.listen();

    const resizer = new Resizer(
      container,
      this.#fpsCamera.camera,
      this.#renderer,
    );
    resizer.onResize = () => {
      //controls.handleResize;
    };
  }

  render() {
    this.#renderer.render(this.#scene, this.#fpsCamera.camera);
  }

  // init physics here since i cant in constructor
  async start() {
    this.#rapier = await getRapier();
    let gravity = { x: 0, y: -9.81, z: 0 };
    this.#physicsWorld = new this.#rapier.World(gravity);
    usePhysics = () => {
      return { rapier: this.#rapier, world: this.#physicsWorld };
    };
    usePhysicsObjects = () => {
      return this.#physicsObjects;
    };
    const { light, ambientLight } = createLights();

    const sphere = createSphere();
    const floor = createFloor();

    this.#scene.add(floor.mesh, sphere.mesh, ambientLight);
    this.#loop.updatables.push(sphere);

    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }
}

export { World };
