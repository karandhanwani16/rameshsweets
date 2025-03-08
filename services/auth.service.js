import jwt from "jsonwebtoken";

async function handleLoginService(email, password) {
    try {
        // db connection 

        const token = jwt.sign({
            email
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return {
            success: true,
            token: token
        }
    } catch (error) {
        //handle error
        return {
            success: false,
            token: null
        }
    }
}

async function handleSignupService(email, password, firstName, lastName, type) {
    try {
        // db connection 

        return {
            success: true,
            message: "User created successfully"
        }

    } catch (error) {
        //handle error
        return {
            success: false,
            message: "User creation failed"
        }
    }
}


export {
    handleLoginService,
    handleSignupService
}