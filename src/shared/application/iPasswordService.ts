export interface IPasswordService {
    comparar(password: string, passwordHash: string): Promise<boolean>;
    generarHash(password: string): Promise<string>;
}