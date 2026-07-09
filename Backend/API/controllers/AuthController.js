// import User from "../models/auth.schema.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // ======================
// // SIGN UP
// // ======================
// export const signup = async(req, res) => {
//     try {
//         const { fullname, phoneNumber, email, password } = req.body;

//         if (!fullname || !phoneNumber || !email || !password) {
//             return res.status(400).json({
//                 message: "Please fill in all fields.",
//             });
//         }

//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({
//                 message: "User already exists.",
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = await User.create({
//             fullname,
//             phoneNumber,
//             email,
//             password: hashedPassword,
//             role: "student", // Default role
//         });

//         res.status(201).json({
//             message: "User registered successfully.",
//             user: {
//                 id: user._id,
//                 fullname: user.fullname,
//                 phoneNumber: user.phoneNumber,
//                 email: user.email,
//                 role: user.role,
//             },
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };

// // ======================
// // SIGN IN
// // ======================
// export const signin = async(req, res) => {
//     try {

//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Please enter email and password.",
//             });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found.",
//             });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({
//                 message: "Incorrect password.",
//             });
//         }

//         const token = jwt.sign({
//                 id: user._id,
//                 role: user.role,
//             },
//             process.env.JWT_SECRET, {
//                 expiresIn: "7d",
//             }
//         );

//         res.status(200).json({
//             message: "Login successful.",
//             token,
//             user: {
//                 id: user._id,
//                 fullname: user.fullname,
//                 phoneNumber: user.phoneNumber,
//                 email: user.email,
//                 role: user.role,
//                 profileImage: user.profileImage,
//             },
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };


// THIS FOR ADMIN ROLE

// import User from "../models/auth.schema.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // ======================
// // SIGN UP
// // ======================
// export const signup = async(req, res) => {
//     try {
//         const { fullname, phoneNumber, email, password } = req.body;

//         if (!fullname || !phoneNumber || !email || !password) {
//             return res.status(400).json({
//                 message: "Please fill in all fields.",
//             });
//         }

//         const existingUser = await User.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({
//                 message: "User already exists.",
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         // TEMPORARY: Create every new user as ADMIN
//         const user = await User.create({
//             fullname,
//             phoneNumber,
//             email,
//             password: hashedPassword,
//             role: "admin",
//         });

//         res.status(201).json({
//             message: "Administrator registered successfully.",
//             user: {
//                 id: user._id,
//                 fullname: user.fullname,
//                 phoneNumber: user.phoneNumber,
//                 email: user.email,
//                 role: user.role,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };

// // ======================
// // SIGN IN
// // ======================
// export const signin = async(req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 message: "Please enter email and password.",
//             });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found.",
//             });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({
//                 message: "Incorrect password.",
//             });
//         }

//         const token = jwt.sign({
//                 id: user._id,
//                 role: user.role,
//             },
//             process.env.JWT_SECRET, {
//                 expiresIn: "7d",
//             }
//         );

//         res.status(200).json({
//             message: "Login successful.",
//             token,
//             user: {
//                 id: user._id,
//                 fullname: user.fullname,
//                 phoneNumber: user.phoneNumber,
//                 email: user.email,
//                 role: user.role,
//                 profileImage: user.profileImage,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message,
//         });
//     }
// };



// AQUI TEM ESCOLHA PARA FAZER LOGIN /REGISTRAR 


import User from "../models/auth.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ======================
// SIGN UP
// ======================

export const signup = async(req, res, next) => {
    try {
        const {
            fullname,
            phoneNumber,
            email,
            password,
            role,
        } = req.body;

        if (!fullname ||
            !phoneNumber ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                message: "Please fill in all fields.",
            });
        }

        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            fullname,
            phoneNumber,
            email,
            password: hashedPassword,

            role: role === "admin" ?
                "admin" : "student",
        });

        res.status(201).json({
            message: "Account created successfully.",
            user: {
                id: user._id,
                fullname: user.fullname,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// ======================
// SIGN IN
// ======================

export const signin = async(req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter email and password.",
            });
        }

        const user = await User.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password.",
            });
        }

        const token = jwt.sign({
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET, {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                fullname: user.fullname,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};