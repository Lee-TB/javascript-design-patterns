import { ObjectPool } from "./ObjectPool.js";

class Enemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  set({ x, y, width, height }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  spawn(x, y){
    this.x = x;
    this.y = y;
  }

  update() {
    this.x += 10;
    this.y += 20;
  }
}

const enemyPool = new ObjectPool(
  () => new Enemy(0, 0, 50, 100),
  (enemy) => {
    enemy.set({ x: Infinity, y: Infinity, width: 50, height: 100 });
  },
  3
);

// get an element to use
const enemyElement = enemyPool.getElement();

// use enemy (spawn and update enemy)
enemyElement.data.spawn(100, 200);
console.log('after spawn', enemyElement.data);
enemyElement.data.update();
console.log('after update', enemyElement.data);

// not use anymore (when enemy die for example)
enemyPool.releaseElement(enemyElement)
console.log('after release', enemyElement);
console.log(enemyPool);

// if out of array size
const enemyElement1 = enemyPool.getElement();
const enemyElement2 = enemyPool.getElement();
const enemyElement3 = enemyPool.getElement();
const enemyElementOutOfSize = enemyPool.getElement();
console.log('after get four element', enemyPool);

