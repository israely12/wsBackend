import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    organization: string | undefined;
  };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const getToken = req.header("Authorization")?.replace("Bearer ", "");
  if (!getToken) {
    res.status(401).json({ message: "no token, authorization denied" });
    return;
  }
  try {
    const decoded = jwt.verify(getToken, process.env.JWT_SECRET as string) as {
      id: string;
      organization: string | undefined;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "your token is not valid" });
  }
};

