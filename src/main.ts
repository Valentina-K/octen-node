import express from "express";
import * as mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter)

const dbConnect = async ():Promise<void> => {
    let dbCon = false;
    while (!dbCon) {
        try {
            console.log('Connecting to DB ...');
            await mongoose.connect(config.mongoURI as string);
            dbCon = true;
            console.log('Database Connected');
        } catch {
            console.log('Database unavailable. Wait for 3 seconds...');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}

const start = async () => {
    try {
        await dbConnect();
        app.listen(config.port,()=>{
            console.log(`Server started on port ${config.port}`);
        })
    }
    catch (e) {
        console.error(e);
    }
}
start();