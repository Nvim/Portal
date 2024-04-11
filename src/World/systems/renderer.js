import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer();

  // turn on PCL:
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };
