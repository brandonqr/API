import User from './user.model';

export async function signUp(req, res) {

  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);//201, cuando la peticion ha sido completada

  } catch (e) {
    return res.status(500).json(e);//Error interno del servidor
  }

}

export function login(req, res, next) {
  res.status(200).json(req.user);
  return next();

}
