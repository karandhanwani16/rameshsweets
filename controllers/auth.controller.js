import { handleLoginService, handleSignupService } from "../services/auth.service.js";

async function handleLogin(req, res) {
    try {

        const { email, password } = req.body;
        const response = await handleLoginService(email, password);

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: "Login Failed",
                data: null
            });
        }

        res.status(200).json({
            status: "success",
            message: "Login Successfull",
            data: response.token
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Login Failed",
            data: null
        });
    }
}

async function handleSignUp(req, res) {

    try {
        const { email, password, firstName, lastName, type } = req.body;
        const response = await handleSignupService(email, password, firstName, lastName, type);

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: response.message,
                data: null
            });
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: null
        })

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Signup Failed",
            data: null
        });
    }
}
export {
    handleLogin,
    handleSignUp
}