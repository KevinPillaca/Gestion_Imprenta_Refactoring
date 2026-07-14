export interface cliente {
    cliente_id: number;
    nombre_razon_social: string; 
    ruc_dni: string;
    telefono: string;
    correo: string;
    direccion: string;
    departamento: string;
}

export interface CreateCliente {
    nombre_razon_social: string; 
    ruc_dni: string;
    telefono: string;
    correo: string;
    direccion: string;
    departamento: string;
}

export interface ApiResponse{
    message: string;
}

export interface TotalClientes {
    total: number;
}
