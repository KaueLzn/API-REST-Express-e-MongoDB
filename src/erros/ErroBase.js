class ErroBase extends Error {

    constructor(mensagem = 'Erro interno do Servidor', status = 500) {
        super();
        this.message = mensagem;
        this.status = status;
    }

    enviarReposta(res) {
        res.status(this.status).send({
            message: this.message,
            status: this.status
        });
    }

}

export default ErroBase;