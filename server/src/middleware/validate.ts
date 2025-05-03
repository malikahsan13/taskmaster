import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { NextFunction, Request, Response } from "express"

export const validateRequest = (DtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const output = plainToInstance(DtoClass, req.body)
        const errors = await validate(output)

        if(errors.length > 0){
            return res.status(400).json(
                {
                    message: "Validation failed",
                    errors: errors.map((error) => ({
                        field: error.property,
                        constraints: error.constraints
                    }))
                }
            )
        }
        next()
    }
}

export function validateDto(type: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const dto = plainToInstance(type, req.body);
      const errors = await validate(dto);
  
      if (errors.length > 0) {
        return res.status(400).json({
          message: "Validation failed",
          errors: errors.map(err => ({
            property: err.property,
            constraints: err.constraints,
          })),
        });
      }
  
      req.body = dto;
      next();
    };
  }