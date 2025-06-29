import { question } from "readline-sync";

class Riddle {
    constructor(allRiddle, indexAsc) {
        this.id = allRiddle[indexAsc].id;
        this.name = allRiddle[indexAsc].name;
        this.taskDescription = allRiddle[indexAsc].taskDescription;
        this.correctAnswer = allRiddle[indexAsc].correctAnswer;
    }
    asc() {
        console.log(`Riddle ${this.id}: ${this.name}`);
        console.log(this.taskDescription);
        while (true) {
            const input = question("Enter the answer: ");
            if (input == this.correctAnswer) {
                console.log("correct!!!");
                return true;
            }
            else {
                console.log("\nError, please try again.");
            }
        }
    }
}

export {
    Riddle
}