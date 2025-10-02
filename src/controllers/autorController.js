
import NaoEncontrado from '../erros/NaoEncontrado.js';
import { autor } from '../models/index.js';

class AutorController {
    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = autor.find();
            
            req.resultado = autoresResultado;
            next()
        } catch (error) {
            next(error);
        }
    };

    static listarAutorPorID = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorResultado = await autor.findById(id);

            if (autorResultado !== null) {
                res.status(200).json(autorResultado);
            } else {
                next(new NaoEncontrado("ID do autor não encontrado"));
            }

        } catch (error) {
            next(error);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({
                message: 'Autor cadastrado com sucesso',
                autor: novoAutor
            });
        } catch (error) {
            next(error);
        }
    }

    static atualizarAutor = async (req, res, next) => {
        try {
            const id = req.params.id;

            if (id !== null) {
                await autor.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: 'Autor atualizado com sucesso' });
            } else {
                next(new NaoEncontrado("ID do autor não encontrado"));
            }

        } catch (error) {
            next(error);
        }
    };

    static excluirAutor = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (id !== null) {
                await autor.findByIdAndDelete(id, req.body);
                res.status(200).json({ message: 'Autor apagado com sucesso' });
            } else {
                next(new NaoEncontrado("ID do autor não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    }

};

export default AutorController;