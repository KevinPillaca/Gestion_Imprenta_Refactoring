export interface Producto {
  producto_id: number;
  nombre: string;
  tipo_material: string;
  medida?: string;
  precio: number;
  url_imagen?: string;
  categoria_id?: number;
  categorias?: {
    id: number;
    nombre: string;
  };
}

export interface CreateProducto {
  nombre: string;
  tipo_material: string;
  precio: number;
  medida?: string;
  url_imagen?: string;
  categoria_id?: number;
}

export interface UpdateProducto {
  nombre: string;
  tipo_material: string;
  precio: number;
  medida?: string;
}

export interface ApiResponse {
  message: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}