import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createOrbitControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;
  controls.minDistance = 5;
  controls.maxDistance = 15;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2 - 0.05;
  controls.autoRotate = false;
  controls.tick = () => controls.update();

  controls.update();

  return controls;
}

export { createOrbitControls as createControls };
