import { Camera, Quaternion, Vector3 } from "three";
import { InputHandler } from "../systems/InputHandler";

const KEYS = {
  a: "KeyA",
  s: "KeyS",
  w: "KeyW",
  d: "KeyD",
  space: "Space",
  shiftL: "ShiftLeft",
  shiftR: "ShiftRight",
};

function five() {
  return 5;
}

function zero() {
  return 0;
}

function clamp(x, a, b) {
  return Math.min(Math.max(x, a), b);
}

export class FpsCamera {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;
    this.input = new InputHandler(renderer);
    this.rotation = new Quaternion();
    this.translation = new Vector3();
    this.phi = 0;
    this.theta = 0;
  }

  tick(timeElapsedS) {
    this.updateRotation(timeElapsedS);
    this.updateTranslation(timeElapsedS);
    this.updateCamera(timeElapsedS);
    this.input.update();
  }

  updateCamera() {
    this.camera.quaternion.copy(this.rotation);
    this.camera.translateX(this.translation.x);
    this.camera.translateZ(this.translation.z);
  }

  updateRotation(timeElapsedS) {
    const xh = this.input.mouseState.mouseDeltaX / window.innerWidth;
    const yh = this.input.mouseState.mouseDeltaY / window.innerHeight;

    this.phi += -xh * 5;
    this.theta = clamp(this.theta + -yh * 5, -Math.PI / 2, Math.PI / 2);

    const qx = new Quaternion();
    qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi);

    const qz = new Quaternion();
    qz.setFromAxisAngle(new Vector3(1, 0, 0), this.theta);

    const q = new Quaternion();
    q.multiply(qx);
    q.multiply(qz);

    this.rotation.copy(q);
  }

  updateTranslation(timeElapsedS) {
    const forward = this.input.runFunctionByKey(KEYS.w, five, zero);
    const backward = this.input.runFunctionByKey(KEYS.s, five, zero);
    const right = this.input.runFunctionByKey(KEYS.d, five, zero);
    const left = this.input.runFunctionByKey(KEYS.a, five, zero);

    let sideVelocity = right - left;
    let forwardVelocity = backward - forward;

    sideVelocity *= timeElapsedS;
    forwardVelocity *= timeElapsedS;

    this.translation.set(sideVelocity, 0, forwardVelocity);
  }
}
