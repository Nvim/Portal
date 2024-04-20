import { FirstPersonControls } from "three/addons/controls/FirstPersonControls.js";

function createFPSControls(camera, canvas) {
  const controls = new FirstPersonControls(camera, canvas);

  controls.properties = {
    constrainVertical: true,
    dragToLook: true,
    lookSpeed: 0.8,
    movementSpeed: 5,
  };

  controls.tick = (delta) => controls.update(delta);

  return controls;
}

export { createFPSControls };
