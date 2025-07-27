import { question } from "readline-sync";
import { Player } from "../classes/Player.js";

const URL = "http://localhost:3000";

const usernameRegistration = async () => {
    console.log("Welcome to the world's biggest math game!!!!");
    const inputName = question("What is your name? ");
    console.log(`hello ${inputName}!`);
    return inputName;
}

// const addPlayer = async () => {
//     const name = await usernameRegistration();
//     const p = new Player(name);
//     const bestTime = await getBestTime(name, p);
//     const obj = {
//         name: name,
//         best_time: bestTime
//     }
//     const response = await fetch(`${URL}/players/addPlayer`, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         method: 'POST',
//         body: JSON.stringify(obj)
//     })
//     const body = await response.json();
//     console.log(body);
//     return p;
// }

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
    const obj = {
        best_time: bestTime
    }
    console.log(obj);
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

const getBestTime = async (name, p) => {
    const lowestTime = p.lowestTime();
    const response = await getPlayers();
    console.log(response, lowestTime);
    const findPlayer = response.find(player => player.username === name);
    const bestTimeResponse = findPlayer ? findPlayer.best_time : 0;
    const result = bestTimeResponse !== 0 ? Math.min(lowestTime, bestTimeResponse) : lowestTime;
    console.log(`\nYour record is: ${result}\nGood luck!`);
    return result;
}

const viewLeaderboard = async () => {
    const players = await getPlayers();
    const activity = players.filter(player => player.best_time > 0).map(player => ({ username: player.username, best_time: player.best_time}));
    const bestPlayers = activity.sort((a, b) => a.best_time - b.best_time).splice(0, 3);
    console.log(bestPlayers);
}

export {
    usernameRegistration,
    // addPlayer,
    getPlayers,
    updatePlayer,
    viewLeaderboard
}