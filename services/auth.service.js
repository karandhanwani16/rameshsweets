import jwt from "jsonwebtoken";
import connectDB from "../db/connection.js";
import User from "../models/auth.js";
import { OAuth2Client } from 'google-auth-library';

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

async function handleGoogleService(code) {
    try {

        let oauth2Client = new OAuth2Client(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        );

        // 
        const { tokens } = await oauth2Client.getToken(code);

        if (!tokens || !tokens.id_token) {
            return {
                success: false,
                message: 'Token exchange failed. Tokens are missing.',
                data: null
            }
        }

        oauth2Client.setCredentials(tokens);

        // Step 2: Verify the ID token
        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        // sub: '107320028143993775377',
        // email: 'karandhanwaniaws@gmail.com',
        // email_verified: true,
        // at_hash: 'O_2pRDOQuoMs3-iX6056vg',
        // name: 'karan dhanwani',
        // picture: 'https://lh3.googleusercontent.com/a/ACg8ocJ-LYt9z12R2bYagGf-5w9aiJB_fyIIax_0xD2waRROi3LS=s96-c',
        // given_name: 'karan',
        // family_name: 'dhanwani',
        let user = {};
        const isUserExists = await User.findOne({ email: payload.email });

        if (!isUserExists) {
            let maximumUserId = await User.find().sort({ id: -1 }).limit(1);
            maximumUserId = maximumUserId.length > 0 ? parseInt(maximumUserId[0].id) : 0;

            user = await User.create({
                id: maximumUserId + 1,
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                password: '',
                type: "user",
                googleId: payload.sub
            })

        }

        user = isUserExists;


        if (!user.googleId) {
            return {
                success: false,
                message: "Login using email and password",
                data: null
            }
        }

        return {
            success: true,
            message: "Google OAuth Successfull",
            data: {
                token: jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET, { expiresIn: '1h' })
            }
        }


    } catch (error) {
        return {
            success: false,
            message: error,
            data: null
        }
    }
}

export {
    handleLoginService,
    handleSignupService,
    handleGoogleService
}