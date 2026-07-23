import ExcelJS from "exceljs";
import { Response } from "express";

export const exportClientesExcel = async (clientes: any[],res: Response) => {

    // CREAR LIBRO
    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Sistema Gestión Imprenta";
    workbook.created = new Date();

    // CREAR HOJA
    const worksheet = workbook.addWorksheet("Clientes", {
        views: [
            {
                state: "frozen",
                ySplit: 1
            }
        ]
    });

    // CREAR COLUMNAS
    worksheet.columns = [
        { header: "ID", key: "cliente_id", width: 10 },
        { header: "Nombre / Razón Social", key: "nombre_razon_social", width: 35 },
        { header: "RUC / DNI", key: "ruc_dni", width: 20 },
        { header: "Teléfono", key: "telefono", width: 18 },
        { header: "Correo", key: "correo", width: 30 },
        { header: "Dirección", key: "direccion", width: 35 },
        { header: "Departamento", key: "departamento", width: 20 },
        { header: "Fecha Registro", key: "fecha_registro", width: 22 }
    ];

    // ESTILOS DEL ENCABEZADO
    worksheet.getRow(1).eachCell((cell) => {

        cell.font = { bold: true, color: { argb: "FFFFFFFF"}};

        cell.alignment = { horizontal: "center", vertical: "middle" };

        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1F4E78" }};

        cell.border = { top: { style: "thin"}, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" }};
    });
    
    // AÑADIR FILAS
    clientes.forEach((cliente) => {

        worksheet.addRow({
            cliente_id: cliente.cliente_id,
            nombre_razon_social: cliente.nombre_razon_social,
            ruc_dni: cliente.ruc_dni,
            telefono: cliente.telefono,
            correo: cliente.correo,
            direccion: cliente.direccion,
            departamento: cliente.departamento,
            fecha_registro: cliente.fecha_registro
        });

    });

    // ESTILOS DEL CUERPO
    worksheet.eachRow((row, rowNumber) => {

        if (rowNumber === 1) return;

        row.alignment = { vertical: "middle"};

        row.eachCell((cell) => {
            cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" }};
        });

    });

    // CONFIGURAR DESCARGA
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
        "Content-Disposition",
        'attachment; filename="clientes.xlsx"'
    );

    // ENVIAR ARCHIVO
    await workbook.xlsx.write(res);
    res.end();
};