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

const getBestTime = async (name, p) => {
    const lowestTime = p.lowestTime();
    const response = await getPlayers();
    const findPlayer = response.find(player => player.username === name);
    const bestTimeResponse = findPlayer ? findPlayer.best_time : 0;
    const result = Math.min(...[bestTimeResponse, lowestTime].filter(x => typeof x === 'number'));
    console.log("result: ***");
    console.log(result, lowestTime);
    if (result > 0) {
        console.log(`Your record is: ${result}\nGood luck!`);
        return result;
    }
    else {
        // console.log("This is your first time!\nGood luck!")
        return null
    };
}

const addPlayer = async () => {
    const name = await usernameRegistration();
    const p = new Player(name);
    const bestTime = await getBestTime(name, p);
    const obj = {
        name: name,
        best_time: bestTime
    }
    const response = await fetch(`${URL}/players/addPlayer`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj)
    })
    const body = await response.json();
    console.log(body);
    return p;
}

const getPlayers = async () => {
    return await fetch(`${URL}/players`).then((res) => res.json());
}

const updatePlayer = async (name, p) => {
    let bestTime;
    try {
        bestTime = await getBestTime(name, p);
    } catch (err) {
        console.error(`bestTime: ${err.message}`)
    }
    console.log("bestTime: ");
    console.log(bestTime, name);
    const obj = {
        best_time: bestTime
    }
    const response = await fetch(`${URL}/players/updatePlayer/${name}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(obj)
    })
    const body = await response.json();
    console.log(body);
}

const viewLeaderboard = async () => {
    const players = await getPlayers();
    const bestPlayers = players.sort((a, b) => a.best_time - b.best_time).splice(0, 3)
    console.log(bestPlayers);
}

export {
    usernameRegistration,
    addPlayer,
    getPlayers,
    updatePlayer,
    viewLeaderboard
}