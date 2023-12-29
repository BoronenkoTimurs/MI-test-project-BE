import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => {
  return UserModel.find();
};
export const getUserByEmail = (email: string) => {
  return UserModel.findOne({ email });
};
export const getUserBySessionToken = async (sessionToken: string) => {
  return UserModel.findOne({ "authentication.sessionToken": sessionToken });
};
export const getUserById = (id: string) => {
  UserModel.findById(id);
};
export const createUser = async (values: Record<string, any>) => {
  return new UserModel(values).save().then((user) => user.toObject());
};
export const deleteUserById = (id: string) => {
  return UserModel.findByIdAndDelete(id);
};
export const updateUserById = (id: string, values: Record<string, any>) => {
  UserModel.findByIdAndUpdate(id, values);
};
