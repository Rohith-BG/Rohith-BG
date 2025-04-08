import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const verify = (req, res, next) => {
    // 1. Get the Authorization header
    const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log("Auth Header:", authHeader);

    // 2. Check if the header exists and starts with 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Missing or malformed token' });
    }

    // 3. Extract and trim the token
    const token = authHeader.split(' ')[1]?.trim();
    // console.log("Extracted Token:", token);

    // 4. Check if the token is a valid JWT (3 parts)
    // if (!token || token.split('.').length !== 3) {
    //     return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    // }

    // 5. Decode without verification (for debugging)
    // const decodedWithoutVerify = jwt.decode(token);
    // console.log("Decoded (no verify):", decodedWithoutVerify);

    // if (!decodedWithoutVerify) {
    //     return res.status(401).json({ message: 'Unauthorized: Corrupted token' });
    // }

    // 6. Verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // console.error("JWT Verify Error:", err.message);
        return res.status(403).json({ 
            message: 'Forbidden: Invalid token',
            error: err.message 
        });
    }
};
export default verify;