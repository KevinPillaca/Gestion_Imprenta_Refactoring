import express from 'express';
import cors from 'cors';
import { ProductRouter } from './modules/productos/productos.route';
import { authRoutes } from './modules/auth/auth.route';
import { ClienteRouter } from './modules/clientes/cliente.route';
import { CobranzaRouter } from './modules/cobranzas/cobranza.route';
import { ContabilidadRouter } from './modules/contabilidad/contabilidad.route';
// Aquí irás sumando: import { router as clienteRoutes } from ...

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Tus rutas de la imprenta
app.use('/api/login', authRoutes);
app.use('/api/productos', ProductRouter);
app.use('/api/clientes', ClienteRouter);
app.use('/api/cobranzas', CobranzaRouter)
app.use('/api/contabilidad', ContabilidadRouter);

export default app; 