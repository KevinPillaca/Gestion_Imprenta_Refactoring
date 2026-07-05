export class CreateProducto {
  constructor(
    public nombre: string,
    public tipo_material: string,
    public precio: number,
    public medida?: string,
    public url_imagen?: string,
    public categoria_id?: number
  ) {}
}

export class UpdateProducto {
  constructor(
    public nombre?: string,
    public tipo_material?: string,
    public precio?: number,
    public medida?: string,
    public url_imagen?: string,
    public categoria_id?: number
  ) {}
}