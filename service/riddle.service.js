import { question } from "readline-sync";

const URL = "http://localhost:3000";

async function addRiddle(obj) {
    const response = await fetch(`${URL}/riddles/addRiddle`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(obj)
    })
    const body = await response.json();
    console.log(body);
}

async function createAsc() {
    const numberAsc = 0;
    const name = question("Enter name of asc: ");
    const level = question("Enter level of asc: ");
    const taskDescription = question("Enter asc: ");
    const correctAnswer = question("Enter correct answer: ");
    const objAsc = {
        numberAsc: numberAsc,
        name: name,
        level: level,
        taskDescription: taskDescription,
        correctAnswer: correctAnswer
    };
    await addRiddle(objAsc);
}

async function readRiddles() {
    const riddles = await fetch(`${URL}/riddles`).then((res) => res.json());
    return riddles
}

async function updateRiddle(obj) {
    const response = await fetch(`${URL}/riddles/updateRiddle`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(obj)
    })
    const body = await response.json();
    console.log(body);
}

async function createObjToUpdate() {
    const id = question("Enter asc id to update: ");
    const taskDescription = question("Enter new asc: ");
    const correctAnswer = question("Enter correct answer: ");
    const objToUpdate = {
        id: id,
        taskDescription: taskDescription,
        correctAnswer: correctAnswer
    };
    await updateRiddle(objToUpdate);
}

async function deleteRiddle() {
    const response = await fetch(`${URL}/riddles/deleteRiddle`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
        body: JSON.stringify({
            id: question("Enter id to remove: ")
        })
    })
    const body = await response.json();
    console.log(body);
}

export {
    createAsc,
    readRiddles,
    createObjToUpdate,
    deleteRiddle
}