// // console.log("josito")



// import app from "./app.js";
// import { db } from "./Config/db.js";
// // database:


// // localhost:

// // app.listen(3000, () => {
// //     console.log("localhost running at port 3000");
// // });
// db();

// app.listen(process.env.PORT, () => {
//     console.log(`localhost running at port ${process.env.PORT}`);
// });

import app from "./app.js";
import dotenv from "dotenv";
import { db } from "./Config/db.js";

dotenv.config();

// Connect Database
db();

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`localhost running at port ${process.env.PORT}`);
});