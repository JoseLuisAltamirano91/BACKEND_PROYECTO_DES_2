import { InteresModel } from "../model/interesModel.js";

const intereses = [
    { cinteres: 1, nombre: "Gastronomía", descripcion: "Restaurantes, cafeterías y experiencias gastronómicas" },
    { cinteres: 2, nombre: "Naturaleza", descripcion: "Parques, bosques y reservas naturales" },
    { cinteres: 3, nombre: "Aventura", descripcion: "Senderismo, escalada y excursiones" },
    { cinteres: 4, nombre: "Deportes", descripcion: "Ciclismo, fútbol y actividades deportivas" },
    { cinteres: 5, nombre: "Cultura", descripcion: "Museos, teatros y actividades culturales" },
    { cinteres: 6, nombre: "Música", descripcion: "Conciertos, festivales y música en vivo" },
    { cinteres: 7, nombre: "Cine", descripcion: "Películas y salas de cine" },
    { cinteres: 8, nombre: "Vida nocturna", descripcion: "Bares, discotecas y entretenimiento nocturno" },
    { cinteres: 9, nombre: "Turismo", descripcion: "Viajes, paseos y destinos turísticos" },
    { cinteres: 10, nombre: "Arte", descripcion: "Galerías y exposiciones artísticas" },
    { cinteres: 11, nombre: "Tecnología", descripcion: "Eventos tecnológicos y videojuegos" },
    { cinteres: 12, nombre: "Bienestar", descripcion: "Spa, yoga y relajación" },
    { cinteres: 13, nombre: "Familia", descripcion: "Actividades y experiencias familiares" },
    { cinteres: 14, nombre: "Mascotas", descripcion: "Actividades para compartir con mascotas" },
    { cinteres: 15, nombre: "Compras", descripcion: "Centros comerciales, mercados y ferias" },
    { cinteres: 16, nombre: "Fotografía", descripcion: "Paisajes, miradores y fotografía" },
    { cinteres: 17, nombre: "Historia", descripcion: "Monumentos y sitios históricos" },
    { cinteres: 18, nombre: "Baile", descripcion: "Clases de baile y eventos de danza" },
    { cinteres: 19, nombre: "Camping", descripcion: "Campamentos y experiencias al aire libre" },
    { cinteres: 20, nombre: "Entretenimiento", descripcion: "Juegos, bolos y actividades recreativas" }
];

export async function cargarIntereses(): Promise<void> {
    for (const interes of intereses) {
        await InteresModel.findOrCreate({
            where: { cinteres: interes.cinteres },
            defaults: {
                ...interes,
                activo: true,
                fingreso: new Date(),
                cusuarioing: "sistema"
            }
        });
    }
}