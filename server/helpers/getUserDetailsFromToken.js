const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const getUserDetailsFromToken = async (token) => {
    if (!token) {
        return {
            message: "Session timed out",
            logout: true
        };
    }

    try {
        const decoded = jwt.verify(token, 'shdfkajsdflj');
        
        if (!decoded || !decoded.id) {
            return { message: "Invalid token", logout: true };
        }

        const user = await UserModel.findById(decoded.id).select("-password")
        
        if (!user) {
            return { message: "User not found", logout: true };
        }

        return user;
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return { message: "Invalid token", logout: true };
        }
        if (error.name === 'TokenExpiredError') {
            return { message: "Token expired", logout: true };
        }
        return { message: error.message || "Error while fetching user", logout: true };
    }
};

module.exports = getUserDetailsFromToken;