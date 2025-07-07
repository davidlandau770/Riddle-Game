import { question } from "readline-sync";
import { Riddle } from "../classes/Riddle.js";
import { Crud } from "../DAL/crud.js";

const c = new Crud();
const pathPlayer = "./DAL/dbPlayer.txt";

async function UsernameRegistration() {
    console.log("Welcome to the world's biggest math game!!!!");
    const inputName = question("What is your name? ");
    console.log(`hello ${inputName}!`);
    // const players = await c.read(pathPlayer);
    return inputName;
}

function sendAsc(riddle) {
    try {
        // שליחת שאלה לשמשתמש ובדיקה אם ענה נכון
        const r = new Riddle(riddle);
        const correct = r.asc();
        return correct;
    } catch (err) {
        console.log(`app: SendToRiddle: ${err.message}`);
    }
}

export {
    sendAsc,
    UsernameRegistration
}