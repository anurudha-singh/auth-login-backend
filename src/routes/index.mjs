import express from "express"; // import the express module
import {Auth, Login, Logout} from '../controllers/auth.mjs';
import { Verify } from "../middleware/verify_mware.mjs";
const app = express(); // Create an app object

app.disable("x-powered-by"); // Reduce fingerprinting (optional)
// home route with the get method and a handler
app.use('/v1/auth', Auth);
app.use('/v1/l',Login)
app.get("/v1", (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            data: [],
            message: "Welcome to our API homepage!",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
});
app.get("/v1/user", Verify, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to the your Dashboard!",
    });
});
app.get('/logout',Logout)
export {app};