import express from 'express';

const app = express();
app.use(express.json());

//Criar ROTAS

app.listen(3000, () => {
    console.log("Servidor está Aberto!");
    
});