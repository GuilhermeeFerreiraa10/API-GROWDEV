//Importações nos códigos
import express from 'express';
import * as dotenv from 'dotenv';
import { growdevers } from './dados.js';
import { randomUUID } from 'crypto';
import { logMiddleware, logRequestMiddleware, validateGrowdeverMiddleware ,validateGrowdeverMatriculadoMiddleware, logBody } from './middleware.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(logMiddleware);
app.use(cors());

//CRIANDO ROTAS
// GET /growdevers - Listar growdevers
app.get("/growdevers", [logRequestMiddleware], (req,res) => {
    const { idade, nome, email, email_includes } = req.query;

    let dados = growdevers;
    if(idade) {
        dados = dados.filter(item => item.idade >= Number(idade));
    }

    if(nome) {
        dados = dados.filter(item => item.nome.includes(nome));
    }
    // Filtro por igualdade de e-mail
if (email) {
    dados = dados.filter(item => item.email === email);
}

if(email_includes) {
    dados = dados.filter(item => item.email.includes(email_includes))
}
 res.status(200).send({
        ok: true,
        mensagem: "Growdevers testados com sucesso",
        dados
    });
    
});

//POST /growdeevers - Criar um gorwdever
app.post("/growdevers", [logBody,validateGrowdeverMiddleware],(req,res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            mensagem: error.toString()
        });
    }
});
// GET /growdevers/:ID - Puxar um growdever
app.get("/growdevers/:id", [logRequestMiddleware], (req,res) => {
    // 1 - entrada
    const { id } = req.params;

    // 2 - processamento
    const growdever = growdevers.find((item) => item.id === id);
    if(!growdever) {
        return res.status(404).send({
            ok: false,
            mensagem: "Growdever não encontrado"
        });
    }
    // 3 - saida
    res.status(200).send({
        ok: true,
        mensgem: "Growdevers encontrado",
        dados: growdever
    })
});

//PUT /growdevers/:ID - Atualizar
app.put("/growdevers/:id", [logBody, validateGrowdeverMiddleware, 
    validateGrowdeverMatriculadoMiddleware], (req,res) => {
    // 1 - entrada 
    const { id } = req.params;
    const { nome, email, idade, matriculado } = req.body;

    // 2 - processamento
    const growdever = growdevers.find(item => item.id === id);
if(!growdever) {
    return res.status(404).send({
        ok: false,
        mensagem: "Growdever não encontrado"
    });
}

    growdever.nome = nome;
    growdever.email = email;
    growdever.idade = idade;
    growdever.matriculado = matriculado;

    // 3 - saida
    res.status(200).send({
        ok: true,
        mensage: "Growdever atualizadao com sucesso",
        dados: growdevers
    });
});

// PATCH /growdevers/:ID - Toggle do campo matriculado
app.patch("/growdevers/:id", (req,res) => {
    // 1- entrada
    const { id } = req.params;

    // 2- processamento
    const growdever = growdevers.find(item => item.id === id);
    if(!growdever) {
        return res.status(404).send({
            ok: false,
            mensage: "Growdever não encontrado"
        })
    }

    growdever.matriculado = matriculado;

    // 3- saida
    res.status(200).send({
        ok: true,
        mensage: "Growdever atualizado (matriculado) com sucesso",
        dados: growdevers
    });
});

//DELETE /growdevers/:ID - Deletar um usuario(growdever) da lista
app.delete("/growdever/:id", (req,res) => {
    // 1 - entrada
    const { id } = req.params;

    // 2 - processamento
    const growdeverIndex = growdevers.findIndex(item => item.id === id);
    if(growdeverIndex < 0) {
        return res.status(404).send({
            ok: false,
            mensagem: "Growdever não encontrado"
        });
    }

    growdevers.splice(growdeverIndex, 1);

    // 3 - saida
    res.status(200).send({
        ok: true,
        mensagem: "Growdever excluido com sucesso!",
        dados: growdevers
    });
});

//PORTA do servidor
const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("Servidor está Aberto!" + porta);
});
