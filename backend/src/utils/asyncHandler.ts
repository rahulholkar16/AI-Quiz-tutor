import type { Request, Response, NextFunction } from "express";

const asyncHandler = (
    requestHandler: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<any>
): ((req: Request, res: Response, next: NextFunction) => void) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch(next);
    };
};

export { asyncHandler };
