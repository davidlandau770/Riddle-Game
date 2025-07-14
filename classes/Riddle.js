import { question } from "readline-sync";

class Riddle {
    constructor(riddle) {
        this.id = riddle.id;
        this.numberAsc = riddle.numberAsc;
        this.name = riddle.name;
        this.level = riddle.level;
        this.taskDescription = riddle.taskDescription;
        this.correctAnswer = riddle.correctAnswer;
    }
    asc() {
        console.log(`Riddle ${this.id}: ${this.name}`);
        console.log(this.taskDescription);
        const input = question("Enter the answer: ");
        if (input === this.correctAnswer.toString()) {
            console.log("\ncorrect!!!");
            return true;
        }
        else {
            console.log("\nError, please try again.");
        }
    }
}

export {
    Riddle
}