export default class Bag<T> {
	bag: T[] = [];
	constructor(private items: T[]) {}

	take() {
		if (this.bag.length === 0) this.refill();

		// biome-ignore lint/style/noNonNullAssertion: we've just refilled it in case it's empty
		return this.bag.pop()!;
	}

	peek() {
		if (this.bag.length === 0) this.refill();

		// biome-ignore lint/style/noNonNullAssertion: we've just refilled it in case it's empty
		return this.bag.at(-1)!;
	}

	private refill() {
		this.bag = [...this.items].sort(() => Math.random() - 0.5);
	}
}
