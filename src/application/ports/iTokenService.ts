export interface ITokenPayload {
    cusuario: string;
    roles: string[];
}

export interface ITokenService {
    generar(payload: ITokenPayload): string;
    verificar(token: string): ITokenPayload;
}