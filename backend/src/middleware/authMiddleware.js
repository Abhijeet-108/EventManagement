import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({ message: "Invalid token" });
  }
};


const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access only" });
  next();
};

const isVendor = (req, res, next) => {
  if (req.user.role !== "vendor")
    return res.status(403).json({ message: "Vendor access only" });
  next();
};

const isUser = (req, res, next) => {
  if (req.user.role !== "user")
    return res.status(403).json({ message: "User access only" });
  next();
};

export { verifyToken, isAdmin, isVendor, isUser };
