import 'dotenv/config';

export class Envs {
  // Leemos los datos del .env
  public static readonly PORT: number = Number(process.env.PORT) || 3000;
  public static readonly JWT_SECRET: string = process.env.JWT_SECRET || '';

  // Esta función revisa que no falte nada importante
  public static validate() {
    if (!process.env.JWT_SECRET) {
      throw new Error('[Config Error]: La variable JWT_SECRET es obligatoria en el .env');
    }
  }
}

// Ejecutamos la revisión
Envs.validate();