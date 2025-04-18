import { handleGoogleService, handleLoginService, handleSignupService } from "../services/auth.service.js";

async function handleLogin(req, res) {
    try {

        const { email, password } = req.body;
        const response = await handleLoginService(email, password);

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: response.message,
                data: response.data
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: response.data
        })

    } catch (error) {
        res.status(501).json({
            status: "error",
            message: "Internal Server Error",
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
                data: response.data
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: response.data
        })

    } catch (error) {
        res.status(501).json({
            status: "error",
            message: "Signup Failed",
            data: null
        });
    }
}

async function handleGoogle(req, res) {
    try {
        const { code } = req.body;
        const response = await handleGoogleService(code);

        if (!response.success) {
            res.status(400).json({
                status: "error",
                message: response.message,
                data: response.data
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: response.message,
            data: response.data
        })

    } catch (error) {
        res.status(501).json({
            status: "error",
            message: error,
            data: null
        });
    }
}
export {
    handleLogin,
    handleSignUp,
    handleGoogle
}