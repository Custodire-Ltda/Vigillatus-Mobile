// Importa o módulo jsonwebtoken para verificação de tokens JWT
import jwt from 'jsonwebtoken';

// Middleware de autenticação para proteger rotas que requerem autenticação
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'Secret');
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        res.status(401).json({ message: 'Token inválido' });
    }
};

// Exporta o middleware de autenticação para ser utilizado em outras partes da aplicação
export default authMiddleware;