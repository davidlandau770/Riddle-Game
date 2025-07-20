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
    ask() {
        let correctAnswer = false;
        while (!correctAnswer) {
            console.log(`Riddle ${this.id}: ${this.name}`);
            const input = question(`${this.taskDescription}\nEnter the answer: `);
            if (input === this.correctAnswer.toString()) {
                console.log("\ncorrect!!!");
                correctAnswer = true;
            }
            else {
                console.log("\nError, please try again.");
                continue;
            }
        }
    }
}

export {
    Riddle
}