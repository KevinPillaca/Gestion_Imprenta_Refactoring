export class CreateClienteDto {
  constructor(
    public nombre_razon_social: string,
    public ruc_dni: string,
    public telefono?: string,
    public correo?: string,
    public direccion?: string,
    public departamento?: string
  ) {}
}

export class UpdateClienteDto {
  constructor(
    public nombre_razon_social?: string,
    public ruc_dni?: string,
    public telefono?: string,
    public correo?: string,
    public direccion?: string,
    public departamento?: string
  ) {}
}