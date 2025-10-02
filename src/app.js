import express from 'express';
import conectaDB from './config/dbconnect.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulador404 from './middlewares/manipulador404.js';

const conexao = await conectaDB();

conexao.on('error', (erro) => {
    console.error('Erro de conexao ', erro);
});

conexao.once('open', () => {
    console.log('Conexao com o banco feita com sucesso!');
});

const app = express();
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;
