class ObjectPoolMember {
  constructor(data) {
    this.data = data;
    this.free = true;
  }
}

export class ObjectPool {
  #poolArray;
  #constructorFunction;
  #resetFunction;

  constructor(constructorFunction, resetFunction, initialSize = 1000) {
    this.#constructorFunction = constructorFunction;
    this.#resetFunction = resetFunction;
    this.#poolArray = new Array(initialSize)
      .fill(0)
      .map(() => this.createElement());
  }

  createElement() {
    const data = this.#constructorFunction();
    return new ObjectPoolMember(data);
  }

  getElement() {
    for (let i = 0; i < this.#poolArray.length; i++) {
      if (this.#poolArray[i].free) {
        this.#poolArray[i].free = false;
        return this.#poolArray[i];
      }
    }

    // when we run out of elements (it means the above return didn't run)
    const newElement = this.createElement();
    newElement.free = false;
    this.#poolArray.push(newElement);
    return newElement;
  }

  releaseElement(element) {
    element.free = true;
    this.#resetFunction(element.data);
  }
}
