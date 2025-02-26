import Express from 'express';
import Multer from 'multer';
import { registrarOcorrencia } from '../controllers/Ocorrencia.controller.js';
import authMiddleware from '../Middleware/authmiddleware.js';

const ocorrenciaRouter = Express.Router();
const upload = Multer({ storage: Multer.memoryStorage() });

ocorrenciaRouter.post('/registrar', authMiddleware, upload.single('image'), registrarOcorrencia);

export default ocorrenciaRouter;