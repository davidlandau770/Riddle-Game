import allRiddles from "./riddles/AllRiddles.js";
import { question } from "readline-sync";
import { Player } from "./classes/Player.js";
import { Riddle } from "./classes/Riddle.js"

const { p, input } = genPerson();
timeGame();

function genPerson() {
    console.log("Welcome to the world's biggest math game!!!!");
    const input = question("What is your name? ");
    console.log("hello " + input);
    const p = new Player(input);
    return { p, input };
}

function timeGame() {
    try {
        let indexAsc = 0;
        while (true) {
            console.log("");
            const start = Date.now();
            const correct = sendAsc(indexAsc)

            const end = Date.now();
            p.recordTime(start, end)

            if (correct) {
                indexAsc++;
                if (indexAsc >= allRiddles.length) {
                    console.log(`\nGreat job, ${input}!`);
                    p.showStats();
                    return;
                }
                else {
                    console.log("You have successfully answered all the questions!\nYou are welcome to start from the beginning...");
                }
            }
        }
    } catch (err) {
        console.error(`app: ${err.message}`)
    }
}

function sendAsc(indexAsc) {
    try {
        const r = new Riddle(allRiddles, indexAsc);
        const correct = r.asc();
        return correct;
    } catch (err) {
        console.log(`app: SendToRiddle: ${err.message}`);
    }
}