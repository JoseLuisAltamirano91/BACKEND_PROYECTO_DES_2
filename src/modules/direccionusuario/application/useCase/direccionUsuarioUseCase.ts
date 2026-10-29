import {IDireccionUsuarioRepository} from "../../domain/repository/iDireccionUsuarioRepository";
import {IDireccionUsuarioDto} from "../../domain/dto/iDireccionUsuarioDto";

export class DireccionUsuarioUseCase {
    constructor(private readonly repository : IDireccionUsuarioRepository) {}

    async crear(cusuario:string, datos: IDireccionUsuarioDto){
        if(!cusuario){
            throw new Error("Usuario requerido");
        }

        return this.repository.crear(cusuario, datos);
    }

    async listarPorUsuario(cusuario:string){
        return this.repository.listarPorUsuario(cusuario);
    }

    async actualizar(cdireccion:number,cusuario:string,datos:IDireccionUsuarioDto){
        if(!Number.isInteger(cdireccion) || cdireccion <=0){
            throw new Error("Código de dirección inválido");
        }

        const direccion = this.repository.actualizar(cdireccion,cusuario,datos);

        if(!direccion){
            throw new Error("Dirección no encontrada");
        }
        return direccion;
    }
}