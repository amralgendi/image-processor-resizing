import { Request, Response, NextFunction } from "express";

const checkParams = (req: Request, res: Response, next: NextFunction) => {
  const { filename, width, height } = req.query;
  if (!filename)
    return res
      .status(400)
      .json({ error: "no filename", message: "Please add a filename!" });

  if (!height || !width)
    return res.status(400).json({
      error: "invalid parameters",
      message: "height and width must be included together!",
    });

  next();
};

export { checkParams };
