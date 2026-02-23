import { registerUser, signinUser } from '../services/auth.service.js';
import { sendSuccess } from '../utils/response.js';

export const register = async (req, res) => {
  const user = await registerUser(req.body);
  sendSuccess(res, 201, { user });
};

export const signin = async (req, res) => {
  const data = await signinUser(req.body);
  sendSuccess(res, 200, data);
};
