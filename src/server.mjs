import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { MONGODB_URI, PORT, SECRET_ACCESS_TOKEN } from './config/index.mjs';
import {app} from './routes/index.mjs';
// import configPkg from './config/index.mjs';
// const { MONGODB_URI, PORT, SECRET_ACCESS_TOKEN } =configPkg;
// import appPkg from './routes/index.js';
// const {app}=appPkg; 

// === 1 - CREATE SERVER ===
const server = express();

// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
// console.log('MongoDB URI:', MONGODB_URI);
// console.log('Port:', PORT);
// console.log('Secret Access Token:', SECRET_ACCESS_TOKEN);
// === 2 - CONNECT DATABASE ===
// Set up mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("Connected to database"))
    .catch((err) => console.log(err));

// === 4 - CONFIGURE ROUTES ===
// Connect Main route to server
server.use(app);

// === 5 - START UP SERVER ===
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);