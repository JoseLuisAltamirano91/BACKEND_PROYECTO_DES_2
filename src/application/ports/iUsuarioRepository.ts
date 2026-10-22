import type { IUsuario } from "../../domain/models/iUsuario.ts";

export interface IUsuarioRepository {
    buscarPorCorreo(correo: string): Promise<IUsuario | null>;
}