import allRiddles from "./riddles/AllRiddles.js";
import { question } from "readline-sync";
import { Player } from "./classes/Player.js";
import { sendAsc } from "./classes/manager.js";

// שם משתמש
console.log("Welcome to the world's biggest math game!!!!");
const inputName = question("What is your name? ");
console.log(`hello ${inputName}!`);

// לולאה ראשית לבחירת רמה
let riddles;
let p;
while (true) {
    const inputLevel = question("choose level difficulty by number (easy / medium / hard): ");
    riddles = allRiddles.filter(r => r.level === inputLevel);
    p = new Player(inputName);
    timeGame();
    const wantToContinue = question("\nDo you want to advance to the next level or exit? (continue, exit) ")
    if (wantToContinue === "exit") {
        break;
    }
}

function timeGame() {
    try {
        let indexAsc = 0;
        while (true) {
            // רישום שעת התחלה
            console.log("");
            const start = Date.now();

            // הוצאת שאלה לשליחה למשתמש
            const riddle = riddles[indexAsc]
            const correct = sendAsc(riddle)

            // רישום שעת סיום
            const end = Date.now();
            p.recordTime(start, end)

            // בדיקת השאלה הבאה
            if (correct) {
                indexAsc++;
                if (indexAsc >= riddles.length) {
                    console.log(`\nGreat job, ${inputName}!`);
                    p.showStats();
                    return;
                }
            }
        }
    } catch (err) {
        console.error(`app: ${err.message}`)
    }
}