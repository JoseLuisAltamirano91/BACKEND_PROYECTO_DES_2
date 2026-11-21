import { sequelize } from "./sequelize.js";

export async function crearRestriccionesGeograficas(): Promise<void> {
    await sequelize.query(`
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM pg_constraint
                WHERE conname = 'fk_canton_provincia'
                AND conrelid = 'public."CANTON"'::regclass
            ) THEN
                ALTER TABLE public."CANTON"
                ADD CONSTRAINT fk_canton_provincia
                FOREIGN KEY (cpais, cprovincia)
                REFERENCES public."PROVINCIA" (cpais, cprovincia)
                ON DELETE RESTRICT ON UPDATE RESTRICT;
            END IF;

            IF NOT EXISTS (
                SELECT 1 FROM pg_constraint
                WHERE conname = 'fk_parroquia_canton'
                AND conrelid = 'public."PARROQUIA"'::regclass
            ) THEN
                ALTER TABLE public."PARROQUIA"
                ADD CONSTRAINT fk_parroquia_canton
                FOREIGN KEY (cpais, cprovincia, ccanton)
                REFERENCES public."CANTON" (cpais, cprovincia, ccanton)
                ON DELETE RESTRICT ON UPDATE RESTRICT;
            END IF;
        END $$;
    `);
}