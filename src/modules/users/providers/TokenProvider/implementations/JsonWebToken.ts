import IGenerateTokenDTO from '@modules/users/dtos/IGenerateTokenDTO';
import { sign } from 'jsonwebtoken';

import ITokenProvider from "../models/ITokenProvider";

export default class JsonWebToken implements ITokenProvider {
    public async generateToken({ subject, secret, expiresIn }: IGenerateTokenDTO): Promise<string> {
        const token = sign({}, secret, { 
            subject,
            expiresIn,
        });

        return token;
    }
}