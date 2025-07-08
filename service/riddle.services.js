import { question } from "readline-sync";
import { Crud } from "../DAL/crud.js";

const c = new Crud();
const pathRiddle = "./DAL/dbRiddles.txt";
const URL = "http://localhost:3000"


async function appendRiddle(obj) {
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
    const response = await fetch(`${URL}/riddles/getId`);
    const newId = await response.json();
    const numberAsc = newId;
    const name = question("Enter name of asc: ");
    const level = question("Enter level of asc: ");
    const taskDescription = question("Enter asc: ");
    const correctAnswer = question("Enter correct answer: ");
    const objAsc = {
        id: newId,
        numberAsc: numberAsc,
        name: name,
        level: level,
        taskDescription: taskDescription,
        correctAnswer: correctAnswer
    };
    await appendRiddle(objAsc);
}

async function readRiddles() {
    await fetch(`${URL}/riddles`).then((res) => res.json()).then((data) => console.log(data)).catch((err) => console.log(err));
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

    // const riddles = await c.read(pathRiddle);
    // const keys = ["qnumberAsc", "name", "level", "taskDescription", "correctAnswer"];

    // const id = Number(question("Enter id: "));
    // const key = question("Enter key: ");
    // const newValue = question("Enter new value: ");
    // let exists = false;

    // if (!keys.includes(key)) {
    //     console.log("invalid key");
    //     return;
    // }
    // riddles.forEach(async riddle => {
    //     if (riddle.id === id) {
    //         riddle[key] = newValue;
    //         exists = true;
    //         await c.write(riddles, "update")
    //     }
    // });
    // if (!exists) {
    //     return console.log("invalid id");
    // }
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

    // let riddles = await c.read(pathRiddle);
    // const id = Number(question("Enter id: "));

    // // מציאת אינדקס למחיקה
    // let index;
    // for (let i in riddles) {
    //     if (riddles[i].id === id) {
    //         index = i;
    //     }
    // };
    // if (index >= 0) {
    //     riddles.splice(index, 1)
    //     // איפוס הספירה מחדש
    //     for (let i in riddles) {
    //         riddles[i].id = Number(i) + 1;
    //     };
    //     await c.write(pathRiddle, riddles, "delete")
    // }
    // else {
    //     console.log("invalid key");
    // }
}

export {
    createAsc,
    readRiddles,
    createObjToUpdate,
    deleteRiddle
}
// let id = 0;
// function getNewID() {
//     id++;
//     return id;
// }

// const r1 = {
//     numberAsc: 1,
//     name: "Math",
//     level: "easy",
//     taskDescription: "What is 5 + 3?",
//     correctAnswer: "8"
// }
// const r2 = {
//     numberAsc: 1,
//     name: "Math",
//     level: "medium",
//     taskDescription: "What is 6 * 7?",
//     correctAnswer: "42"
// }
// const riddles = [ r1, r2 ];
// async function run() {
//     for (const r of riddles) {
//         await appendRiddle(pathRiddle, r);
//     }
// }
// run();





// function getName(message = "Enter your name: ") {
//     const input = question(message);
//     return input
// }

// function readFile(path) {
//     fs.readFile(path, "utf-8", (err, data) => {
//         if (err) return console.log(err.message);
//         console.log(JSON.parse(data));
//     })
// }

// function updateUser(oldName, newName, path) {
//     let exists = false;
//     fs.readFile(path, "utf-8", (err, data) => {
//         if (err) return console.log(err.message);
//         const users = JSON.parse(data);
//         for (let i in users) {
//             if (users[i] === oldName) {
//                 users[i] = newName;
//                 console.log("The name update successfully");
//                 fs.writeFile(path, JSON.stringify(users), (err) => {
//                     if (err) return console.log(err);
//                 })
//                 exists = true;
//             }
//         };
//         if (!exists) {
//             console.log("The name not exists.");
//         }
//     })
// }

// function deleteUser(userName) {
//     let exists = false;
//     fs.readFile(path, "utf-8", (err, data) => {
//         if (err) return console.log(err);
//         const users = JSON.parse(data);
//         for (let i in users) {
//             if (users[i] === userName) {
//                 users.splice(i,1);
//                 fs.writeFile(path, JSON.stringify(users), (err) => {
//                     if (err) return console.log(err);
//                     console.log("The name deleted successfully");
//                 })
//                 exists = true;
//             }
//         }
//         if (!exists) {
//             console.log("The name not exists.");
//         }
//     })
// }


// [
//   {
//     "id": 1,
//     "numberAsc": 1,
//     "name": "Math",
//     "level": "easy",
//     "taskDescription": "What is 5 + 3?",
//     "correctAnswer": "8"
//   },
//   {
//     "numberAsc": 1,
//     "name": "Math",
//     "level": "medium",
//     "taskDescription": "What is 6 * 7?",
//     "correctAnswer": "42"
//   }
// ]