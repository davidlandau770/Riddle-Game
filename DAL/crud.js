import fs from "fs";

class Crud {
    read = (path) => {
        return new Promise((res, rej) => {
            fs.readFile(path, "utf-8", (err, data) => {
                if (err) rej(err.message);
                let riddles;
                try {
                    riddles = JSON.parse(data);
                } catch (err) {
                    riddles = [];
                } finally {
                    res(riddles);
                }
            })
        })
    }
    write = (path, message, action) => {
        return new Promise((res, rej) => {
            fs.writeFile(path, JSON.stringify(message, null, 2), (err) => {
                if (err) return rej(err);
                console.log(`The riddle ${action} successfully`);
                res()
            })
        })
    }
    getId = async (path) => {
        const riddles = await this.read(path);
        let maxId;
        riddles.forEach(riddel => {
            maxId = riddel.id;
        });
        return Math.max(maxId);
    }
}
export {
    Crud
}