export default interface IHashProvider {
    generateHash(payload: string): Promise<string>;
    compareHash(payloaad: string, hashed: string): Promise<boolean>;
}