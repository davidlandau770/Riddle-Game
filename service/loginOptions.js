import { question } from "readline-sync";
// import { Player } from "../classes/Player.js";
// import { usernameRegistration } from "./player.service.js";

const URL = "http://localhost:3000"
let TOKEN;

const signup = async () => {
    const inputName = question("What is your name? ");
    console.log(`hello ${inputName}!`);
    const player = {
        username: inputName,
        password: question("What is your password? ")
    }
    let response;
    try {
        response = await fetch('http://localhost:3000/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(player)
        });
    } catch (error) {
        console.error("Fetch error:", error);
        return;
    }
    let data;
    try {
        data = await response.json();
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
    }
    const token = response.headers.get('authorization');
    if (token) {
        TOKEN = token;
        return true, username;
    }
    console.log(data);
}

const login = async () => {
    let username = question("What is your name? ");
    const password = question("What is your password? ", { hideEchoBack: true });
    const player = {
        username,
        password
    }
    const response = await fetch(`${URL}/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(player)
    })
    const result = await response.json()
    console.log(result);
    console.log();
    const token = response.headers.get('authorization');
    if (token) {
        TOKEN = token
        return username;
    }
}

const guest = async () => {

}

export {
    signup,
    login,
    guest
}