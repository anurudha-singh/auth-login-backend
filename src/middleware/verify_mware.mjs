import User from "../models/user_models.mjs";
import jwt from "jsonwebtoken";
import { MONGODB_URI, PORT, SECRET_ACCESS_TOKEN } from '../config/index_config.mjs';
import Blacklist from "../models/blacklist_models.mjs";

// export async function Verify(req, res, next) {
//     try {
//         const authHeader = req.headers["cookie"]; // get the session cookie from request header
// // console.log(`authHeader cookie ${authHeader}`);
//         if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
//         const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt

//         // Verify using jwt to see if token has been tampered with or if it has expired.
//         // that's like checking the integrity of the cookie
//         jwt.verify(cookie, SECRET_ACCESS_TOKEN, async (err, decoded) => {
//             if (err) {
//                 // if token has been altered or has expired, return an unauthorized error
//                 return res
//                     .status(401)
//                     .json({ message: "This session has expired. Please login" });
//             }

//             const { id } = decoded; // get user id from the decoded token
//             const user = await User.findById(id); // find user by that `id`
//             const { password, ...data } = user._doc; // return user object without the password
//             req.user = data; // put the data object into req.user
//             next();
//         });
//     } catch (err) {
//         console.log(`error was ${err}`);
//         res.status(500).json({
//             status: "error",
//             code: 500,
//             data: [],
//             message: "Internal Server Error",
//         });
//     }
// }
export async function Verify(req, res, next) {
    const authHeader = req.headers["cookie"]; // get the session cookie from request header

    if (!authHeader) return res.sendStatus(401); // if there is no cookie from request header, send an unauthorized response.
    const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt token
    const accessToken = cookie.split(";")[0];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken }); // Check if that token is blacklisted
    // if true, send an unathorized message, asking for a re-authentication.
    if (checkIfBlacklisted)
        return res
            .status(401)
            .json({ message: "This session has expired. Please login" });
    // if token has not been blacklisted, verify with jwt to see if it has been tampered with or not.
    // that's like checking the integrity of the accessToken
    jwt.verify(accessToken, SECRET_ACCESS_TOKEN, async (err, decoded) => {
        if (err) {
            // if token has been altered, return a forbidden error
            return res
                .status(401)
                .json({ message: "This session has expired. Please login" });
        }

        const { id } = decoded; // get user id from the decoded token
        const user = await User.findById(id); // find user by that `id`
        const { password, ...data } = user._doc; // return user object but the password
        req.user = data; // put the data object into req.user
        next();
    });
}