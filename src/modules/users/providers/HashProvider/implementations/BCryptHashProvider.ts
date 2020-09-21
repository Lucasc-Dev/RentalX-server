import { hash, compare } from 'bcrypt';

import IHashProvider from "../models/IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        const hashed = await hash(payload, 10);

        return hashed;
    }

    public async compareHash(payload: string, hashed: string) {
        const response = await compare(payload, hashed);

        return response;
    }
}