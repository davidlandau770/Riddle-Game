import { Player } from "../classes/Player.js";
import { sendAsc, UsernameRegistration } from "./player.services.js";
import allRiddles from "../DAL/allRiddles.js";

function startGame() {
    let riddles = allRiddles;
    const inputName = UsernameRegistration();
    let p = new Player(inputName);

    try {
        let indexAsc = 0;
        let stop = false;
        while (!stop) {
            console.log("");

            const logStartTime = Date.now();

            // הוצאת שאלה לשליחה למשתמש
            const riddle = riddles[indexAsc];
            const correct = sendAsc(riddle);

            const logEndTime = Date.now();
            p.recordTime(logStartTime, logEndTime);

            // בדיקת השאלה הבאה
            if (correct) {
                indexAsc++;
                if (indexAsc >= riddles.length) {
                    // console.log(inputName);
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