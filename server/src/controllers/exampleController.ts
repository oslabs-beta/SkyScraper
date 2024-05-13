import { Request, Response, NextFunction } from 'express';
import ErrorObject from '../utils/ErrorObject';

interface ExampleController {
  exampleMiddleware: (req: Request, res: Response, next: NextFunction) => void;
  anotherMiddleware: (req: Request, res: Response, next: NextFunction) => void;
}

const exampleController: ExampleController = {
  exampleMiddleware: async (req, res, next) => {
    try {
      return next();
    } catch (err) {
      return next(
        new ErrorObject('this string is the error log', 500, 'this string is the response message'),
      );
    }
  },
  anotherMiddleware: async (req, res, next) => {
    try {
      console.log('hi there');
      return next();
    } catch (err) {
      return next(
        new ErrorObject('this string is the error log', 500, 'this string is the response message'),
      );
    }
  },
};

export default exampleController;
