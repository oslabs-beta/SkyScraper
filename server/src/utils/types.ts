import { Request, Response, NextFunction } from 'express';

export interface ec2Controller {
  getEC2Instances: (req: Request, res: Response, next: NextFunction) => void;
}

interface Jwk {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}

export interface Jwks {
  keys: Jwk[];
}

export interface authController {
  verifyJWT: (req: Request, res: Response, next: NextFunction) => void;
  getIdentityID: (req: Request, res: Response, next: NextFunction) => void;
  getTemporaryCredentials: (req: Request, res: Response, next: NextFunction) => void;
}

export interface authHeaders extends Request {
  headers: {
    authorization: string;
  };
}

export interface cloudController {
  getEC2Metrics: (req: Request, res: Response, next: NextFunction) => void;
}

export interface SanitizedInstances {
  InstanceId: string;
  InstanceType: string;
  Name: string;
  State: string;
}

export type Results = Record<
  string,
  {
    name: string;
    metric: string;
    unit: string;
    datapoints: { Timestamp: Date; Value: number }[];
  }[]
>;

export interface Datapoints {
  Timestamp: Date;
  Value: number;
}

export interface MyLocals {
  instances: SanitizedInstances[];
}
