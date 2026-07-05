import prisma from "../../config/prisma_db";
import { CreateCobranzaDto,CreateAbonoDto } from "./cobranza.dto";

export class CobranzaService{
    
    //CREAR COBRANZAS
    public async createCobranza(data:CreateCobranzaDto){
        return prisma.cobranzas.create({
            data:{
                concepto:data.concepto,
                monto_total: data.monto_total,
                monto_pendiente: data.monto_total, // Automatismo: pendiente = total
                monto_pagado: 0,
                cliente_id: data.cliente_id || null,
                nombre_cliente_manual: data.nombre_cliente_manual || null,
                cotizacion_id: data.cotizacion_id || null,
                estado: 'Pendiente'
            }
        });

    };

    //MOSTRAR COBRANZAS
    public async ShowCobranzas (){
        return prisma.cobranzas.findMany({
            include: { 
                clientes: {
                  select: { nombre_razon_social: true } // Solo traemos el nombre para no pesar la consulta
                },
                cotizaciones: {
                    select: { cotizacion_id: true } // Traemos el ID o número de cotización
                }
              },
        });
    }

    //EDITAR COBRANZAS

    //BORRAR COBRANZAS

    // REGISTRAR ABONO (Con Transacción para asegurar los cálculos)
    public async addAbono(data: CreateAbonoDto) {
    return await prisma.$transaction(async (tx) => {
      // El "as any" es un truco rápido, pero lo ideal es usar el enum de Prisma
      const abono = await tx.cobranza_abonos.create({ 
        data: {
            ...data,
            metodo_pago: data.metodo_pago as any // Aquí Prisma ya acepta el string corregido
        } 
      });

      const cobranza = await tx.cobranzas.findUnique({ 
        where: { cobranza_id: data.cobranza_id } 
      });

      if (!cobranza) throw new Error("Cobranza no encontrada");

      const nuevoPagado = Number(cobranza.monto_pagado) + data.monto_abonado;
      const nuevoPendiente = Number(cobranza.monto_total) - nuevoPagado;
      
      let nuevoEstado: 'Pendiente' | 'Adelanto' | 'Cancelado' = 'Adelanto';
      if (nuevoPendiente <= 0) nuevoEstado = 'Cancelado';

      await tx.cobranzas.update({
        where: { cobranza_id: data.cobranza_id },
        data: {
          monto_pagado: nuevoPagado,
          monto_pendiente: nuevoPendiente,
          estado: nuevoEstado as any
        }
      });

      return abono;
    });
  }

    //LISTAR ABONO
  public async ShowAbonosByCobranza(cobranza_id: number) {
    return await prisma.cobranza_abonos.findMany({
      where: { cobranza_id },
      orderBy: { fecha_pago: 'desc' }
    });
  }

};