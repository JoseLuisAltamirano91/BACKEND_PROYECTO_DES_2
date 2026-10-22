import bcrypt from "bcryptjs";
import type { IPasswordService } from "../../../application/ports/iPasswordService.js";

export class PasswordService implements IPasswordService {
    async comparar(
        password: string,
        passwordHash: string
    ): Promise<boolean> {
        return bcrypt.compare(password, passwordHash);
    }
}