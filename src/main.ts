/* eslint-disable no-console */

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { ErrorsApi } from "./errors/errors.api";
import { apiRouter } from "./routes/api.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter);

app.use((err: ErrorsApi, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message ?? "Something went wrong";
    res.status(status).json({ status, message });
});
process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});
const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connecting to DB...");
            await mongoose.connect(config.MONGO_URI as string);
            dbCon = true;
            console.log("Database available!!!");
        } catch {
            console.log("Database unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server listening on ${config.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
