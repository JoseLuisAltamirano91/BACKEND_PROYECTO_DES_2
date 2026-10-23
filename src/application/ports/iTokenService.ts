import {ITokenPayload} from "../dtos/iTokenPayload.js";

export interface ITokenService {
    generar(payload: ITokenPayload): string;
    verificar(token: string): ITokenPayload;
}