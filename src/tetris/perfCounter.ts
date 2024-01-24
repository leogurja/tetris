class PerfCounter {
	times: number[] = [];
	lastTime = +new Date();

	avg() {
		return this.times.reduce((curr, acc) => curr + acc, 0) / this.times.length;
	}

	start() {
		this.lastTime = +new Date();
	}

	stop() {
		this.push(+new Date() - this.lastTime);
	}

	private push(ms: number) {
		if (this.times.length > 20) {
			this.times.pop();
		}
		this.times.unshift(ms);
		console.log(`current: ${ms}ms, average: ${this.avg()}ms`);
	}
}

export default new PerfCounter();
