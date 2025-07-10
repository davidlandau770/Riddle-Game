import { question } from "readline-sync";
import { Player } from "../classes/Player.js";

const URL = "http://localhost:3000";
const p = new Player();

const usernameRegistration = async () => {
    console.log("Welcome to the world's biggest math game!!!!");
    const inputName = question("What is your name? ");
    console.log(`hello ${inputName}!`);
    return inputName;
}

const addPlayer = async () => {
    const obj = {
        name: usernameRegistration(),
        lowestTime: p.getLowestTime()
    }
    console.log("obj: ");
    console.log(obj);
    const response = await fetch(`${URL}/players/addPlayer`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj)
    })
    const body = await response.json();
    console.log(body);
}

const getPlayer = async () => {
    return await fetch(`${URL}/players`).then((res) => res.json());
}

const viewLeaderboard = async () => {
    return await p.getLowestTime()
}

export {
    usernameRegistration,
    addPlayer,
    getPlayer,
    viewLeaderboard
}