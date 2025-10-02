import { livro } from '../models/index.js';
import { autor } from '../models/Autor.js';
import NaoEncontrado from '../erros/NaoEncontrado.js';

class LivroController {
    static listarLivros = async (req, res, next) => {
        try {
            const buscaLivros = livro.find();

            req.resultado = buscaLivros;
            next();
        } catch (error) {
            next(error);
        }
    };

    static listarLivroPorID = async (req, res, next) => {
        try {
            const id = req.params.id;

            if (id !== null) {
                const livroEncontrado = await livro.findById(id);
                res.status(200).json(livroEncontrado);
            } else {
                next(new NaoEncontrado("ID do livro não encontrado"));
            }

        } catch (error) {
            next(error);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor)
            const livroCompleto = {
                ...novoLivro,
                autor: { ...autorEncontrado._doc }
            }
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({
                message: 'Livro cadastrado com sucesso',
                livro: livroCriado
            });
        } catch (error) {
            next(error);
        }
    }

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (id !== null) {
                await livro.findByIdAndUpdate(id, req.body);
                res.status(200).json({ message: 'Livro atualizado com sucesso' });
            } else {
                next(new NaoEncontrado("ID do livro não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    };

    static excluirLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (id !== null) {
                await livro.findByIdAndDelete(id, req.body);
                res.status(200).json({ message: 'Livro Excluido com sucesso' });
            } else {
                next(new NaoEncontrado("ID do livro não encontrado"));
            }
        } catch (error) {
            next(error);
        }
    }

    static listarLivroPorFiltro = async (req, res, next) => {
        try {
            const { editora, titulo, min, max, nomeAutor } = req.query;

            const busca = {};

            if (editora) busca.editora = editora;
            if (titulo) busca.titulo = { $regex: titulo, $options: 'i' };

            if (min || max) busca.numPaginas = {};
            if (min) busca.numPaginas.$gte = min;
            if (max) busca.numPaginas.$lte = max;

            if (nomeAutor) {
                const autor = await livro.find({ "autor.nome": nomeAutor });
                res.status(200).json(autor);
                return;
            };

            if (livrosResultado.length === 0) {
                next(new NaoEncontrado("Editora não encontrada"));
                return;
            }
            const livrosResultado = livro.find(busca);
            req.resultado = livrosResultado
            next()
        } catch (erro) {
            next(erro);
        }
    }

};

export default LivroController;