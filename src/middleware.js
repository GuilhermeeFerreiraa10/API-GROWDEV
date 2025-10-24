import { growdevers } from "./dados.js";

export const logMiddleware = (res, req, next) => {
 console.log("Hello middleware!!");

 next();
};

export const logRequestMiddleware = (res, req, next) => {
    console.log(req.query);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.body);

    next();    
}

export const logBody = (res, req, next) => {
    console.log(req.body);
    next();
}

export const validateGrowdeverMiddleware = (res, req, next) => {
try {
    const body = req.body;

     if (!body.nome) {
        return res.status(400).send({
            ok: false,
            mensagem: "O nome não foi informado."
        })
    }
        if (!body.email) {
        return res.status(400).send({
            ok: false,
            mensagem: "O email não foi informado."
        })
    }
        if (!body.idade) {
        return res.status(400).send({
            ok: false,
            mensagem: "O campo idade não foi informado."
        })
    }
        if (Number(body.idade) < 18) {
        return res.status(400).send({
            ok: false,
            mensagem: "Growdever menor de idade tem que ter 18 ou mais"
        })
    }

    next();
} catch (error) {
    return res.status(500).send({
        ok: false,
        mensagem: error.toString()
    })
}
}

export const validateGrowdeverMatriculadoMiddleware =  (res, req, next) => {
    try {
     const { id } = req.params;

     const growdever = growdevers.find(item => item.id === id);
     if(!growdever) {
        return next();
     }

     if(!growdever.matriculado) {
        return res.status(400).send({
            ok: false,
            mensagem: "Growdever não matriculado não pode realizar alterações."
        })
     }


    } catch (error) {
      return res.status(500).send({
        ok: false, 
        mensagem: error.toString()
      });
    }
}