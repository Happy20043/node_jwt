import User from "../model/user.js";

export const getUser = async (query) => {
  return await User.find(query);
};

export const createUser = async (user) => {
  return await User.create(user);
};

export const updateUser = async (id, user) => {
  return await User.findByIdAndUpdate(id, user, { new: true });
};

export const deleteUser = async (id, user) => {
  return await User.findByIdAndDelete(id, user);
};
