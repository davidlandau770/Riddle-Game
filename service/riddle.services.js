import { question } from "readline-sync";
import { Crud } from "../DAL/crud.js";

const c = new Crud();
const pathRiddle = "./DAL/dbRiddles.txt";



async function appendRiddle(pathRiddle, obj) {
    const riddles = await c.read(pathRiddle);
    const exists = riddles.some(riddle => riddle.taskDescription === obj.taskDescription);
    // const objR = await c.getId(path);

    // obj.forEach(riddle => {
    //     console.log(riddle);
    // });
    if (!exists) {
        riddles.push(obj);
        await c.write(pathRiddle, riddles, "add");
    }
}

async function createAsc() {
    const oldId = await c.getId(pathRiddle) || 0;
    const newId = oldId + 1;
    const qnumberAsc = newId;
    const qname = question("Enter name of asc: ");
    const qlevel = question("Enter level of asc: ");
    const qtaskDescription = question("Enter asc: ");
    const qcorrectAnswer = question("Enter correct answer: ");
    const objAsc = {
        id: newId,
        numberAsc: qnumberAsc,
        name: qname,
        level: qlevel,
        taskDescription: qtaskDescription,
        correctAnswer: qcorrectAnswer
    };
    await appendRiddle(pathRiddle, objAsc);
}

async function readRiddles() {
    const riddles = await c.read(pathRiddle);
    console.log(riddles);
}

async function updateRiddle() {
    const riddles = await c.read(pathRiddle);
    const keys = ["qnumberAsc", "name", "level", "taskDescription", "correctAnswer"];

    const id = Number(question("Enter id: "));
    const key = question("Enter key: ");
    const newValue = question("Enter new value: ");
    let exists = false;

    if (!keys.includes(key)) {
        console.log("invalid key");
        return;
    }
    riddles.forEach(async riddle => {
        if (riddle.id === id) {
            riddle[key] = newValue;
            exists = true;
            await c.write(pathRiddle, riddles, "update")
        }
    });
    if (!exists) {
        return console.log("invalid id");
    }
}

async function deleteRiddle() {
    let riddles = await c.read(pathRiddle);
    const id = Number(question("Enter id: "));
    
    // מציאת אינדקס למחיקה
    let index;
    for (let i in riddles) {
        if (riddles[i].id === id) {
            index = i;
        }
    };
    if (index >= 0) {
        riddles.splice(index, 1)
        // איפוס הספירה מחדש
        for (let i in riddles) {
            riddles[i].id = Number(i) + 1;
        };
        await c.write(pathRiddle, riddles, "delete")
    }
    else {
        console.log("invalid key");
    }
}

export {
    createAsc,
    readRiddles,
    updateRiddle,
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