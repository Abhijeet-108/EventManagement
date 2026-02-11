import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], "SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin")
        return res.status(403).json({ message: "Admin access only" });
    next();
}

const isVendor = (req, res, next) => {
    if (req.user.role !== "vendor")
        return res.status(403).json({ message: "Vendor access only" });
    next();
}

const isUser = (req, res, next) => {
    if (req.user.role !== "user")
        return res.status(403).json({ message: "User access only" });
    next();
}

export { verifyToken, isAdmin, isVendor, isUser };