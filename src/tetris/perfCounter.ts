class PerfCounter {
  times: number[] = [];
  lastTime = +Date.now();

  avg() {
    return this.times.reduce((curr, acc) => curr + acc, 0) / this.times.length;
  }

  start() {
    this.lastTime = +Date.now();
  }

  stop() {
    this.push(+Date.now() - this.lastTime);
  }

  private push(ms: number) {
    if (this.times.length > 20) {
      this.times.pop();
    }
    this.times.unshift(ms);
    console.log(`current: ${ms.toFixed(2)}ms, average: ${this.avg().toFixed(2)}ms`);
  }
}

export const perfCounter = new PerfCounter();
