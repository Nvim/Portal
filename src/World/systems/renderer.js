import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  // turn on PCL:
  renderer.physicallyCorrectLights = true;

  return renderer;
}

export { createRenderer };
