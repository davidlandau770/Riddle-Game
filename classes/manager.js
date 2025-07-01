import { Riddle } from "./Riddle.js";

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
    sendAsc
}