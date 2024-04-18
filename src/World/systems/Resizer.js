const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {
    setSize(container, camera, renderer);

    window.addEventListener("resize", () => {
      setSize(container, camera, renderer);

      // call the hook:
      this.onResize();
    });
  }

  /* Empty method that will be implemented
   * in the World class.
   * This avoids passing the whole World object here */
  onResize() {}
}

export { Resizer };
