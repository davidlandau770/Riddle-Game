import { question } from "readline-sync";

const URL = "http://localhost:3000";

async function readRiddles() {
    return await fetch(`${URL}/riddles`).then((res) => res.json())
}

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

async function createObjToAddRiddle() {
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

async function updateRiddle(id, obj) {
    const response = await fetch(`${URL}/riddles/updateRiddle/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(obj)
    })
    const body = await response.json();
    console.log(body);
}

async function createObjToUpdateRiddle() {
    const id = question("Enter asc id to update: ");
    const name = question("Enter name of asc: ");
    const level = question("Enter level of asc: ");
    const taskDescription = question("Enter new asc: ");
    const correctAnswer = question("Enter correct answer: ");
    const objToUpdate = {
        numberAsc: 0,
        name: name,
        level: level,
        taskDescription: taskDescription,
        correctAnswer: correctAnswer
    };
    await updateRiddle(id, objToUpdate);
}

async function deleteRiddle() {
    const id = question("Enter asc id to update: ");
    const response = await fetch(`${URL}/riddles/deleteRiddle/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
    })
    const body = await response.json();
    console.log(body);
}

export {
    createObjToAddRiddle,
    readRiddles,
    createObjToUpdateRiddle,
    deleteRiddle
}
