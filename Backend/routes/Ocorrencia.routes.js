import express from 'express';
import { uploadImage, listOcorrencias, getOcorrencia, updateOcorrencia, listOcorrenciasHistorico, getOcorrenciasPorColaborador, deleteOcorrencia, getOcorrenciaPorGestor, countOcorrenciasPorSetorDoGestor, contarOcorrenciasUltimaSemana, topColaboradoresComOcorrencias } from '../controllers/Ocorrencia.controller.js';
import authMiddleware from '../Middleware/authmiddleware.js';

const router = express.Router();

router.get('/historico', authMiddleware, listOcorrenciasHistorico);

/* router.get('/historico', authMiddleware, async (req, res) => {
    try {
        await listOcorrenciasHistorico(req, res);
    } catch (error) {
        console.error('Erro ao listar histórico:', error);
        res.status(500).json({ message: 'Erro ao listar histórico', error: error.message });
    }
}); */

router.get('/list', authMiddleware, listOcorrencias);
router.post('/upload', authMiddleware, uploadImage);
router.get('/:id', authMiddleware, getOcorrencia);
router.put('/:id', authMiddleware, updateOcorrencia);
router.get('/colaborador/:colaboradorId', authMiddleware, getOcorrenciasPorColaborador);
router.delete('/:id', authMiddleware, deleteOcorrencia);


router.get('/GestorOcorrencias/:id', authMiddleware, getOcorrenciaPorGestor)

/* info para o gráfico */
router.get('/ContarOcorrencias/:id', authMiddleware, countOcorrenciasPorSetorDoGestor)

/* Listagem de ocorrências recentes */
router.get('/ContarOcorrenciasDaSemana/:id', authMiddleware, contarOcorrenciasUltimaSemana)





router.get('/TopColaboradores/:id', authMiddleware, topColaboradoresComOcorrencias);


export default router;
