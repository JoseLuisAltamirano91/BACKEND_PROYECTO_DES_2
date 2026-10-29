
import {IDireccionUsuarioRepository} from "../../domain/repository/iDireccionUsuarioRepository.js";
import {IDireccionUsuarioDto} from "../../domain/dto/iDireccionUsuarioDto.js";
import {IDireccionUsuario} from "../../domain/model/iDireccionUsuario.js";
import {DireccionUsuarioModel} from "../model/direccionUsuarioModel";

export class DireccionUsarioPostgresRepository implements IDireccionUsuarioRepository{

    async crear(cusuario: string, datos: IDireccionUsuarioDto): Promise<IDireccionUsuario> {
        const ultima = await DireccionUsuarioModel.max("cdireccion",{
            where: {cusuario}
        });

        const cdireccion = Number(ultima ?? 0) +1;

        const direccion = await DireccionUsuarioModel.create({
            cdireccion,
            cusuario,
            ...datos,
            principal: datos.principal ?? false,
            fingreso: new Date(),
            cusuarioing: cusuario
        });
        return direccion.get({plain:true}) as IDireccionUsuario;
    }

    async listarPorUsuario(cusuario: string): Promise<IDireccionUsuario[]> {
        const direcciones = await DireccionUsuarioModel.findAll({
           where:{cusuario},
           order: [["cdireccion","ASC"]]
        });
        return direcciones.map(d=>d.get({plain:true}) as IDireccionUsuario);
    }

    async actualizar(cdireccion: number, cusuario: string, datos: IDireccionUsuarioDto): Promise<IDireccionUsuario | null> {
        const direccion = await DireccionUsuarioModel.findOne({
            where:{cdireccion,cusuario}
        });

        if(!direccion) return null;

        await direccion.update({
            ...datos,
            fmodificacion: new Date(),
            cusuariomod: cusuario
        });

        return direccion.get({plain:true}) as IDireccionUsuario;
    }

}