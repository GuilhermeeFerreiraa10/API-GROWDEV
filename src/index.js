import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

//Criar ROTAS
app.get("/hello", (req, res) => {
    console.log("Hello!");
    res.send("Hello response!");
});

const porta = process.env.PORT;
app.listen(porta, () => {
    console.log("Servidor está Aberto!" + porta);
    
});