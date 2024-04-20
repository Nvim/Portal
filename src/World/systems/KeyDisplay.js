const Z = "z";
const Q = "q";
const S = "s";
const D = "d";
const SHIFT = "shift";
const DIRECTIONS = [Z, Q, S, D];

export class KeyDisplay {
  map = new Map();

  constructor() {
    const w = document.createElement("div");
    const a = document.createElement("div");
    const s = document.createElement("div");
    const d = document.createElement("div");
    const shift = document.createElement("div");

    this.map.set(Z, w);
    this.map.set(Q, a);
    this.map.set(S, s);
    this.map.set(D, d);
    this.map.set(SHIFT, shift);

    this.map.forEach((v, k) => {
      v.style.color = "blue";
      v.style.fontSize = "50px";
      v.style.fontWeight = "800";
      v.style.position = "absolute";
      v.textContent = k;
    });

    this.map.forEach((v, _) => {
      document.body.append(v);
    });
  }

  updatePosition() {
    for (let [key, value] of this.map) {
      value.style.top = `${window.innerHeight - 150}px`;
    }
    this.map.get(SHIFT).style.top = `${window.innerHeight - 500}px`;
    this.map.get(Z).style.left = `${300}px`;
    this.map.get(Q).style.left = `${200}px`;
    this.map.get(S).style.left = `${300}px`;
    this.map.get(D).style.left = `${400}px`;
    this.map.get(SHIFT).style.left = `${50}px`;
  }

  down(key) {
    if (this.map.get(key.toLowerCase())) {
      this.map.get(key.toLowerCase()).style.color = "red";
    }
  }

  up(key) {
    if (this.map.get(key.toLowerCase())) {
      this.map.get(key.toLowerCase()).style.color = "blue";
    }
  }

  listen() {
    this.updatePosition();
    document.addEventListener(
      "keydown",
      (event) => {
        this.down(event.key);
      },
      false,
    );
    document.addEventListener(
      "keyup",
      (event) => {
        this.up(event.key);
      },
      false,
    );
  }
}
