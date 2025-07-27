import { Player } from "../classes/Player.js";
import { Riddle } from "../classes/Riddle.js";
import { updatePlayer } from "./player.service.js";
import { readRiddles } from "./riddle.service.js";

async function startGame(username) {
    const riddles = await readRiddles();
    // const inputName = await addPlayer();
    let p = new Player();
    try {
        let indexAsk = 0;
        let stop = false;
        while (!stop) {
            console.log("");
            const logStartTime = Date.now();

            // הוצאת שאלה לשליחה למשתמש
            const currentRiddle = riddles[indexAsk];
            try {
                const r = new Riddle(currentRiddle);
                r.ask();
            } catch (err) {
                console.log(`game.service: SendRiddle: ${err.message}`);
            }

            const logEndTime = Date.now();
            p.recordTime(logStartTime, logEndTime);

            // השאלה הבאה
            indexAsk++;

            // סיום השאלות
            if (indexAsk >= riddles.length) {
                try {
                    await updatePlayer(username, p);
                } catch (err) {
                    console.error(`updatePlayer: ${err.message}`);
                }
                console.log(`\nGreat job, ${username}!`);
                p.showStats();
                stop = true;
            }
        }
    } catch (err) {
        console.error(`app: ${err.message}`);
    }
}

export {
    startGame
}