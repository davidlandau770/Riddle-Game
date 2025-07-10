import { Player } from "../classes/Player.js";
import { Riddle } from "../classes/Riddle.js";
import { UsernameRegistration } from "./player.services.js";
import { readRiddles } from "./riddle.services.js";

async function startGame() {
    const riddles = await readRiddles();
    const inputName = await UsernameRegistration();
    let p = new Player(inputName);

    try {
        let indexAsc = 0;
        let stop = false;
        while (!stop) {
            console.log("");

            const logStartTime = Date.now();

            // הוצאת שאלה לשליחה למשתמש
            const currentRiddle = riddles[indexAsc];
            let correctAnswer;
            try {
                const r = new Riddle(currentRiddle);
                correctAnswer = r.asc();
            } catch (err) {
                console.log(`game.service: SendRiddle: ${err.message}`);
            }

            const logEndTime = Date.now();
            p.recordTime(logStartTime, logEndTime);

            // בדיקת השאלה הבאה
            if (correctAnswer) {
                indexAsc++;

                // בדיקת סיום השאלות
                if (indexAsc >= riddles.length) {
                    console.log(`\nGreat job, ${inputName}!`);
                    p.showStats();
                    stop = true;
                }
            }
        }
    } catch (err) {
        console.error(`app: ${err.message}`);
    }
}

export {
    startGame
}