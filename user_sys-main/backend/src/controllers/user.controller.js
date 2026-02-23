import { deleteUserById, getUserById, updateUserById } from '../services/user.service.js';

export const getProfile = async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).json({ user });
};

export const updateProfile = async (req, res) => {
  const user = await updateUserById(req.params.id, req.body);
  res.status(200).json({ user });
};

export const deleteProfile = async (req, res) => {
  await deleteUserById(req.params.id);
  res.status(204).send();
};
