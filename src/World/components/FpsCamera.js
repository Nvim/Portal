import { Quaternion, Vector3 } from "three";
import { InputHandler } from "../systems/InputHandler";

function clamp(x, a, b) {
  return Math.min(Math.max(x, a), b);
}

export class FpsCamera {
  constructor(camera) {
    this.camera = camera;
    this.input = new InputHandler();
    this.rotation = new Quaternion();
    this.translation = new Vector3();
    this.phi = 0;
    this.theta = 0;
  }

  tick(timeElapsedS) {
    this.updateRotation(timeElapsedS);
    this.updateCamera(timeElapsedS);
  }

  updateCamera() {
    this.camera.quaternion.copy(this.rotation);
  }

  updateRotation(timeElapsedS) {
    const xh = this.input.current.mouseDeltaX / window.innerWidth;
    const yh = this.input.current.mouseDeltaY / window.innerHeight;

    this.phi += -xh * 5;
    this.theta = clamp(this.theta + -yh * 5, Math.PI / 3, -Math.PI / 3);

    const qx = new Quaternion();
    qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi);

    const qz = new Quaternion();
    qz.setFromAxisAngle(new Vector3(1, 0, 0), this.theta);

    const q = new Quaternion();
    q.multiply(qx);
    q.multiply(qz);

    this.rotation.copy(q);
  }
}
