import { autor } from '../models/Autor.js';

class AutorController {

    static async listarAutores(req, res) {
        try {
            const listarAutores = await autor.find({});
            res.status(200).json(listarAutores);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao carregar os autores.` });
        }
    };

    static async listarAutorPorID(req, res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao carregar o autor.` });
        }
    };

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({
                message: 'Autor cadastrado com sucesso',
                autor: novoAutor
            });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao cadastrar autor.` });
        }
    }

    static async atualizarAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: 'Autor atualizado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao carregar o autor.` });
        }
    };

    static async excluirAutor(req, res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({ message: 'Autor removido com sucesso' });
        } catch (error) {
            res.status(500).json({ message: `${error.message} - Falha ao remover o autor.` });
        }
    }

};

export default AutorController;