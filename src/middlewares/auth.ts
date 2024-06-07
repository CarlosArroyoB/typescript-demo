import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  if (token === "autenticado") next();
  else res.status(500).json({ message: "Error. Falta autenticación" });
};

export default auth;
 