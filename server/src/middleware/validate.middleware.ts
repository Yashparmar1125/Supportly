import type { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate = (schema: ZodSchema, source: "body" | "query" | "params") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req[source] = schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Construct clean field-level error dictionary: { [fieldName]: errorMessage }
        const fields: Record<string, string> = {};
        for (const issue of error.errors) {
          const key = issue.path.join(".") || "global";
          if (!fields[key]) {
            fields[key] = issue.message;
          }
        }

        const primaryMessage = error.errors[0]?.message || "Validation failed";

        res.status(400).json({
          error: primaryMessage,
          fields,
          details: error.errors,
        });
      } else {
        next(error);
      }
    }
  };
};
