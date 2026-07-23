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
    public async ShowCliente(buscar?: string, page: number = 1, limit: number = 8){
        
        const where = buscar  
       ?{
            OR: [
                {
                    nombre_razon_social: {
                        contains: buscar
                    }
                },
                {
                    ruc_dni: {
                        contains: buscar
                    }
                }
            ]
        }
        : {};

        const skip = (page - 1) * limit;
        const clientes = await prisma.clientes.findMany({where, skip, take: limit});
        const total = await prisma.clientes.count({where});
        const totalPages = Math.ceil(total / limit);

        return { data: clientes, total, page, limit, totalPages};
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

    //TOTAL CLIENTE
    public async CountCliente(){
        return prisma.clientes.count();
    };

    //EXPORTAR TODOS LOS CLIENTES
    public async ExportCliente() {
        return prisma.clientes.findMany({
            orderBy: {
                cliente_id: "asc"
            }
        });
    };
    
}