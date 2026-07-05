export class CreateCobranzaDto {
  constructor(
    public concepto: string,
    public monto_total: number,
    public cliente_id?: number,
    public nombre_cliente_manual?: string,
    public cotizacion_id?: number
  ) {}
}

export class CreateAbonoDto {
  constructor(
    public cobranza_id: number,
    public monto_abonado: number,
    public metodo_pago: 'Efectivo' | 'Transferencia' | 'Yape_Plin' | 'Tarjeta',
    public nota_pago?: string
  ) {}
}