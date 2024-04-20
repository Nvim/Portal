export class InputHandler {
  constructor() {
    this.init();
  }
  init() {
    this.current = {
      leftClick: false,
      rightClick: false,
      mouseX: 0,
      mouseY: 0,
      mouseDeltaX: 0,
      mouseDeltaY: 0,
    };
    this.previous = null;
    this.keys = {};
    this.previousKeys = {};

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
  }

  onMouseDown(event) {
    switch (event.button) {
      case 0: {
        this.current.leftClick = true;
        break;
      }
      case 2: {
        this.current.rightClick = true;
        break;
      }
    }
  }
  onMouseUp(event) {
    switch (event.button) {
      case 0: {
        this.current.leftClick = false;
        break;
      }
      case 2: {
        this.current.rightClick = false;
        break;
      }
    }
  }
  onMouseMove(event) {
    this.current.mouseX = event.pageX - window.innerWidth / 2;
    this.current.mouseY = event.pageY - window.innerHeight / 2;
    if (this.previous === null) {
      this.previous = { ...this.current };
    }

    this.current.mouseDeltaX = this.current.mouseX - this.previous.mouseX;
    this.current.mouseDeltaY = this.current.mouseY - this.previous.mouseY;
  }
  onKeyDown(event) {
    this.keys[event.keyCode] = true;
  }
  onKeyUp(event) {
    this.keys[event.keyCode] = false;
  }

  update() {
    this.previous = { ...this.current };
  }
}
