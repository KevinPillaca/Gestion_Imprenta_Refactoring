
import { contabilidad_ventas_tipo_comprobante, contabilidad_compras_tipo_comprobante } from "@prisma/client";


// DTO PARA CREAR UNA VENTA (INGRESOS)
export class CreateVentaDto {
  constructor(
    public fecha: Date | string,
    public tipo_comprobante: contabilidad_ventas_tipo_comprobante,
    public serie_comprobante: string,
    public subtotal: number,
    public igv: number,
    public total: number,
    public cliente_id?: number | null,
    public cliente_nombre_manual?: string | null,
    public descripcion?: string | null
  ) {}
}

// DTO PARA CREAR UNA COMPRA (EGRESOS)
export class CreateCompraDto {
  constructor(
    public fecha: Date | string,
    public proveedor: string,
    public tipo_comprobante: contabilidad_compras_tipo_comprobante,
    public serie_comprobante: string,
    public subtotal: number,
    public igv: number,
    public total: number
  ) {}
}