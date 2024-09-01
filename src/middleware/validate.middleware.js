import AppError from "../AppError.js";

import pkg from 'jsonwebtoken';
const { verify } = pkg;


export async function validateToken(req, res, next) {

    console.log("Validando token...")
    
    let token = req.headers.authorization;

    if (!token) {
        return next(new AppError('No token provided', 401));
    }

    token = token.replace("Bearer ", "")

    verify(
        token, 
        String(process.env.SECRET_KEY),

        // a lib usa essa callback logo após descriptografar o token
        // por isso passa o erro (caso exista) e o objeto do token decodificado
        (err, decoded) => {
            // vemos se existe um erro durante a decodificação, 
            // o que indicaria que o token é inválido
            if (err) {
                throw new AppError(err.message, 401);
            }

            // caso não tenha nenhum erro e o token seja decodificado 
            // corretamente armazenamos as variáveis na resposta daquele request
            if (decoded) {
                res.locals.userID = decoded.userID;
                res.locals.userType = decoded.userType;
            } else {
                throw new AppError('Invalid token', 401);
            }
        }
    );

    // se tudo ocorrer bem, chegamos aqui e passamos para a próxima função
    next();
}