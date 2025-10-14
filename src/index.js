import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';
import { randomUUID } from 'crypto';
import { ok } from 'assert';

dotenv.config();

const app = express();
app.use(express.json());
//CRIANDO ROTAS
// GET /growdevers - Listar growdevers
app.get("/growdevers", (req,res) => {
    res.status(200).send({
        ok: true,
        mensagem: "Growdevers testados com sucesso",
        dados: growdevers
    });
});

app.post("/growdevers", (req,res) => {
    //1 - começo
    const body = req.body;  
    const novoGrowdever = {
        id: randomUUID(),
        nome: body.nome,
        email: body.email,
        idade: body.idade,
        matriculado: body.matriculado
    }

    //2 - meio/processamento
    growdevers.push(novoGrowdever);
    
    //3 - final
    res.status(201).send({
        ok: true,
        mensage: "Growdever criado com sucesso",
        dados: growdevers
    });
});

// GET /growdevers/:ID
app.get("/growdevers/:id", () => {
    // 1 - entrada
    const { id } = req.params;

    // 2 - processamento
    const growder = growdevers.find((item) => item.id === id);
    if(!growder) {
        return res.status(404).send({
            ok: false,
            mensagem: "Growdever não encontrado"
        });
    }
    // 3 - saida
    res.status(200).send({
        ok: true,
        mensgem: "Growdevers encontrado",
        dados: growder
    })
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("Servidor está Aberto!" + porta);
});
