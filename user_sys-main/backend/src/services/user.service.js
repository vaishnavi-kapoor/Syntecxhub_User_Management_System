import { User } from '../models/User.js';
import { ApiError } from '../utils/apiError.js';

const sanitizeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
});

export const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return sanitizeUser(user);
};

export const updateUserById = async (id, payload) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (payload.email && payload.email.toLowerCase() !== user.email) {
    const duplicate = await User.findOne({ email: payload.email.toLowerCase() });
    if (duplicate && duplicate._id.toString() !== id) {
      throw new ApiError(409, 'Email already exists');
    }
    user.email = payload.email.toLowerCase();
  }

  if (payload.name) user.name = payload.name;

  await user.save();
  return sanitizeUser(user);
};

export const deleteUserById = async (id) => {
  const deleted = await User.findByIdAndDelete(id);
  if (!deleted) {
    throw new ApiError(404, 'User not found');
  }
};
