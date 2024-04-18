import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

function createLights() {
  const light = new DirectionalLight("white", 0);
  light.position.set(10, 10, 10);

  const ambientLight = new HemisphereLight("white", "darkblue", 10);
  return { light, ambientLight };
}

export { createLights };
