import jwt from "jsonwebtoken";
import connectDB from "../db/connection.js";
import User from "../models/auth.js";

connectDB();

async function handleLoginService(email, password) {
    try {
        // db connection 

        const isUserExists = await User.findOne({
            email,
            password
        })

        if (!isUserExists) {
            return {
                success: false,
                message: "Login Failed! Please check your email and password",
                data: null
            }
        }



        const token = jwt.sign({
            email
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return {
            success: true,
            message: "Login Successfull",
            data: {
                token
            }
        }
    } catch (error) {
        //handle error
        return {
            success: false,
            message: "Login Failed! Please check your email and password",
            data: null
        }
    }
}

async function handleSignupService(email, password, firstName, lastName, type) {
    try {

        // const isUserAlreadyExists = await User.findOne({ email });

        // if (isUserAlreadyExists) {
        //     return {
        //         success: false,
        //         message: "User already exists",
        //         data: null
        //     }
        // }

        const maximumUserId = await User.find().sort({ id: -1 }).limit(1);


        const user = await User.create({
            id: maximumUserId + 1,
            firstName,
            lastName,
            email,
            password,
            type
        })

        if (!user) {
            return {
                success: false,
                message: "User creation failed",
                data: null
            }
        }

        return {
            success: true,
            message: "User created successfully",
            data: user
        }

    } catch (error) {
        //handle error

        return {
            success: false,
            message: "User creation failed",
            data: null
        }
    }
}


export {
    handleLoginService,
    handleSignupService
}