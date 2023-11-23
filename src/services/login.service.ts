import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt.util';
import { ServiceResponse } from '../types/ServiceResponse';
import UserModel from '../database/models/user.model';
import { Token } from '../types/Token';
import { Login } from '../types/Login';

/* Esta função recebe um valor do tipo Login e retorna uma Promise que envelopa um valor do tipo ServiceResponse, que por sua vez envelopa um valor do tipo Token no cenário de sucesso! */
async function verifyLogin(login: Login): Promise<ServiceResponse<Token>> {
  /* Aqui verificamos se o parâmetro login possui valores válidos para os atributos email e password! */
  if (!login.email || !login.password) {
    /* Se não forem válidos devolvemos esse objeto que mesmo não atribuído a uma variável do tipo ServiceResponse segue o formato de um objeto de erro! 
    Teremos, então, a inferência de tipo em ação! */
    return { status: 'INVALID_DATA', data: { message: 'Dados inválidos' } };
  }

  /* Caso o email e password sejam válidos, iremos buscar no banco para ver se existe
  uma pessoa usuária no banco que possua o valor da coluna email seja igual ao valor
  que chegou como parâmetro. */
  const foundUser = await UserModel.findOne({ where: { email: login.email } });
  
  /* Verificamos se o objeto retornado do banco é diferente de nulo e se o objeto foundUser.dataValues possui o atributo password com um valor diferente da senha que chegou como parâmetro! */
  if (!foundUser || !bcrypt.compareSync(login.password, foundUser.dataValues.password)) {
    /* Caso seja diferente, retornamos esse objeto no formato ServiceResponse sinalizando um erro com uma mensagem específica para esse caso e o status UNAUTHORIZED que será mapeado para o status
    403 pela função mapStatusHTTP que implementamos anteriormente! Mais uma vez a tipagem é definida pela inferência! */
    return { status: 'UNAUTHORIZED', data: { message: 'E-mail ou senha inválidos' } };
  }

  /* Extraímos os atributos id e email dos dados retornado pelo banco.
  Por questão de segurança, armazenamos só os campos essenciais no token que será gerado! */
  const { id, email } = foundUser.dataValues;

  /* Aqui é onde, caso o usuário seja válido, o token será criado! */
  const token = jwtUtil.sign({ id, email });

  /* Retornarmos um objeto do tipo ServiceResponse que encapsula um objeto do tipo Token */
  return { status: 'SUCCESSFUL', data: { token } };
}
export default {
  verifyLogin,
};