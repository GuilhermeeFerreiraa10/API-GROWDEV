import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';

dotenv.config();

const app = express();
app.use(express.json());

//CRIANDO ROTAS
// GET /growdevers - Listar growdevers
app.get("/growdevers", (req, res) => {
    res.status(200).send({
        ok: true,
        mensagem: "Growdevers testados com sucesso",
        dados: growdevers
    });
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("Servidor está Aberto!" + porta);
    
});