import { question } from "readline-sync";
import { createAsc, readRiddles, createObjToUpdate, deleteRiddle } from "./service/riddle.services.js";
import { startGame } from "./service/game.service.js";

async function menuToUser() {
    let stop = false;
    while (!stop) {
        const numberMenu = question("What do you want to do (choose by number)?\n1. Play the game\n2. Create a new riddle\n3. Read all riddles\n4. Update an existing riddle\n5. Delete a riddle\n6. View leaderboard\n0. exit\n");
        switch (numberMenu) {
            case "1":
                await startGame();
                break;
            case "2":
                await createAsc();
                break;
            case "3":
                console.log(await readRiddles());
                break;
            case "4":
                await createObjToUpdate();
                break;
            case "5":
                await deleteRiddle();
                break;
            case "0":
                stop = true;
                break;
            default:
                console.log("Please choose a valid number (1-6)");
        }
    }
}
await menuToUser();