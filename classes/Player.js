class Player {
    constructor(name) {
        this.name = name;
    }
    #times = [];
    recordTime(start, end) {
        this.#times.push((end - start) / 1000);
    }
    showStats() {
        let sum = 0;
        this.#times.forEach(item => {
            sum += item;
        })
        console.log(`Total time: ${sum} seconds\nAverage per riddle: ${sum / this.#times.length} seconds`);
    }
}

export {
    Player
}