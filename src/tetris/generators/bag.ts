export default class Bag<T> {
  #bag: T[] = [];
  #items: T[];

  constructor(items: T[]) {
    this.#items = items;
  }

  take() {
    if (this.#bag.length === 0)
      this.#bag = [...this.#items].sort(() => Math.random() - 0.5);

    return this.#bag.pop() as T;
  }
}
