class MouseState {
  leftClick = false;
  rightClick = false;
  mouseDeltaX = 0;
  mouseDeltaY = 0;
}

export class InputHandler {
  constructor(renderer) {
    this.init(renderer);
  }
  init(renderer) {
    this.renderer = renderer;
    this.mouseState = new MouseState();
    this.keys = new Map();
    // this.previous = null;
    // this.previousKeys = {};

    document.addEventListener(
      "mousedown",
      (event) => {
        this.onMouseDown(event);
      },
      false,
    );
    document.addEventListener(
      "mouseup",
      (event) => {
        this.onMouseUp(event);
      },
      false,
    );
    document.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });
    document.addEventListener("keyup", (event) => {
      this.onKeyUp(event);
    });
    document.addEventListener("keydown", (event) => {
      this.onKeyDown(event);
    });

    // handle point lock:
    const addPointerLockEvent = async () => {
      await this.renderer.domElement.requestPointerLock();
    };
    this.renderer.domElement.addEventListener("click", addPointerLockEvent);
    this.renderer.domElement.addEventListener("mousedown", addPointerLockEvent);

    const setPoniterLocked = () => {
      this.pointerLocked =
        document.pointerLockElement === this.renderer.domElement;
    };
    document.addEventListener("pointerlockchange", setPoniterLocked, false);
  }

  onMouseDown(event) {
    if (this.pointerLocked) {
      this.onMouseMove(event);
      switch (event.button) {
        case 0: {
          this.mouseState.leftClick = true;
          break;
        }
        case 2: {
          this.mouseState.rightClick = true;
          break;
        }
      }
    }
  }
  onMouseUp(event) {
    if (this.pointerLocked) {
      this.onMouseMove(event);
      switch (event.button) {
        case 0: {
          this.mouseState.leftClick = false;
          break;
        }
        case 2: {
          this.mouseState.rightClick = false;
          break;
        }
      }
    }
  }
  onMouseMove(event) {
    if (this.pointerLocked) {
      this.mouseState.mouseDeltaX = event.movementX;
      this.mouseState.mouseDeltaY = event.movementY;
    }
  }

  onKeyDown(event) {
    if (this.pointerLocked) {
      this.keys.set(event.code, true);
    }
  }
  onKeyUp(event) {
    if (this.pointerLocked) {
      this.keys.set(event.code, false);
    }
  }

  isKeyDown(keyCode) {
    if (this.pointerLocked) {
      const hasKey = this.keys.get(keyCode);
      if (hasKey) {
        return hasKey;
      }
    }
    return false;
  }

  runFunctionByKey(keyCode, action, inaction) {
    if (this.isKeyDown(keyCode)) {
      return action();
    } else {
      return inaction();
    }
  }

  update() {
    this.mouseState.mouseDeltaX = 0;
    this.mouseState.mouseDeltaY = 0;
  }
}
