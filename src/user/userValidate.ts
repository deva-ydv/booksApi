import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import createHttpError from "http-errors";

const userValidate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      return next(
        createHttpError(
          400,
          error.errors?.map((e: any) => e.message).join(", ") ||
            "Validation failed"
        )
      );
    }
  };

export default userValidate;
