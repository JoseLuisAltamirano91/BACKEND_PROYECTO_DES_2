
import { IPlan } from "../model/iPlan.js";

export interface IFiltroPlanes {
    cusuario?: string;
    intereses?: number[];
    presupuesto?: number;
    distancia?: number;
    latitud?: number;
    longitud?: number;
    pagina: number;
    limite: number;
}

export interface IResultadoPlanes {
    planes: IPlan[];
    total: number;
    pagina: number;
    limite: number;
    totalPaginas: number;
}

export interface IPlanRepository {
    crear(plan: IPlan): Promise<IPlan>;
    listarPorUsuario(cusuario: string): Promise<IPlan[]>;
    listarPublicos(): Promise<IPlan[]>;
    buscarPublicosFiltrados(filtros: IFiltroPlanes): Promise<IResultadoPlanes>;
    buscarPorId(cplan: number): Promise<IPlan | null>;
    actualizar(cplan: number, plan: Partial<IPlan>): Promise<IPlan | null>;
}
