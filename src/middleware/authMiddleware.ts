import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export const authMiddleware = (
  resource: "user" | "equipment",
  action: string
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized token" });
      }

      const hasPermission = await auth.api.userHasPermission({
        body: {
          userId: session?.user.id,
          role: session?.user.role || ("user" as any),
          permission: { [resource]: [action] },
        },
      });
      if (!hasPermission || !hasPermission.success)
        res.status(401).send({
          message: `Forbidden: You do not have permission to ${action} ${resource}!`,
        });

      next();
    } catch (err: any) {
      res.status(403).json({ success: false, message: err.message });
    }
  };
};
