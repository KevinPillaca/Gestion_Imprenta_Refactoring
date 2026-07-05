import prisma from "../../config/prisma_db";
import { CreateCompraDto,CreateVentaDto } from "./contabilidad.dto";

export class ContabilidadService {
    
    //CREAR VENTA
    public async createVenta(data: CreateVentaDto) {
        const fechaObj = new Date(data.fecha);
        return await prisma.contabilidad_ventas.create({
            data: {
                fecha: fechaObj,
                tipo_comprobante: data.tipo_comprobante,
                serie_comprobante: data.serie_comprobante,
                subtotal: data.subtotal,
                igv: data.igv,
                total: data.total,
                // Mapeo explícito para evitar el error de "undefined"
                cliente_id: data.cliente_id ?? null,
                cliente_nombre_manual: data.cliente_nombre_manual ?? null,
                descripcion: data.descripcion ?? null,
                mes: fechaObj.getUTCMonth() + 1,
                anio: fechaObj.getUTCFullYear()
            }
        });
    }

    //CREAR COMPRAS
    public async createCompra(data: CreateCompraDto) {
        const fechaObj = new Date(data.fecha);
        return await prisma.contabilidad_compras.create({
            data: {
                fecha: fechaObj,
                proveedor: data.proveedor,
                tipo_comprobante: data.tipo_comprobante,
                serie_comprobante: data.serie_comprobante,
                subtotal: data.subtotal,
                igv: data.igv,
                total: data.total,
                mes: fechaObj.getUTCMonth() + 1,
                anio: fechaObj.getUTCFullYear()
            }
        });
    }

    // Obtener Resumen Mensual
    public async getResumenRER(anio: number) {
        // Agrupamos Ventas por mes
    const ventasGroup = await prisma.contabilidad_ventas.groupBy({
        by: ['mes'],
        where: { anio },
        _sum: { total: true, igv: true }
    });

    // Agrupamos Compras por mes
    const comprasGroup = await prisma.contabilidad_compras.groupBy({
        by: ['mes'],
        where: { anio },
        _sum: { total: true, igv: true }
    });

    const mesesNombres = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

    return mesesNombres.map((nombre, index) => {
        const nroMes = index + 1;
        const v = ventasGroup.find(i => i.mes === nroMes);
        const c = comprasGroup.find(i => i.mes === nroMes);

        const totalVentas = Number(v?._sum.total || 0);
        const totalCompras = Number(c?._sum.total || 0);
        const igvVentas = Number(v?._sum.igv || 0);
        const igvCompras = Number(c?._sum.igv || 0);

        // CÁLCULO CORREGIDO:
        // Subtotal = Total - IGV
        const subtotalVentas = totalVentas - igvVentas;

        return {
            fecha: `${nombre}-${anio.toString().slice(-2)}`,
            ventas: totalVentas,
            compras: totalCompras,
            igv: Number((igvVentas - igvCompras).toFixed(2)), // Saldo a favor o por pagar
            renta: Number((subtotalVentas * 0.015).toFixed(2)) // 1.5% sobre la Base Imponible
            };
        });
    }


};