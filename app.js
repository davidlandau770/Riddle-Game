import { question } from "readline-sync";
import allRiddles from "./DAL/allRiddles.js";
import { Player } from "./classes/Player.js";
import { sendAsc, UsernameRegistration } from "./service/player.services.js";
import { createAsc, readRiddles, updateRiddle, deleteRiddle } from "./service/riddle.services.js";


// רישום שם משתמש
const inputName = UsernameRegistration()

// לולאת תפריט
let riddles = allRiddles;
let p = new Player(inputName);
async function menuToUser() {
    while (true) {
        const numberMenu = question("What do you want to do (choose by number)?\n1. Play the game\n2. Create a new riddle\n3. Read all riddles\n4. Update an existing riddle\n5. Delete a riddle\n6. View leaderboard\n");
        switch (numberMenu) {
            case "1":
                // riddles = allRiddles;
                // p = new Player(inputName);
                startGame();
                break;
            case "2":
                await createAsc();
                break;
            case "3":
                await readRiddles();
                break;
            case "4":
                await updateRiddle();
                break;
            case "5":
                await deleteRiddle();
                break;
            default:
                console.log("Please choose a valid number (1-6)");
        }
        // const wantToContinue = question("\nDo you want to advance to the next level or exit? (continue, exit) ")
        // if (wantToContinue === "exit") {
        //     break;
        // }
    }
}
await menuToUser();

function startGame() {
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
                    console.log(inputName);
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