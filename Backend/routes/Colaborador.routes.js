import Express from 'express';
import authMiddleware from '../Middleware/authmiddleware.js';
import Multer from 'multer';
import { CadastrarColaborador, ColaboradoresDoGestor, getColaborador, atualizarQuantidadeOcorrencias, deletarColaborador, atualizarColaborador, atualizarFotoColaborador } from '../controllers/Colaborador.controller.js';

const colaboradorRouter = Express.Router();

const Storage = Multer.memoryStorage({});
const Upload = Multer({ storage: Storage });

colaboradorRouter.post('/', authMiddleware, Upload.single('foto'), CadastrarColaborador);
colaboradorRouter.get('/:id', authMiddleware, getColaborador)
colaboradorRouter.get('/', authMiddleware, ColaboradoresDoGestor);
colaboradorRouter.post('/atualizar-ocorrencias', authMiddleware, atualizarQuantidadeOcorrencias);
colaboradorRouter.delete('/:id', authMiddleware, deletarColaborador);
colaboradorRouter.put('/:id', authMiddleware, atualizarColaborador);
colaboradorRouter.put('/:id/foto', authMiddleware, Upload.single('foto'), atualizarFotoColaborador);

export default colaboradorRouter;