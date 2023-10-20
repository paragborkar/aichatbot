import {connect, disconnect} from "mongoose";

async function connectToDatabase() {
 try {
    await connect(process.env.MONGODB_URL);
 } catch (error) {
    console.log(error);
    throw new Error("Connot Connect To MongoDB");
 }
}

async function disconnecctFromDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Connot Disconnect To MongoDB");
    }
}

export {connectToDatabase, disconnecctFromDatabase};