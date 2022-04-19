import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'top_secret' //aqui, no caso coloca no .env como variavel de ambiente

interface Data { CNPJ: string }

export const generateToken = (data: Data | string) => {
  const token = jwt.sign(data, JWT_SECRET, { algorithm: 'HS256' });
  return token;
};

export const decoder = async (token: string): Promise<string | jwt.JwtPayload | boolean> => {
  try {
    const decoded: string | jwt.JwtPayload = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
};
