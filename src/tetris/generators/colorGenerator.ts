import shuffle from "./shuffle";

const colors = [
  "bg-sky-600 border-2 border-l-sky-400 border-t-sky-400 border-b-sky-800 border-r-sky-800",
  "bg-orange-600 border-2 border-l-orange-400 border-t-orange-400 border-b-orange-800 border-r-orange-800",
  "bg-green-600 border-2 border-l-green-400 border-t-green-400 border-b-green-800 border-r-green-800",
  "bg-red-600 border-2 border-l-red-400 border-t-red-400 border-b-red-800 border-r-red-800",
  "bg-fuchsia-600 border-2 border-l-fuchsia-400 border-t-fuchsia-400 border-b-fuchsia-800 border-r-fuchsia-800",
  "bg-purple-600 border-2 border-l-purple-400 border-t-purple-400 border-b-purple-800 border-r-purple-800",
  "bg-blue-600 border-2 border-l-blue-400 border-t-blue-400 border-b-blue-800 border-r-blue-800",
];

class ColorGenerator {
  #bag: string[] = [];

  take() {
    if (this.#bag.length === 0) this.#bag = shuffle([...colors]);

    const color = this.#bag.pop();

    if (color == null) throw new Error("Cor não definida???");
    return color;
  }
}

export default new ColorGenerator();
