class Resizer {
  constructor(container, camera, renderer) {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix(); // recalculate frustum based on aspect raito

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  }
}

export { Resizer };
