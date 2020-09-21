import IGenerateTokenDTO from "@modules/users/dtos/IGenerateTokenDTO";

export default interface ITokenProvider {
    generateToken(data: IGenerateTokenDTO): Promise<string>;
}