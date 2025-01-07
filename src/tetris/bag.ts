export class Bag<T> {
  bag: T[] = [];
  private items: T[];
  constructor(items: T[]) {
    this.items = items;
  }

  take() {
    if (this.bag.length === 0) this.refill();

    return this.bag.pop() as NonNullable<T>;
  }

  peek() {
    if (this.bag.length === 0) this.refill();

    return this.bag.at(-1) as NonNullable<T>;
  }

  private refill() {
    this.bag = [...this.items].sort(() => Math.random() - 0.5);
  }
}
