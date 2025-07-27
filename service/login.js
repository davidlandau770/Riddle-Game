import { question, questionNewPassword } from "readline-sync";
// import { Player } from "../classes/Player.js";
// import { usernameRegistration } from "./player.service.js";

const URL = "http://localhost:3000"
let TOKEN;

// const usernameRegistration = async () => {
//     const inputName = question("What is your name? ");
//     console.log(`hello ${inputName}!`);
//     return inputName;
// }

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
    }
    console.log(data);
}
await signup();

const login = async () => {
    const player = {
        username: question("What is your name?"),
        password: questionNewPassword("What is your password?"),
    }

    const response = await fetch(`${URL}/login`, {
        headers: {
            'Conrent-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(player)
    })
    const token = response.headers.get('authorization');
    if (token) {
        TOKEN = token
    }
}

const guest = async () => {

}

export {
    signup,
    login,
    guest
}