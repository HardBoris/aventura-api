import "express-async-errors";
import registerRouters from "./routes";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./errors";

const app = express();
app.use(cors());
app.use(express.json());

registerRouters(app);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(err, res);
});

export default app;
