
// Importando as rotas
import authRoutes from './routes/auth.js';
import clientRoutes from './routes/client.js';
import productRoutes from './routes/product.js';
import purchaseRoutes from './routes/purchases.js';

import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;

// Inicializando o Express
const app = express();

app.use(json());

// habilitando CORS
app.use(cors());


// Definição das rotas
app.use('/auth', authRoutes);
app.use('/clients', clientRoutes);
app.use('/products', productRoutes);
app.use('/purchases', purchaseRoutes);

// Server online
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
