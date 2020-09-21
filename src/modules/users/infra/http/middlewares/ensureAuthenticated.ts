import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from "@shared/errors/AppError";

interface tokenPayload {
    iat: string;
    exp: string;
    sub: string;
}

export default function (request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Missing JWT token');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as tokenPayload;

        request.user = { id: sub };

        return next();
    }catch {
        throw new AppError('Invalid JWT token');
    }
}