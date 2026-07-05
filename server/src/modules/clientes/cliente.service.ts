import prisma from "../../config/prisma_db";
import { CreateClienteDto, UpdateClienteDto } from "./cliente.dto";

export class ClienteService {

    //CREAR CLIENTE
    public async CreateCliente(data:CreateClienteDto){
        return prisma.clientes.create({
            data:{
                nombre_razon_social: data.nombre_razon_social,
                ruc_dni: data.ruc_dni,
                telefono: data.telefono,
                correo: data.correo,
                direccion: data.direccion,
                departamento: data.departamento
            }
        });
    };

    //MOSTRAR CLIENTE
    public async ShowCliente(){
        return prisma.clientes.findMany();
    };

    //EDITAR CLIENTE
    public async EditCliente(id: number , data:UpdateClienteDto){
        return prisma.clientes.update({
            where: {cliente_id:id},
            data
        });
    };

    //BORRAR CLIENTE
    public async DeleteCliente(id: number){
        return prisma.clientes.delete({ 
            where: { cliente_id: id } 
        });
    };
}