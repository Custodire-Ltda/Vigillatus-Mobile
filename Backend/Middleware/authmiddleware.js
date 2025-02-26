// Importa o módulo jsonwebtoken para verificação de tokens JWT
import jwt from 'jsonwebtoken';

// Middleware de autenticação para proteger rotas que requerem autenticação
const authMiddleware = (req, res, next) => {
    // Extrai o token JWT do cabeçalho de autorização
    const token = req.headers['authorization']

    // Verifica se o token foi fornecido
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        // Verifica e decodifica o token JWT usando a chave secreta
        const decoded = jwt.verify(token, 'Secret'); // Substitua 'Secret' por uma chave secreta mais segura em produção

        // Armazena o ID do usuário decodificado no objeto de requisição (req) para uso posterior
        req.userId = decoded.id;

        // Chama a próxima função middleware ou rota
        next();
    } catch (error) {
        // Retorna uma mensagem de erro e status 401 se o token for inválido
        res.status(401).json({ message: 'Token inválido' });
    }
};

// Exporta o middleware de autenticação para ser utilizado em outras partes da aplicação
export default authMiddleware;