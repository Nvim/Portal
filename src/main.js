import { World } from "./World/World.js";

function main() {
  const container = document.querySelector("#scene-container");

  const world = new World(container);

  world.start();
}

// const button = document.querySelector("#clickme");
// button.addEventListener("click", function () {
//   main();
//   console.log("button clicked");
// });
main();
