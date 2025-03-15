import jwt from "jsonwebtoken";

export default function handleJWTTokenMW(req, res, next) {
    let token = req.headers.authorization;
    token = token ? token.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            data: null
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized",
            data: null
        })
    }
}